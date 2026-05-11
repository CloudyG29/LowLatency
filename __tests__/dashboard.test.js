const { TextEncoder, TextDecoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require("supertest");
const express = require("express");

jest.mock("../DB_connect/prisma", () => ({
  listing: {
    count: jest.fn(),
    findMany: jest.fn(),
  },
  application: {
    count: jest.fn(),
    groupBy: jest.fn(),
  },
}));

const prisma = require("../DB_connect/prisma");
const dashboardRoutes = require("../backend/routes/dashboard");

const app = express();
app.use(express.json());
app.use("/api/dashboard", dashboardRoutes);

describe("Dashboard analytics routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/dashboard/summary returns dashboard analytics", async () => {
    prisma.listing.count.mockResolvedValue(3);

    prisma.application.count
      .mockResolvedValueOnce(10)
      .mockResolvedValueOnce(4)
      .mockResolvedValueOnce(2);

    prisma.application.groupBy.mockResolvedValue([
      { status: "pending", _count: { status: 4 } },
      { status: "shortlisted", _count: { status: 4 } },
      { status: "hired", _count: { status: 2 } },
    ]);

    prisma.listing.findMany.mockResolvedValue([
      {
        listings_id: 1,
        listname: "Software Development Internship",
        sector: "ICT",
        _count: { applications: 5 },
        applications: [
          { status: "pending" },
          { status: "shortlisted" },
          { status: "shortlisted" },
          { status: "hired" },
          { status: "hired" },
        ],
      },
      {
        listings_id: 2,
        listname: "Finance Learnership",
        sector: "Finance",
        _count: { applications: 3 },
        applications: [
          { status: "pending" },
          { status: "shortlisted" },
          { status: "hired" },
        ],
      },
      {
        listings_id: 3,
        listname: "Marketing Internship",
        sector: null,
        _count: { applications: 0 },
        applications: [],
      },
    ]);

    const response = await request(app).get("/api/dashboard/summary");

    expect(response.status).toBe(200);

    expect(response.body.totalListings).toBe(3);
    expect(response.body.totalApplications).toBe(10);
    expect(response.body.shortlistedApplicants).toBe(4);
    expect(response.body.successfulPlacements).toBe(2);

    expect(response.body.statusBreakdown).toEqual([
      { status: "pending", count: 4 },
      { status: "shortlisted", count: 4 },
      { status: "hired", count: 2 },
    ]);

    expect(response.body.applicationsPerOpportunity.length).toBe(3);
    expect(response.body.sectorAnalysis.length).toBe(3);
    expect(response.body.topOpportunities.length).toBe(3);
  });

  test("GET /api/dashboard/summary handles zero applications", async () => {
    prisma.listing.count.mockResolvedValue(0);

    prisma.application.count
      .mockResolvedValueOnce(0)
      .mockResolvedValueOnce(0)
      .mockResolvedValueOnce(0);

    prisma.application.groupBy.mockResolvedValue([]);
    prisma.listing.findMany.mockResolvedValue([]);

    const response = await request(app).get("/api/dashboard/summary");

    expect(response.status).toBe(200);
    expect(response.body.averagePlacementRate).toBe(0);
    expect(response.body.statusBreakdown).toEqual([]);
    expect(response.body.applicationsPerOpportunity).toEqual([]);
    expect(response.body.sectorAnalysis).toEqual([]);
    expect(response.body.topOpportunities).toEqual([]);
  });

  test("GET /api/dashboard/summary returns 500 when Prisma fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    prisma.listing.count.mockRejectedValue(new Error("DB failed"));

    const response = await request(app).get("/api/dashboard/summary");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Failed to load dashboard summary.",
    });

    console.error.mockRestore();
  });
});