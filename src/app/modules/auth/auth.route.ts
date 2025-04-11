import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/register", authController.createUser);

router.post("/login", authController.loginUser);

router.patch("/:userId", authController.blockUser);

export const userRoutes = router;
