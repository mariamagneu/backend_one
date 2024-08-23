const { default: mongoose } = require("mongoose");
const Project = require("../models/Project.model");
const { isAuthenticated } = require("../middleware/auth.middleware");

const router = require("express").Router();
// All routes starts with /api/Projects
router.get("/", async (req, res, next) => {
  try {
    const projectsData = await Project.find().populate(
      "technology",
      "title version knowledge"
    );
    res.json(projectsData);
  } catch (error) {
    next(error);
  }
});

router.get("/:projectId", async (req, res, next) => {
  const { projectId } = req.params;
  if (!mongoose.isValidObjectId(projectId)) {
    return next(new Error("Invalid ID"));
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error("project not found!");
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

//create new project is in admin routes

router.put("/:projectId", isAuthenticated, async (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return next(new Error("Invalid ID"));
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      return next(new Error("Project not found"));
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

router.delete("/:projectId", isAuthenticated, async (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return next(new Error("Invalid ID"));
  }

  try {
    const projectToDelete = await Project.findById(projectId);
    if (!projectToDelete) {
      return next(new Error("Project not found"));
    }
    if (projectToDelete.createdBy === req.tokenPayload.userId) {
      await Project.findByIdAndDelete(projectId);
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
