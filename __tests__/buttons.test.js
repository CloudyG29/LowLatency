/**
 * @jest-environment jsdom
 */

describe("UI Button Interactions Test Suite", () => {
  
    beforeEach(() => {
      // CRITICAL: Clears the module cache so the script re-executes and binds 
      // to the fresh DOM in every single test.
      jest.resetModules();
  
      // Inject the dummy DOM matching the exact IDs your script looks for
      document.body.innerHTML = `
        <button id="registerBtn">Register</button>
        <div id="registerMessage"></div>
  
        <button id="applyBtn">Apply</button>
        <div id="applyMessage"></div>
  
        <button id="postBtn">Post</button>
        <div id="postMessage"></div>
  
        <button id="approveBtn">Approve</button>
        <button id="rejectBtn">Reject</button>
        <div id="adminMessage"></div>
        <div id="statusText"></div>
      `;
    });
  
    afterEach(() => {
      document.body.innerHTML = '';
    });
  
    // Helper function to safely load your script
    const loadScript = () => {
      // ⚠️ CHANGE THIS PATH to point to your actual JavaScript file
      require('../frontend/script.js'); 
    };
  
    test("registerBtn updates registerMessage on click", () => {
      loadScript(); // Load script AFTER the DOM is injected
      const btn = document.getElementById("registerBtn");
      const msg = document.getElementById("registerMessage");
  
      btn.click();
  
      expect(msg.textContent).toBe("Account created successfully!");
      expect(msg.className).toBe("success");
    });
  
    test("applyBtn updates applyMessage on click", () => {
      loadScript();
      const btn = document.getElementById("applyBtn");
      const msg = document.getElementById("applyMessage");
  
      btn.click();
  
      expect(msg.textContent).toBe("Application submitted successfully!");
      expect(msg.className).toBe("success");
    });
  
    test("postBtn updates postMessage on click", () => {
      loadScript();
      const btn = document.getElementById("postBtn");
      const msg = document.getElementById("postMessage");
  
      btn.click();
  
      expect(msg.textContent).toBe("Listing submitted successfully! Status: Pending approval.");
      expect(msg.className).toBe("success");
    });
  
    test("approveBtn updates adminMessage and statusText on click", () => {
      loadScript();
      const btn = document.getElementById("approveBtn");
      const adminMsg = document.getElementById("adminMessage");
      const statusText = document.getElementById("statusText");
  
      btn.click();
  
      expect(adminMsg.textContent).toBe("Listing approved successfully!");
      expect(adminMsg.className).toBe("success");
      
      expect(statusText.textContent).toBe("Approved");
      expect(statusText.className).toBe("success");
    });
  
    test("rejectBtn updates adminMessage and statusText on click", () => {
      loadScript();
      const btn = document.getElementById("rejectBtn");
      const adminMsg = document.getElementById("adminMessage");
      const statusText = document.getElementById("statusText");
  
      btn.click();
  
      expect(adminMsg.textContent).toBe("Listing rejected.");
      expect(adminMsg.className).toBe("error");
      
      expect(statusText.textContent).toBe("Rejected");
      expect(statusText.className).toBe("error");
    });
  
    test("script does not throw errors if buttons are completely missing from the DOM", () => {
      // Test the `if (registerBtn)` guards by providing an empty page
      document.body.innerHTML = '';
  
      expect(() => {
        loadScript();
      }).not.toThrow();
    });
  
    test("approve/reject buttons do not crash if the inner statusText is missing", () => {
      // Test the internal `if (statusText)` guard
      document.body.innerHTML = `
        <button id="approveBtn">Approve</button>
        <button id="rejectBtn">Reject</button>
        <div id="adminMessage"></div>
        `;
      loadScript();
  
      const approveBtn = document.getElementById("approveBtn");
      const rejectBtn = document.getElementById("rejectBtn");
      const adminMsg = document.getElementById("adminMessage");
  
      // Clicking should not throw, and admin message should still work
      expect(() => approveBtn.click()).not.toThrow();
      expect(adminMsg.textContent).toBe("Listing approved successfully!");
  
      expect(() => rejectBtn.click()).not.toThrow();
      expect(adminMsg.textContent).toBe("Listing rejected.");
    });
  });