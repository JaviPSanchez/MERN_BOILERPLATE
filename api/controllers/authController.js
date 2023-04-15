import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// CREATE

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      //   username: req.body.username,
      //   email: req.body.email,
      //   password: req.body.password,
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

// LOGIN

export const login = async (req, res, next) => {
  console.log(req.body); //undefined
  try {
    console.log("CheckPoint");
    const user = await User.findOne({ username: req.body.username });
    console.log("user", user);
    //Custom error
    if (!user) return next(createError(404, "User not found!"));

    //Check password

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(isPasswordCorrect); // true

    //Custom error

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    // Check if user is admin or not:

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    console.log("token:", token);

    //quitar password y isAdmin de la respuesta:

    const { password, isAdmin, ...otherDetails } = user._doc;

    console.log("password:", password);
    console.log("isAdmin:", isAdmin);
    console.log("Other details:", otherDetails);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
    console.log("res:", res);
  } catch (err) {
    next(err);
  }
};
