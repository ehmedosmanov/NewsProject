import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { User } from "../models/userModel";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExist = await User.findOne({ username: username });
    if (userExist)
      return res.status(404).json({ message: "User Already Register" });
    const hashPasword = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hashPasword,
    });
    await newUser.save();
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    const cookieOptions = {
      httpOnly: true,
      expires: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res
      .status(200)
      .json({ message: "Register successful", token: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExist = await User.findOne({ username: username });
    if (!userExist || !(await bcrypt.compare(password, userExist.password))) {
      res.status(401).json({ message: "Authentication failed" });
    }
    const accessToken = generateAccessToken(userExist);
    const refreshToken = generateRefreshToken(userExist);

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: "none",
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({ message: "Login successful", token: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Successfully logged out 🍀" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.ACCESS_KEY,
    { expiresIn: "2h" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.REFRESH_KEY,
    { expiresIn: "30d" }
  );
};
