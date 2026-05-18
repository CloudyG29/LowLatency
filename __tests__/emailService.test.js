const nodemailer = require("nodemailer");

jest.mock("nodemailer");

const mockSendMail = jest.fn();

nodemailer.createTransport.mockReturnValue({
  sendMail: mockSendMail,
});

const { sendStatusEmail } = require("../backend/emailService");

describe("emailService - sendStatusEmail", () => {
  let consoleLogSpy;
  let consoleErrorSpy;

  beforeAll(() => {
    process.env.EMAIL_USER = "skillbridge@test.com";
  });

  beforeEach(() => {
    jest.clearAllMocks();

    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test("successfully constructs and sends an email", async () => {
    mockSendMail.mockResolvedValueOnce(true);

    await sendStatusEmail("applicant@example.com", "Alice", "Data Analyst Intern", "shortlisted");

    expect(mockSendMail).toHaveBeenCalledTimes(1);

    const expectedMailOptions = expect.objectContaining({
      from: '"Skillbridge Notifications" <skillbridge@test.com>',
      to: "applicant@example.com",
      subject: "Application Status Update: Data Analyst Intern",
      html: expect.stringContaining("Hello Alice,"),
    });
    
    expect(mockSendMail).toHaveBeenCalledWith(expectedMailOptions);
    
    const actualHtml = mockSendMail.mock.calls[0][0].html;
    expect(actualHtml).toContain("SHORTLISTED");

    expect(consoleLogSpy).toHaveBeenCalledWith("Email sent successfully to applicant@example.com");
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  test("catches and logs an error if the email fails to send", async () => {
    const mockError = new Error("SMTP Connection Refused");
    mockSendMail.mockRejectedValueOnce(mockError);

    await sendStatusEmail("applicant@example.com", "Bob", "Frontend Dev", "rejected");

    expect(mockSendMail).toHaveBeenCalledTimes(1);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error sending email:", mockError);
    
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });
});