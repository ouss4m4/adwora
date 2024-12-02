import { Router } from "express";

const router = Router();

// Home route
router.get("/", (req, res) => {
  res.render("dashboard", { title: "Dashboard | Adwora" });
});

// Client Route
router.get("/clients", (req, res) => {
  res.render("clients", { title: "Clients Page" });
});

// User Route
router.get("/users", (req, res) => {
  res.render("users", { title: "Users Page" });
});

export default router;
