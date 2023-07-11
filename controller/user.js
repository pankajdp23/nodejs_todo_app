import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import { ErrorHandler } from "../middleware/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exist", 404));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    sendCookie(user, res, 201, "User created successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(404).json({
        success: false,
        message: "Invalid username or password",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(404).json({
        success: false,
        message: "Invalid username or password",
      });

    sendCookie(user, res, 200, `Welcome back ${user.name}`);
  } catch (error) {
    next(error);
  }
};

export const getByUserId = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};

/*

export const getAllUsers = async(req, res) => {
    try {
        console.log(req.query);
        const users = await User.find({});

    res.json({
        success: true,
        users: users,
    })
    } catch (error) {
        console.log(error);
    }
};

export const getByUserId = async(req, res) => {
    try {
    const {id} = req.params;
    console.log(id);
    const users = await User.findById(id);

    res.json({
        success: true,
        users: users,
    })
    } catch (error) {
        console.log(error);
    }   
};

export const register = async(req, res) => {
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });

    res.status(201).cookie("token", "tester").json({
        success: true,
        message: "Registered successfully",
    })
};


export const updateByUserId = async(req, res) => {
    try {
    const {id} = req.params;
    const users = await User.findById(id);

    res.json({
        success: true,
        message: "Updated successfully",
    })
    } catch (error) {
        console.log(error);
    }   
};

export const deleteByUserId = async(req, res) => {
    try {
    const {id} = req.params;
    const users = await User.findById(id);

    res.json({
        success: true,
        message: "Deleted successfully",
    })
    } catch (error) {
        console.log(error);
    }   
};

*/
