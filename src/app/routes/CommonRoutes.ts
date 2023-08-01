import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
  res.send("OK");
});

router.get("/", (req, res) => {
  res.send("Hello World!");
});
export default router;
