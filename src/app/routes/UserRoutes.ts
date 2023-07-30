import express from "express";
import UsersController from "../controllers/UsersController";

const router = express.Router();
const usersController = new UsersController();

router.get("/", (req, res, next) => {
  usersController.list(req, res).catch(next);
});
router.get("/:id", (req, res, next) => {
  usersController.get(req, res).catch(next);
});
router.post("/", (req, res, next) => {
  usersController.create(req, res).catch(next);
});
router.put("/:id", (req, res, next) => {
  usersController.update(req, res).catch(next);
});
router.delete("/:id", (req, res, next) => {
  usersController.delete(req, res).catch(next);
});

export default router;
