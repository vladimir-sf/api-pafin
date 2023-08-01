import express from "express";
import AuthController from "../controllers/AuthController";

const router = express.Router();
const authController = new AuthController();

/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Log in to the application
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                description: The user's email
 *              password:
 *                type: string
 *                description: The user's password
 *    responses:
 *      '200':
 *        description: Login successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: A JWT token
 *      '400':
 *        description: Missing request body or invalid credentials
 *      '500':
 *        description: Internal server error
 */
router.post("/login", (req, res, next) => {
  authController.login(req, res).catch(next);
});

/**
 * @swagger
 * /auth/register:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Register a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *                type: string
 *                description: The user's name
 *              email:
 *                type: string
 *                description: The user's email
 *              password:
 *                type: string
 *                description: The user's password
 *    responses:
 *      '200':
 *        description: Registration successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: A JWT token
 *      '400':
 *        description: Missing request body, validation error or email already exists
 *      '500':
 *        description: Internal server error
 */
router.post("/register", (req, res, next) => {
  authController.register(req, res).catch(next);
});

export default router;
