import { Router } from "express";

const router = Router();

// Home route
router.get("/", (req, res) => {
  res.render("dashboard", { title: "Home Page" });
});

export default router;
