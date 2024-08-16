const router = require("express").Router();
// All routes starts with /api
router.get("/", (req, res) => {
  res.json("All good in here");
});

const recipesRoutes = require("./project.routes");
router.use("/recipes", recipesRoutes);

module.exports = router;
