import express from "express";

// import { registration } from "../controllers/Registration.js";
// import registrationSchema from "../validators/auth-validator.js";
// import validate from "../middlewares/error_middleware.js";
import { signin } from "../controllers/signin.js";

const userRouter = express.Router();

userRouter.get("/login", signin);
// userRouter.post("/register", validate(registrationSchema), registration);

export default userRouter;
