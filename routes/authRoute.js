const authRouter = require("express").Router();
const { signUp, login, refreshToken } = require("../controllers/authController");
const validateRequest = require("../utils/validation");
const verifyUser = require("../utils/verify");
const { signUpSchema, loginSchema } = require("../validators/userValidator");

//Signup route
authRouter.post("/signup", validateRequest(signUpSchema), signUp);

//Login route
authRouter.post("/login", validateRequest(loginSchema), login);

//Refresh token route
authRouter.post("/refresh", refreshToken)

module.exports = authRouter;
