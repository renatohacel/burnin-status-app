import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

export const authRouter = Router();

//login
authRouter.post('/login', AuthController.login);

//loogut
authRouter.post('/logout', AuthController.logout);