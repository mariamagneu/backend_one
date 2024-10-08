const router = require("express").Router();
const projectRoutes = require("./project.routes");
const userRoutes = require("./user.routes");
const adminRoutes = require("./admin.routes");
const technologyRoutes = require("./technology.routes");
// All routes starts with /api
router.get("/", (req, res) => {
  res.json("All good in here");
});

router.use("/projects", projectRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/technologies", technologyRoutes);

module.exports = router;
