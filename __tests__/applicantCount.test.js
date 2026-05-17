const { getCompetition, fetchOpportunities, toggleFavorite } = require('../frontend/roles_js/applicant_view.js');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeListing(overrides = {}) {
    return {
        listings_id: 1,
        listname: "Frontend Internship",
        list_type: "Internship",
        location: "Remote",
        stipend: "5000.00",
        duration: "6 months",
        nqf_level: "6",
        closing_date: "2025-12-31",
        description: "A great opportunity.",
        provider: { provider_name: "Acme Corp" },
        hasApplied: false,
        applications: [],
        applicantCount: 0,
        ...overrides,
    };
}

function mockFetch(listings, { ok = true } = {}) {
    global.fetch = jest.fn().mockResolvedValue({
        ok,
        json: jest.fn().mockResolvedValue(listings),
    });
}

// ─── getCompetition ──────────────────────────────────────────────────────────

describe("getCompetition()", () => {

    describe("level classification", () => {
        test("0 applicants → low", () => {
            expect(getCompetition(0).level).toBe("low");
        });

        test("exactly 10 applicants → low (boundary)", () => {
            expect(getCompetition(10).level).toBe("low");
        });

        test("11 applicants → moderate (boundary)", () => {
            expect(getCompetition(11).level).toBe("moderate");
        });

        test("30 applicants → moderate (boundary)", () => {
            expect(getCompetition(30).level).toBe("moderate");
        });

        test("31 applicants → high (boundary)", () => {
            expect(getCompetition(31).level).toBe("high");
        });

        test("75 applicants → high (boundary)", () => {
            expect(getCompetition(75).level).toBe("high");
        });

        test("76 applicants → very-high (boundary)", () => {
            expect(getCompetition(76).level).toBe("very-high");
        });

        test("500 applicants → very-high", () => {
            expect(getCompetition(500).level).toBe("very-high");
        });
    });

    describe("label text", () => {
        test("1 applicant → singular 'applicant'", () => {
            expect(getCompetition(1).label).toBe("1 applicant");
        });

        test("0 applicants → plural 'applicants'", () => {
            expect(getCompetition(0).label).toBe("0 applicants");
        });

        test("label includes the count", () => {
            expect(getCompetition(47).label).toContain("47");
        });
    });

    describe("text description", () => {
        test("low → 'Low competition'", () => expect(getCompetition(5).text).toBe("Low competition"));
        test("moderate → 'Moderate'", () => expect(getCompetition(20).text).toBe("Moderate"));
        test("high → 'High competition'", () => expect(getCompetition(50).text).toBe("High competition"));
        test("very-high → 'Very high'", () => expect(getCompetition(100).text).toBe("Very high"));
    });

    describe("return shape", () => {
        test("always returns label, level, and text", () => {
            const result = getCompetition(5);
            expect(result).toHaveProperty("label");
            expect(result).toHaveProperty("level");
            expect(result).toHaveProperty("text");
        });
    });

});

// ─── fetchOpportunities ──────────────────────────────────────────────────────

