import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator(value) {
      if (!validator.email(value)) {
        throw new Error("not valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  token: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// hashing password function or middleware

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  // this.cPassword = await bcrypt.hash(this.cPassword, 12);
  next();
});

const users = new mongoose.model("users", userSchema);
export default users;
