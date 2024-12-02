import { Router } from "express";

const router = Router();

// redirect
router.get("/", (req, res) => {
  res.redirect("/dashboard");
});

// Home route
router.get("/dashboard", (req, res) => {
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
