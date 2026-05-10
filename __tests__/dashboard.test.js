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
      .mockResolvedValueOnce(10) // totalApplications
      .mockResolvedValueOnce(4)  // shortlistedApplicants
      .mockResolvedValueOnce(2); // successfulPlacements

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

    expect(response.body).toEqual({
      totalListings: 3,
      totalApplications: 10,
      shortlistedApplicants: 4,
      successfulPlacements: 2,
      averagePlacementRate: 20,
      statusBreakdown: [
        { status: "pending", count: 4 },
        { status: "shortlisted", count: 4 },
        { status: "hired", count: 2 },
      ],
      applicationsPerOpportunity: [
        {
          listingId: 1,
          opportunity: "Software Development Internship",
          sector: "ICT",
          count: 5,
          shortlisted: 2,
          placements: 2,
          successRate: 40,
        },
        {
          listingId: 2,
          opportunity: "Finance Learnership",
          sector: "Finance",
          count: 3,
          shortlisted: 1,
          placements: 1,
          successRate: 33.3,
        },
        {
          listingId: 3,
          opportunity: "Marketing Internship",
          sector: "Unspecified",
          count: 0,
          shortlisted: 0,
          placements: 0,
          successRate: 0,
        },
      ],
      sectorAnalysis: [
        {
          sector: "ICT",
          applications: 5,
          placements: 2,
          successRate: 40,
        },
        {
          sector: "Finance",
          applications: 3,
          placements: 1,
          successRate: 33.3,
        },
        {
          sector: "Unspecified",
          applications: 0,
          placements: 0,
          successRate: 0,
        },
      ],
      topOpportunities: [
        {
          listingId: 1,
          opportunity: "Software Development Internship",
          sector: "ICT",
          count: 5,
          shortlisted: 2,
          placements: 2,
          successRate: 40,
        },
        {
          listingId: 2,
          opportunity: "Finance Learnership",
          sector: "Finance",
          count: 3,
          shortlisted: 1,
          placements: 1,
          successRate: 33.3,
        },
        {
          listingId: 3,
          opportunity: "Marketing Internship",
          sector: "Unspecified",
          count: 0,
          shortlisted: 0,
          placements: 0,
          successRate: 0,
        },
      ],
    });
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