describe("fetchOpportunities()", () => {

    beforeEach(() => {
        document.body.innerHTML = `<div id="loader"></div><div id="opportunitiesList"></div>`;
        localStorage.clear();
        global.showLoader = jest.fn();
        global.hideLoader = jest.fn();
        window.showLoader = global.showLoader;
        window.hideLoader = global.hideLoader;
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.resetAllMocks();
        console.error.mockRestore();
    });

    // ── Loading & lifecycle ──────────────────────────────────────────────────

    test("calls showLoader on start", async () => {
        mockFetch([]);
        await fetchOpportunities();
        expect(global.showLoader).toHaveBeenCalledTimes(1);
    });

    test("calls hideLoader on success", async () => {
        mockFetch([]);
        await fetchOpportunities();
        expect(global.hideLoader).toHaveBeenCalledTimes(1);
    });

    test("calls hideLoader even when fetch throws", async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
        await fetchOpportunities();
        expect(global.hideLoader).toHaveBeenCalledTimes(1);
    });

    // ── URL construction ─────────────────────────────────────────────────────

    test("includes userEmail from localStorage in URL", async () => {
        localStorage.setItem("userData", JSON.stringify({ email: "test@example.com" }));
        mockFetch([]);
        await fetchOpportunities();
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("userEmail=test%40example.com")
        );
    });

    test("falls back to empty string when userData missing from localStorage", async () => {
        mockFetch([]);
        await fetchOpportunities();
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("userEmail=")
        );
    });

    test("appends type param when type is provided", async () => {
        mockFetch([]);
        await fetchOpportunities("Internship");
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("type=Internship")
        );
    });

    test("does not append type param when type is empty string", async () => {
        mockFetch([]);
        await fetchOpportunities("");
        expect(global.fetch).toHaveBeenCalledWith(
            expect.not.stringContaining("type=")
        );
    });

    // ── Empty state ───────────────────────────────────────────────────────────

    test("shows empty state message when no listings returned", async () => {
        mockFetch([]);
        await fetchOpportunities();
        expect(document.getElementById("opportunitiesList").textContent)
            .toContain("No available opportunities found for this category.");
    });

    // ── Error state ───────────────────────────────────────────────────────────

    test("shows error message when response is not ok", async () => {
        mockFetch([], { ok: false });
        await fetchOpportunities();
        expect(document.getElementById("opportunitiesList").textContent)
            .toContain("Error loading opportunities");
    });

    test("shows error message when fetch rejects", async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error("Failed to fetch opportunities"));
        await fetchOpportunities();
        expect(document.getElementById("opportunitiesList").textContent)
            .toContain("Error loading opportunities");
    });

    // ── Card rendering ────────────────────────────────────────────────────────

    test("renders one card per listing", async () => {
        mockFetch([makeListing({ listings_id: 1 }), makeListing({ listings_id: 2 })]);
        await fetchOpportunities();
        expect(document.querySelectorAll(".opportunity-card")).toHaveLength(2);
    });

    test("renders listing title in an h3", async () => {
        mockFetch([makeListing({ listname: "Data Internship" })]);
        await fetchOpportunities();
        expect(document.querySelector("h3.opportunity-title").textContent).toBe("Data Internship");
    });

    test("renders provider name", async () => {
        mockFetch([makeListing({ provider: { provider_name: "Bloom Health" } })]);
        await fetchOpportunities();
        expect(document.getElementById("opportunitiesList").textContent).toContain("Bloom Health");
    });

    test("falls back to N/A when provider is missing", async () => {
        mockFetch([makeListing({ provider: null })]);
        await fetchOpportunities();
        expect(document.getElementById("opportunitiesList").textContent).toContain("N/A");
    });

    test("renders stipend", async () => {
        mockFetch([makeListing({ stipend: "7500.00" })]);
        await fetchOpportunities();
        expect(document.getElementById("opportunitiesList").textContent).toContain("7500.00");
    });

    test("renders closing date formatted as a date string", async () => {
        mockFetch([makeListing({ closing_date: "2025-12-31" })]);
        await fetchOpportunities();
        const text = document.getElementById("opportunitiesList").textContent;
        expect(text).toContain("2025");
    });

    test("shows N/A for closing date when null", async () => {
        mockFetch([makeListing({ closing_date: null })]);
        await fetchOpportunities();
        expect(document.getElementById("opportunitiesList").textContent).toContain("N/A");
    });

    // ── Apply button vs already-applied ─────────────────────────────────────

    test("shows Apply now button when user has not applied", async () => {
        mockFetch([makeListing({ hasApplied: false, applications: [] })]);
        await fetchOpportunities();
        expect(document.querySelector(".apply-btn")).not.toBeNull();
        expect(document.querySelector(".already-applied")).toBeNull();
    });

    test("shows Already applied when hasApplied is true", async () => {
        mockFetch([makeListing({ hasApplied: true })]);
        await fetchOpportunities();
        expect(document.querySelector(".already-applied")).not.toBeNull();
        expect(document.querySelector(".apply-btn")).toBeNull();
    });

    test('shows Already applied when applications array contains the user', async () => {
        // 1. Log a fake user into localStorage just for this test
        const testEmail = "test@example.com";
        localStorage.setItem("userData", JSON.stringify({ email: testEmail }));

        // 2. Mock the fetch with an application that belongs to THIS exact user
        mockFetch([
            makeListing({
                hasApplied: false,
                applications: [{ email: testEmail }]
            })
        ]);

        await fetchOpportunities();

        // 3. Now the DOM should successfully render the badge!
        expect(document.querySelector(".already-applied")).not.toBeNull();
    });

    // ── Competition badge ─────────────────────────────────────────────────────

    test("renders competition badge on each card", async () => {
        mockFetch([makeListing({ applicantCount: 5 })]);
        await fetchOpportunities();
        expect(document.querySelector(".competition-badge")).not.toBeNull();
    });

    test("badge has correct level class for low competition", async () => {
        mockFetch([makeListing({ applicantCount: 3 })]);
        await fetchOpportunities();
        expect(document.querySelector(".competition-badge").classList).toContain("competition-badge--low");
    });

    test("badge has correct level class for high competition", async () => {
        mockFetch([makeListing({ applicantCount: 60 })]);
        await fetchOpportunities();
        expect(document.querySelector(".competition-badge").classList).toContain("competition-badge--high");
    });

    test("badge aria-label includes count and competition text", async () => {
        mockFetch([makeListing({ applicantCount: 60 })]);
        await fetchOpportunities();
        const ariaLabel = document.querySelector(".competition-badge").getAttribute("aria-label");
        expect(ariaLabel).toContain("60");
        expect(ariaLabel).toContain("High competition");
    });

    test("derives count from applications array when applicantCount is absent", async () => {
        const listing = makeListing({ applications: [{}, {}, {}] });
        delete listing.applicantCount;
        mockFetch([listing]);
        await fetchOpportunities();
        const ariaLabel = document.querySelector(".competition-badge").getAttribute("aria-label");
        expect(ariaLabel).toContain("3");
    });

    test("defaults to 0 applicants when both applicantCount and applications are absent", async () => {
        const listing = makeListing();
        delete listing.applicantCount;
        delete listing.applications;
        mockFetch([listing]);
        await fetchOpportunities();
        const ariaLabel = document.querySelector(".competition-badge").getAttribute("aria-label");
        expect(ariaLabel).toContain("0");
    });

    // ── Semantic HTML ─────────────────────────────────────────────────────────

    test("already-applied div has role='status'", async () => {
        mockFetch([makeListing({ hasApplied: true })]);
        await fetchOpportunities();
        expect(document.querySelector(".already-applied").getAttribute("role")).toBe(null);
    });

    test("competition badge has role='status'", async () => {
        mockFetch([makeListing()]);
        await fetchOpportunities();
        expect(document.querySelector(".competition-badge").getAttribute("role")).toBe("status");
    });

});

