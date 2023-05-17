import express from "express";
import users from "../model/usersSchema.js";
import bcrypt from "bcryptjs";

const router = new express.Router();

// for user registration
router.post("/register", async (req, res) => {
  try {
    const {fname, email, password, cPassword} = req.body;
    if (!fname || !email || !password || !cPassword) {
      res.status(422).json({error: "all fields required !!"});
    } else if (password !== cPassword) {
      res.status(422).json({error: "password doesn't match !!"});
    } else {
      // hashing passwords
      // const hashPassword = await bcrypt.hash(password, 12);
      // const hashCPassword = await bcrypt.hash(password, 12);

      const finalUser = new users({
        fname: fname, // mongoSchema fname : req.body.fname
        email: email,
        password: password,
      });

      // // here password hashing function or middleware works, just before saving user on database

      const saveUser = await finalUser.save();
      res.status(201).json({message: "user successfully registered"});
      console.log("saved", saveUser);
    }
  } catch (err) {
    if (err.keyValue) {
      res
        .status(401)
        .json({error: `user email ${err.keyValue.email} is allready exist `});
      console.log(err);
    } else {
      res.status(401).json({error: err});
      console.log(err);
    }
  }
});

export default router;
