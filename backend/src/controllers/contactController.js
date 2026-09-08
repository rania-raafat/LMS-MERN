import Contact from "../models/Contact.js";
import { sendEmail } from "../config/email.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Save inquiry to MongoDB
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // Send notification email
    await sendEmail(
      email.trim(),
      `LMS - We received your inquiry`,
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
      VOLTIX Team
    </p>
  `,
    );

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
