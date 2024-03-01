const jwt = require("jsonwebtoken");
const createError = require("./error");
const { User } = require("../models");
async function verifyUser(req, res, next) {
  try {
    const bearerToken = req.headers["authorization"];
    if (!bearerToken) {
      throw createError({
        statusCode: 401,
        message: "Access token is missing",
      });
    }
    const token = bearerToken.split(" ")[1];
    let payload = null;
    try{
     payload = jwt.verify(token, process.env.JWT_KEY);
    }catch (err){
      throw createError({statusCode: 401, message: err.message})
    }
    const user = await User.findOne({ where: { id: payload.userId } });
    if (!user) {
      throw createError({ statusCode: 404, message: "User not found" });
    }
    req.userId = payload.userId;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = verifyUser;
