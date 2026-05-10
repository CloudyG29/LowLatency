/**
 * Tests for CV Upload Feature
 * Covers: storageService, and the /cv routes on listings
 */

const request = require("supertest");

// ─── Mock Prisma ────────────────────────────────────────────────────────────
jest.mock("../DB_connect/prisma", () => ({
  user: {
    findUnique: jest.fn(),
  },
  application: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

// ─── Mock Supabase ───────────────────────────────────────────────────────────
const mockUpload = jest.fn();
const mockCreateSignedUrl = jest.fn();
const mockRemove = jest.fn();

jest.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    storage: {
      from: () => ({
        upload: mockUpload,
        createSignedUrl: mockCreateSignedUrl,
        remove: mockRemove,
      }),
    },
  }),
}));

const prisma = require("../DB_connect/prisma");
const { uploadCV, getCVUrl, deleteCV } = require("../backend/storage_service");

// ─── Helper: build a minimal Express app with just the listings router ───────
function buildApp() {
  const express = require("express");
  const app = express();
  app.use(express.json());
  app.use("/api/listings", require("../backend/routes/listings"));
  return app;
}

// ════════════════════════════════════════════════════════════════════════════
// 1. storageService unit tests
// ════════════════════════════════════════════════════════════════════════════
describe("storageService", () => {
  beforeEach(() => jest.clearAllMocks());

  // ── uploadCV ──────────────────────────────────────────────────────────────
  describe("uploadCV()", () => {
    it("uploads a PDF and returns the correct file path", async () => {
      mockUpload.mockResolvedValue({ error: null });

      const path = await uploadCV(
        Buffer.from("fake pdf"),
        "application/pdf",
        42,
        7,
      );

      expect(mockUpload).toHaveBeenCalledWith(
        "42/7/cv.pdf",
        expect.any(Buffer),
        { contentType: "application/pdf", upsert: true },
      );
      expect(path).toBe("42/7/cv.pdf");
    });

    it("uploads a DOC and returns the correct file path", async () => {
      mockUpload.mockResolvedValue({ error: null });
      const path = await uploadCV(
        Buffer.from("fake doc"),
        "application/msword",
        1,
        2,
      );
      expect(path).toBe("1/2/cv.doc");
    });

    it("uploads a DOCX and returns the correct file path", async () => {
      mockUpload.mockResolvedValue({ error: null });
      const path = await uploadCV(
        Buffer.from("fake docx"),
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        1,
        2,
      );
      expect(path).toBe("1/2/cv.docx");
    });

    it("throws when Supabase upload returns an error", async () => {
      mockUpload.mockResolvedValue({
        error: new Error("Storage quota exceeded"),
      });
      await expect(
        uploadCV(Buffer.from("x"), "application/pdf", 1, 1),
      ).rejects.toThrow("Storage quota exceeded");
    });
  });

  // ── getCVUrl ──────────────────────────────────────────────────────────────
  describe("getCVUrl()", () => {
    it("returns a signed URL for the given file path", async () => {
      mockCreateSignedUrl.mockResolvedValue({
        data: { signedUrl: "https://supabase.co/signed/cv.pdf" },
        error: null,
      });

      const url = await getCVUrl("42/7/cv.pdf");
      expect(url).toBe("https://supabase.co/signed/cv.pdf");
      expect(mockCreateSignedUrl).toHaveBeenCalledWith("42/7/cv.pdf", 3600);
    });

    it("respects a custom expiry", async () => {
      mockCreateSignedUrl.mockResolvedValue({
        data: { signedUrl: "https://supabase.co/signed/cv.pdf" },
        error: null,
      });
      await getCVUrl("42/7/cv.pdf", 7200);
      expect(mockCreateSignedUrl).toHaveBeenCalledWith("42/7/cv.pdf", 7200);
    });

    it("throws when Supabase returns an error", async () => {
      mockCreateSignedUrl.mockResolvedValue({
        data: null,
        error: new Error("File not found"),
      });
      await expect(getCVUrl("bad/path.pdf")).rejects.toThrow("File not found");
    });
  });

  // ── deleteCV ──────────────────────────────────────────────────────────────
  describe("deleteCV()", () => {
    it("removes the file from Supabase storage", async () => {
      mockRemove.mockResolvedValue({ error: null });
      await deleteCV("42/7/cv.pdf");
      expect(mockRemove).toHaveBeenCalledWith(["42/7/cv.pdf"]);
    });

    it("throws when Supabase returns an error", async () => {
      mockRemove.mockResolvedValue({ error: new Error("Delete failed") });
      await expect(deleteCV("42/7/cv.pdf")).rejects.toThrow("Delete failed");
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// 2. POST /:id/cv  (upload endpoint)
// ════════════════════════════════════════════════════════════════════════════
describe("POST /api/listings/:id/cv", () => {
  let app;
  beforeAll(() => {
    app = buildApp();
  });
  beforeEach(() => jest.clearAllMocks());

  const validPdfBuffer = Buffer.from("%PDF-fake");

  it("uploads a CV and updates the application record", async () => {
    prisma.user.findUnique.mockResolvedValue({
      user_id: 42,
      email: "alice@test.com",
    });
    mockUpload.mockResolvedValue({ error: null });
    prisma.application.update.mockResolvedValue({});

    const res = await request(app)
      .post("/api/listings/7/cv")
      .field("email", "alice@test.com")
      .attach("cv", validPdfBuffer, {
        filename: "my_cv.pdf",
        contentType: "application/pdf",
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    expect(prisma.application.update).toHaveBeenCalledWith({
      where: { application_id: 7 },
      data: expect.objectContaining({
        cvFilePath: "42/7/cv.pdf",
        cvOriginalFilename: "my_cv.pdf",
        cvUploadedAt: expect.any(Date),
      }),
    });
  });

  it("returns 404 when the user is not found", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/listings/7/cv")
      .field("email", "ghost@test.com")
      .attach("cv", validPdfBuffer, {
        filename: "cv.pdf",
        contentType: "application/pdf",
      });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("User not found.");
  });

  it("returns 400 when no file is attached", async () => {
    prisma.user.findUnique.mockResolvedValue({
      user_id: 42,
      email: "alice@test.com",
    });

    const res = await request(app)
      .post("/api/listings/7/cv")
      .field("email", "alice@test.com");

    expect(res.status).toBe(500); // multer throws, caught by error handler
  });

  it("rejects non-PDF/DOC files", async () => {
    prisma.user.findUnique.mockResolvedValue({
      user_id: 42,
      email: "alice@test.com",
    });

    const res = await request(app)
      .post("/api/listings/7/cv")
      .field("email", "alice@test.com")
      .attach("cv", Buffer.from("fake"), {
        filename: "photo.png",
        contentType: "image/png",
      });

    expect(res.status).toBe(500);
  });

  it("returns 500 when Supabase upload fails", async () => {
    prisma.user.findUnique.mockResolvedValue({
      user_id: 42,
      email: "alice@test.com",
    });
    mockUpload.mockResolvedValue({ error: new Error("Bucket full") });

    const res = await request(app)
      .post("/api/listings/7/cv")
      .field("email", "alice@test.com")
      .attach("cv", validPdfBuffer, {
        filename: "cv.pdf",
        contentType: "application/pdf",
      });

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Bucket full");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// 3. GET /:id/cv  (retrieve signed URL)
// ════════════════════════════════════════════════════════════════════════════
describe("GET /api/listings/:id/cv", () => {
  let app;
  beforeAll(() => {
    app = buildApp();
  });
  beforeEach(() => jest.clearAllMocks());

  it("returns a signed URL when a CV exists", async () => {
    prisma.application.findUnique.mockResolvedValue({
      cvFilePath: "42/7/cv.pdf",
    });
    mockCreateSignedUrl.mockResolvedValue({
      data: { signedUrl: "https://supabase.co/signed/cv.pdf" },
      error: null,
    });

    const res = await request(app).get("/api/listings/7/cv");

    expect(res.status).toBe(200);
    expect(res.body.url).toBe("https://supabase.co/signed/cv.pdf");
  });

  it("returns 404 when no CV is on the application", async () => {
    prisma.application.findUnique.mockResolvedValue({ cvFilePath: null });

    const res = await request(app).get("/api/listings/7/cv");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("No CV found for this application");
  });

  it("returns 404 when the application does not exist", async () => {
    prisma.application.findUnique.mockResolvedValue(null);

    const res = await request(app).get("/api/listings/7/cv");

    expect(res.status).toBe(404);
  });

  it("returns 500 when Supabase signed URL generation fails", async () => {
    prisma.application.findUnique.mockResolvedValue({
      cvFilePath: "42/7/cv.pdf",
    });
    mockCreateSignedUrl.mockResolvedValue({
      data: null,
      error: new Error("Signing failed"),
    });

    const res = await request(app).get("/api/listings/7/cv");

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Signing failed");
  });
});
