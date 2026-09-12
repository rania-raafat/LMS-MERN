import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

// =====================================================
// Constants
// =====================================================

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d).{6,128}$/;

// =====================================================
// Generate JWT
// =====================================================

const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
};

// =====================================================
// Validate Email
// =====================================================

const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  }

  if (email.length > 254) {
    return "Email cannot exceed 254 characters";
  }

  if (!EMAIL_REGEX.test(email)) {
    return "Please provide a valid email address";
  }

  return null;
};

// =====================================================
// Validate Password
// =====================================================

const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (password.length > 128) {
    return "Password cannot exceed 128 characters";
  }

  if (!PASSWORD_REGEX.test(password)) {
    return "Password must contain at least one letter and one number";
  }

  return null;
};

// =====================================================
// REGISTER
// =====================================================

export const register = async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    // -------------------------------------------------
    // Check required fields
    // -------------------------------------------------

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, and password are required",
      });
    }

    // -------------------------------------------------
    // Normalize input
    // -------------------------------------------------

    const trimmedName = name.trim();
    const normalizedEmail =
      email.toLowerCase().trim();

    // -------------------------------------------------
    // Validate name
    // -------------------------------------------------

    if (!trimmedName) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (trimmedName.length < 2) {
      return res.status(400).json({
        success: false,
        message:
          "Name must be at least 2 characters",
      });
    }

    if (trimmedName.length > 50) {
      return res.status(400).json({
        success: false,
        message:
          "Name cannot exceed 50 characters",
      });
    }

    // -------------------------------------------------
    // Validate email
    // -------------------------------------------------

    const emailError =
      validateEmail(normalizedEmail);

    if (emailError) {
      return res.status(400).json({
        success: false,
        message: emailError,
      });
    }

    // -------------------------------------------------
    // Validate password
    // -------------------------------------------------

    const passwordError =
      validatePassword(password);

    if (passwordError) {
      return res.status(400).json({
        success: false,
        message: passwordError,
      });
    }

    // -------------------------------------------------
    // Check existing user
    // -------------------------------------------------

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists",
      });
    }

    // -------------------------------------------------
    // Hash password
    // -------------------------------------------------

    const hashedPassword =
      await bcrypt.hash(password, 12);

    // -------------------------------------------------
    // Create user
    // -------------------------------------------------

    const user = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
      isActive: true,
    });

    // -------------------------------------------------
    // Generate token
    // -------------------------------------------------

    const token = generateToken(user);

    // -------------------------------------------------
    // Response
    // -------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    // -------------------------------------------------
    // Mongoose validation error
    // -------------------------------------------------

    if (error.name === "ValidationError") {
      const firstError =
        Object.values(error.errors)[0];

      return res.status(400).json({
        success: false,
        message:
          firstError?.message ||
          "Invalid user data",
      });
    }

    // -------------------------------------------------
    // Duplicate key error
    // -------------------------------------------------

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists",
      });
    }

    // -------------------------------------------------
    // Server error
    // -------------------------------------------------

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

// =====================================================
// LOGIN
// =====================================================

export const login = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    // -------------------------------------------------
    // Check required fields
    // -------------------------------------------------

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    // -------------------------------------------------
    // Normalize email
    // -------------------------------------------------

    const normalizedEmail =
      email.toLowerCase().trim();

    // -------------------------------------------------
    // Validate email
    // -------------------------------------------------

    const emailError =
      validateEmail(normalizedEmail);

    if (emailError) {
      return res.status(400).json({
        success: false,
        message: emailError,
      });
    }

    // -------------------------------------------------
    // Validate password presence
    // -------------------------------------------------

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // -------------------------------------------------
    // Find user
    // -------------------------------------------------

    const user = await User.findOne({
      email: normalizedEmail,
    });

    // -------------------------------------------------
    // Do not reveal whether email exists
    // -------------------------------------------------

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // -------------------------------------------------
    // Check account status
    // -------------------------------------------------

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "Your account has been deactivated",
      });
    }

    // -------------------------------------------------
    // Compare password
    // -------------------------------------------------

    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password,
      );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // -------------------------------------------------
    // Generate token
    // -------------------------------------------------

    const token = generateToken(user);

    // -------------------------------------------------
    // Response
    // -------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};