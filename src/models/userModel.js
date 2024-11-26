import mongoose from "mongoose";
const validator = require("validator");
// const { Schema, default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "Please provide firstname"],
    unique: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide firstname"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Not a valid email address",
    },
  },
  phoneNumber: {
    type: Number,
    min: [1000000000, "Phone number is too short"],
    max: [9999999999, "Phone number is too long"],
    required: [true, "Please Enter Your Phone-Number"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  avatar: {
    public_id: { type: String },
    url: { type: String },
  },
  sign_up_Date: {
    type: String,
    default: Date(),
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
//   mongoose.models.users ||  <-- this will check before creation of model.

export default User;
