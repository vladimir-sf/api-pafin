import express from "express";
import AuthController from "../controllers/AuthController";

const router = express.Router();
const authController = new AuthController();

router.post("/login", (req, res, next) => {
  authController.login(req, res).catch(next);
});

router.post("/register", (req, res, next) => {
  authController.register(req, res).catch(next);
});

export default router;
