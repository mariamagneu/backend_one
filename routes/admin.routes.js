const express = require("express");
const router = express.Router();
const Project = require("../models/Project.model.js");
const Technology = require("../models/Technology.model.js");
const {
  isAuthenticated,
  isAdmin,
} = require("../middleware/auth.middleware.js");

// Example backend validation in project creation route
router.post("/projects", async (req, res, next) => {
  const {
    title,
    description,
    website,
    repos,
    technology,
    status,
    author,
    collaborators,
  } = req.body;
  try {
    // Check if the provided technology ID is valid
    const techExists = await Technology.findById(technology);
    if (!techExists) {
      return res.status(400).json({ message: "Invalid technology ID" });
    }

    const newProject = await Project.create({
      title,
      description,
      website,
      repos,
      technology,
      status,
      author,
      collaborators,
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

module.exports = router;
