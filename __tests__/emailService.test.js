/**
 * @jest-environment node
 */

// 1. Setup global dummy environment variables before requiring the module
process.env.EMAIL_USER = 'skillbridge.test@gmail.com';
process.env.EMAIL_PASS = 'mockpassword123';

// 2. Mock nodemailer BEFORE requiring the target service file
const mockSendMail = jest.fn();
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: mockSendMail
  }))
}));

// Import the email service functions
const { sendStatusEmail, sendClosingReminderEmail } = require('../backend/emailService'); // Verify this relative path matches your folder structure

describe('Email Notification Service Suite', () => {
  let consoleLogSpy, consoleErrorSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    // Spy on console methods and silence them to keep terminal outputs perfectly clean
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  // ==========================================
  // 1. Tests for sendStatusEmail
  // ==========================================
  describe('sendStatusEmail', () => {
    test('should successfully send a status email and capitalize the status code', async () => {
      mockSendMail.mockResolvedValueOnce({ messageId: 'mock-id-123' });

      await sendStatusEmail('applicant@test.com', 'John', 'Software Dev Intern', 'pending');

      // Verify nodemailer was triggered with the correct fields
      expect(mockSendMail).toHaveBeenCalledTimes(1);
      expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
        from: '"Skillbridge Notifications" <skillbridge.test@gmail.com>',
        to: 'applicant@test.com',
        subject: 'Application Status Update: Software Dev Intern'
      }));

      // Verify that the status value was successfully converted to uppercase inside the html template
      const sentHtml = mockSendMail.mock.calls[0][0].html;
      expect(sentHtml).toContain('PENDING');
      expect(sentHtml).toContain('Hello John,');

      // Check success logging output
      expect(consoleLogSpy).toHaveBeenCalledWith('Email sent successfully to applicant@test.com');
    });

    test('should catch and log internal errors safely when transporter.sendMail fails', async () => {
      const mockError = new Error('SMTP Connection timeout failure');
      mockSendMail.mockRejectedValueOnce(mockError);

      await sendStatusEmail('applicant@test.com', 'John', 'Software Dev Intern', 'rejected');

      // Ensure that function executed completely without throwing out to the caller
      expect(mockSendMail).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending email:', mockError);
    });
  });

  // ==========================================
  // 2. Tests for sendClosingReminderEmail
  // ==========================================
  describe('sendClosingReminderEmail', () => {
    test('should successfully send a closing reminder with the provided userName', async () => {
      mockSendMail.mockResolvedValueOnce({ messageId: 'mock-id-456' });

      await sendClosingReminderEmail('applicant@test.com', 'Sarah', 'UX Design Apprentice');

      expect(mockSendMail).toHaveBeenCalledTimes(1);
      const sentHtml = mockSendMail.mock.calls[0][0].html;
      expect(sentHtml).toContain('Hello Sarah,');
      expect(sentHtml).toContain('<strong>UX Design Apprentice</strong>');
      expect(consoleLogSpy).toHaveBeenCalledWith('Closing reminder email sent successfully to applicant@test.com');
    });

    test('should execute the fallback branch and use "there" if userName is empty or falsy', async () => {
      mockSendMail.mockResolvedValueOnce({ messageId: 'mock-id-789' });

      // Trigger the branch by passing an empty string or undefined name value
      await sendClosingReminderEmail('applicant@test.com', '', 'Data Analyst Graduate');

      expect(mockSendMail).toHaveBeenCalledTimes(1);
      const sentHtml = mockSendMail.mock.calls[0][0].html;
      
      // Verifies that 'userName || "there"' conditional fallback operates successfully
      expect(sentHtml).toContain('Hello there,');
    });

    test('should catch and log errors safely when sending a closing reminder hits a transport fault', async () => {
      const mockError = new Error('Authentication rejected');
      mockSendMail.mockRejectedValueOnce(mockError);

      await sendClosingReminderEmail('applicant@test.com', 'Sarah', 'UX Design Apprentice');

      expect(mockSendMail).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending closing reminder email:', mockError);
    });
  });
});