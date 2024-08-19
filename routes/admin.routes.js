const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  isAdmin,
} = require("../middleware/auth.middleware.js");

// Only admins can create projects
router.post("/projects", isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      createdBy: req.tokenPayload.userId,
    });
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

// Only admins can create new technologies
router.post(
  "/technologies",
  isAuthenticated,
  isAdmin,
  async (req, res, next) => {
    try {
      const newTechnology = await Technology.create(req.body);
      res.status(201).json(newTechnology);
    } catch (error) {
      next(error);
    }
  }
);
