const express = require("express");
const router = express.Router();
const Technology = require("../models/Technology.model.js");
const { isAuthenticated } = require("../middleware/auth.middleware.js");

// Create a new technology is in admin routes

// Get all Technologies
router.get("/", async (req, res) => {
  try {
    const technologys = await Technology.find();
    res.json(technologys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Get technology by ID

router.get("/:id", async (req, res) => {
  try {
    const technology = await Technology.findById(req.params.id);
    res.json(technology);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Edit technology by ID (authenticated route)
/* router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    // Ensure that only admin can edit the technology
    if (id !== req.tokenPayload.technologyId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedProfile = { ...req.body };
    delete updatedProfile.passwordHash;

    const updatedTechnology = await Technology.findByIdAndUpdate(
      id,
      updatedProfile,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTechnology) {
      return res.status(404).json({ message: "No Technology with this ID" });
    }

    res.json(updatedTechnology);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}); */

// Delete technology by ID (authenticated route)
/* router.delete("/:id", isAuthenticated, async (req, res) => {
 */ /*   try {
    const { id } = req.params;
    // Ensure that the technology can only be deleted by the admin
    if (id !== req.tokenPayload.technologyId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deletedTechnology = await Technology.findByIdAndDelete(id);

    if (!deletedTechnology) {
      return res.status(404).json({ message: "No Technology with this ID" });
    }

    res.json({ message: "Technology deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}); */

module.exports = router;
