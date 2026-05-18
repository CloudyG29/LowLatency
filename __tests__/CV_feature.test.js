global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
jest.mock("../DB_connect/prisma", () => ({
  user: { findUnique: jest.fn() },
  application: { findUnique: jest.fn(), update: jest.fn() },
}));

jest.mock("../DB_connect/storage_service", () => ({
  uploadCV: jest.fn().mockResolvedValue("user_1/application_1.pdf"),
  getCVUrl: jest.fn().mockResolvedValue("https://mocked-signed-url.com"),
  deleteCV: jest.fn().mockResolvedValue(undefined),
}));

const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const prisma = require("../DB_connect/prisma");
const storageService = require("../DB_connect/storage_service");
const express = require("express");
const request = require("supertest");
const listingsRouter = require("../backend/routes/listings");

const app = express();
app.use(express.json());
app.use("/api/listings", listingsRouter);

beforeEach(() => {
  jest.clearAllMocks();
  // Re-apply default mocks after clearAllMocks resets them
  storageService.uploadCV.mockResolvedValue("user_1/application_1.pdf");
  storageService.getCVUrl.mockResolvedValue("https://mocked-signed-url.com");
});

describe("POST /api/listings/:id/cv", () => {
  test("should upload CV and return 200", async () => {
    prisma.user.findUnique.mockResolvedValue({ user_id: 1 });
    prisma.application.update.mockResolvedValue({
      application_id: 1,
      cvFilePath: "user_1/application_1.pdf",
      cvOriginalFilename: "my_cv.pdf",
    });

    const res = await request(app)
      .post("/api/listings/1/cv")
      .field("email", "applicant@test.com")
      .attach("cv", Buffer.from("fake pdf content"), "my_cv.pdf");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("CV uploaded successfully");
  });

  test("should return 404 if user not found", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/listings/1/cv")
      .field("email", "nobody@test.com")
      .attach("cv", Buffer.from("fake pdf content"), "my_cv.pdf");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("User not found.");
  });

  test("should return 500 if supabase upload fails", async () => {
    prisma.user.findUnique.mockResolvedValue({ user_id: 1 });
    storageService.uploadCV.mockRejectedValueOnce(
      new Error("Supabase upload failed"),
    );

    const res = await request(app)
      .post("/api/listings/1/cv")
      .field("email", "applicant@test.com")
      .attach("cv", Buffer.from("fake pdf content"), "my_cv.pdf");

    expect(res.status).toBe(500);
  });
});

describe("GET /api/listings/:id/cv", () => {
  test("should return a signed URL for the CV", async () => {
    prisma.application.findUnique.mockResolvedValue({
      application_id: 1,
      cvFilePath: "user_1/application_1.pdf",
    });

    const res = await request(app).get("/api/listings/1/cv");

    expect(res.status).toBe(200);
    expect(res.body.url).toBe("https://mocked-signed-url.com");
  });

  test("should return 404 if no CV found", async () => {
    prisma.application.findUnique.mockResolvedValue({
      application_id: 1,
      cvFilePath: null,
    });

    const res = await request(app).get("/api/listings/1/cv");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("No CV found for this application.");
  });

  test("should return 404 if application not found", async () => {
    prisma.application.findUnique.mockResolvedValue(null);

    const res = await request(app).get("/api/listings/1/cv");

    expect(res.status).toBe(404);
  });

  test("should return 500 if signed URL generation fails", async () => {
    prisma.application.findUnique.mockResolvedValue({
      application_id: 1,
      cvFilePath: "user_1/application_1.pdf",
    });
    storageService.getCVUrl.mockRejectedValueOnce(new Error("Supabase error"));

    const res = await request(app).get("/api/listings/1/cv");

    expect(res.status).toBe(500);
  });
});