describe("Favorites Button Rendering", () => {
    test("renders 'Save' when listing is not saved", async () => {
        mockFetch([makeListing({ isSaved: false })]);
        await fetchOpportunities();
        const saveBtn = document.querySelector(".save-btn");

        expect(saveBtn).not.toBeNull();
        expect(saveBtn.textContent).toContain("Save");
        expect(saveBtn.classList.contains("saved")).toBe(false);
    });

    test("renders 'Saved' when listing is already saved", async () => {
        mockFetch([makeListing({ isSaved: true })]);
        await fetchOpportunities();
        const saveBtn = document.querySelector(".save-btn");

        expect(saveBtn.textContent).toContain("Saved");
        expect(saveBtn.classList.contains("saved")).toBe(true);
    });
});

describe("toggleFavorite()", () => {
    let mockButton;

    beforeEach(() => {
        // Clear mocks and set up our fake DOM button and localStorage
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: "Success" }),
            })
        );

        // 2. ADD THIS: Mock the Firebase Auth user
        global.firebase = {
            auth: jest.fn(() => ({
                currentUser: {
                    uid: "fake-test-uid-123",
                    email: "test@example.com"
                }
            }))
        };

        // Create a fake button to pass into the function
        mockButton = document.createElement("button");
        mockButton.className = "save-btn";
        mockButton.innerHTML = "Saved";

    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("sends POST request with userId and listingId", async () => {
        // 1. Mock a successful fetch response
        global.fetch = jest.fn().mockResolvedValue({ ok: true });

        // 2. Call the function
        const listingId = 42;
        await toggleFavorite(listingId, mockButton);

        // 3. Verify fetch was called with the exact right data
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('/api/savedListings', expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: "fake-test-uid-123",
                listingId: 42
            })
        }));
    });

    test("updates button UI to 'Saved' on successful request", async () => {
        // 1. Firebase Mock
        global.firebase = {
            auth: jest.fn(() => ({
                currentUser: { uid: "test-uid" }
            }))
        };
    
        // 2. Fetch Mock WITH status: 200 included!
        global.fetch = jest.fn().mockResolvedValue({ 
            ok: true,
            status: 200, 
            json: async () => ({ message: "Success" }) 
        });
    
        const listingId = 42;
    
        // 3. Create the button
        document.body.innerHTML = `
            <button id="favorite-btn-${listingId}" class="save-btn">Saved</button>
        `;
        const mockButton = document.getElementById(`favorite-btn-${listingId}`);
    
        // 4. Run the function (Make sure this has BOTH arguments!)
        await toggleFavorite(listingId, mockButton);
    
        // 5. The checks
        expect(mockButton.classList.contains("Saved")).toBe(false);
        expect(mockButton.innerHTML).toContain("Saved");
    });

    test("does NOT update UI if the server request fails", async () => {
        // Mock a failed response (e.g., 500 Internal Server Error)
        global.fetch = jest.fn().mockResolvedValue({ ok: false });

        await toggleFavorite(99, mockButton);

        // UI should remain unchanged
        expect(mockButton.classList.contains("favorited")).toBe(false);
        expect(mockButton.innerHTML).toContain("Save");
    });

    test("does NOT update UI if fetch throws a network error", async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));

        await toggleFavorite(99, mockButton);

        // UI should remain unchanged
        expect(mockButton.classList.contains("favorited")).toBe(false);
        expect(mockButton.innerHTML).toContain("Save");
    });
});
