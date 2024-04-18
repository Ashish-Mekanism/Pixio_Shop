import express from "express";
import { registration } from "../controllers/User_Controllers/registration.js";
import registrationSchema from "../validators/auth-validator.js";
import validate from "../middlewares/error_middleware.js";
import { signin } from "../controllers/User_Controllers/signin.js";

const userRouter = express.Router();

userRouter.post("/login", signin);
userRouter.post("/register", validate(registrationSchema), registration);

export default userRouter;
