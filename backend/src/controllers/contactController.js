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

    // ================= VALIDATION =================

    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // ================= SAVE TO DATABASE =================

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // ================= SEND THANK YOU TO SENDER =================

    await sendEmail(
      email.trim(),
      "LMS - We received your inquiry",
      `
        <h2>Thank you for contacting LMS</h2>

        <p>Hello ${name.trim()},</p>

        <p>
          We have received your inquiry successfully.
        </p>

        <p>
          <strong>Subject:</strong> ${subject.trim()}
        </p>

        <p>
          Our team will get back to you soon.
        </p>

        <p>
          Best regards,<br />
          LMS Team
        </p>
      `
    );

    // ================= SEND NOTIFICATION TO OWNER =================

    await sendEmail(
      "raniaraafat421@gmail.com",
      `New Inquiry - ${subject.trim()}`,
      `
        <h2>New Inquiry Received</h2>

        <p>
          You have received a new message through the LMS website.
        </p>

        <hr />

        <p>
          <strong>Name:</strong> ${name.trim()}
        </p>

        <p>
          <strong>Email:</strong> ${email.trim()}
        </p>

        <p>
          <strong>Subject:</strong> ${subject.trim()}
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <p>
          ${message.trim()}
        </p>

        <hr />

        <p>
          <strong>Received:</strong>
          ${new Date().toLocaleString()}
        </p>
      `
    );

    // ================= SUCCESS RESPONSE =================

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

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
    console.error("Get Contacts Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};