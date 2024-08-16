const router = require("express").Router();
const projectRoutes = require("./project.routes");
const userRoutes = require("./user.routes");

// All routes starts with /api
router.get("/", (req, res) => {
  res.json("All good in here");
});

router.use("/projects", projectRoutes);
router.use("/users", userRoutes);

module.exports = router;
