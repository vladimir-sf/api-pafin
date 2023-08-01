import express from "express";
import UsersController from "../controllers/UsersController";

const router = express.Router();
const usersController = new UsersController();

/**
 * @swagger
 * /users:
 *  get:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *      - Users
 *    summary: Get a list of all users
 *    responses:
 *      '200':
 *        description: A list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      '404':
 *        description: No users found
 */
router.get("/", (req, res, next) => {
  usersController.list(req, res).catch(next);
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *      - Users
 *    summary: Get a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: UUID of the user
 *    responses:
 *      '200':
 *        description: A user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: Invalid UUID provided
 *      '404':
 *        description: User not found
 *      '500':
 *        description: Internal server error
 */
router.get("/:id", (req, res, next) => {
  usersController.get(req, res).catch(next);
});

/**
 * @swagger
 * /users:
 *  post:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *      - Users
 *    summary: Create a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: User created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: Missing request body or validation error
 *      '500':
 *        description: Internal server error
 */

router.post("/", (req, res, next) => {
  usersController.create(req, res).catch(next);
});

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *      - Users
 *    summary: Update a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: UUID of the user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *    responses:
 *      '200':
 *        description: User updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: Missing request body, invalid UUID provided or validation error
 *      '404':
 *        description: User not found
 *      '500':
 *        description: Internal server error
 */

router.put("/:id", (req, res, next) => {
  usersController.update(req, res).catch(next);
});

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *      - Users
 *    summary: Delete a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: UUID of the user
 *    responses:
 *      '200':
 *        description: User deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message
 *      '400':
 *        description: Invalid UUID provided
 *      '500':
 *        description: Internal server error
 */
router.delete("/:id", (req, res, next) => {
  usersController.delete(req, res).catch(next);
});

export default router;
