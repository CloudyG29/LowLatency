let renderNotifications;

describe("Notification Rendering UI", () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="notificationsList"></div>
        <span id="notificationBadge" class="hidden">0</span>
      `;

      const applicantView = require('../frontend/roles_js/applicant_view.js');
      renderNotifications = applicantView.renderNotifications;
    });
  
    it("should apply the 'status-unread' class when a notification is not read", () => {
      const testData = [{ id: 1, type: "Update", message: "Test", time: "Now", isRead: false }];
      
      renderNotifications(testData);
      
      const card = document.querySelector('.notification-card');
      const badge = document.querySelector('.status-badge');
      
      expect(card).not.toBeNull();
      expect(badge.classList.contains('status-unread')).toBe(true);
      expect(badge.classList.contains('status-read')).toBe(false);
    });
  });