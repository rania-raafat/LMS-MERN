import Contact from "../models/Contact.js";
import { sendEmail } from "../config/email.js";

export const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    // =====================================================
    // REQUIRED FIELDS VALIDATION
    // =====================================================

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!subject?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subject is required",
      });
    }

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // =====================================================
    // CLEAN DATA
    // =====================================================

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    // =====================================================
    // NAME VALIDATION
    // =====================================================

    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters",
      });
    }

    if (cleanName.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Name must not exceed 50 characters",
      });
    }

    const nameRegex = /^[\p{L}\p{M}\s'-]+$/u;

    if (!nameRegex.test(cleanName)) {
      return res.status(400).json({
        success: false,
        message: "Name contains invalid characters",
      });
    }

    // =====================================================
    // EMAIL VALIDATION
    // =====================================================

    if (cleanEmail.length > 254) {
      return res.status(400).json({
        success: false,
        message: "Email must not exceed 254 characters",
      });
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // =====================================================
    // SUBJECT VALIDATION
    // =====================================================

    if (cleanSubject.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Subject must be at least 3 characters",
      });
    }

    if (cleanSubject.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Subject must not exceed 100 characters",
      });
    }

    // =====================================================
    // MESSAGE VALIDATION
    // =====================================================

    if (cleanMessage.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 10 characters",
      });
    }

    if (cleanMessage.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Message must not exceed 1000 characters",
      });
    }

    // =====================================================
    // SAVE TO DATABASE
    // =====================================================

    const contact = await Contact.create({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });

    // =====================================================
    // SEND EMAILS
    // =====================================================

    try {
      // ---------------------------------------------------
      // THANK YOU EMAIL TO USER
      // ---------------------------------------------------

      await sendEmail(
        cleanEmail,
        "LMS - We received your inquiry",
        `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Thank you for contacting LMS</h2>

            <p>Hello ${cleanName},</p>

            <p>
              We have received your inquiry successfully.
            </p>

            <p>
              <strong>Subject:</strong>
              ${cleanSubject}
            </p>

            <p>
              Our team will get back to you soon.
            </p>

            <p>
              Best regards,<br />
              LMS Team
            </p>
          </div>
        `
      );

      // ---------------------------------------------------
      // NOTIFICATION EMAIL TO OWNER
      // ---------------------------------------------------

      await sendEmail(
        "raniaraafat421@gmail.com",
        `New Inquiry - ${cleanSubject}`,
        `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New Inquiry Received</h2>

            <p>
              You have received a new message
              through the LMS website.
            </p>

            <hr />

            <p>
              <strong>Name:</strong>
              ${cleanName}
            </p>

            <p>
              <strong>Email:</strong>
              ${cleanEmail}
            </p>

            <p>
              <strong>Subject:</strong>
              ${cleanSubject}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <p>
              ${cleanMessage}
            </p>

            <hr />

            <p>
              <strong>Received:</strong>
              ${new Date().toLocaleString()}
            </p>
          </div>
        `
      );
    } catch (emailError) {
      /*
       * The inquiry has already been successfully
       * stored in MongoDB.
       *
       * Email failure should NOT make the API
       * report the entire inquiry as failed.
       */

      console.error(
        "Contact Email Error:",
        emailError
      );
    }

    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: contact,
    });
  } catch (error) {
    console.error(
      "Create Contact Error:",
      error
    );

    // =====================================================
    // MONGOOSE VALIDATION ERROR
    // =====================================================

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(
        error.errors
      ).map((err) => err.message);

      return res.status(400).json({
        success: false,
        message: validationErrors.join(", "),
      });
    }

    // =====================================================
    // SERVER ERROR
    // =====================================================

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong. Please try again later.",
    });
  }
};

// =========================================================
// GET ALL CONTACTS
// =========================================================

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error(
      "Get Contacts Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong. Please try again later.",
    });
  }
};