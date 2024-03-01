const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
const generateTokens = require("../utils/tokens");

const signUp = async (req, res, next) => {
  try {
    //Check if user already exists
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      const err = createError({
        statusCode: 403,
        message: "User already exists",
      });
      throw err;
    }
    //Encrypt the password and create the user
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hash,
    });
    //Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);
    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json({
      accessToken,
        refreshToken,
        userId: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    //Check if user exists
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      const err = createError({
        statusCode: 404,
        message: "User does not exists",
      });
      throw err;
    }
    //Verify the password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw createError({ statusCode: 401, message: "Password is incorrect" });
    }
    //Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);
    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json({
      accessToken,
        refreshToken,
        userId: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

const refreshToken = (req, res, next) => {
  try {
    try {
      //Check if refresh token has expired
      jwt.verify(req.body.refreshToken, process.env.JWT_KEY);
    } catch (err) {
      throw createError({ statusCode: 401, message: err.message });
    }
    //Generate new access token
    const accessToken = jwt.sign(
      {
        userId: req.body.userId,
      },
      process.env.JWT_KEY,
      { expiresIn: "30m" }
    );
    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json({
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp,
  login,
  refreshToken,
};
