const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/auth.middleware");
const secret = require("../config/secretGenerator");

const router = require("express").Router();
// All routes starts with /auth
router.get("/", (req, res) => {
  res.json("All good in auth");
});

// POST Signup
router.post("/signup", async (req, res, next) => {
  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = await User.create({ ...req.body, passwordHash });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      console.log("duplicate");
    }
    next(error);
  }
});
// POST Login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const potentialUser = await User.findOne({ username });
    if (potentialUser) {
      // User does exists with this username
      if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
        // User has correct credentials
        const token = jwt.sign({ userId: potentialUser._id }, secret, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.json({ token });
      } else {
        res.status(403).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "No user with this username" });
    }
  } catch (error) {
    next(error);
  }
});
// GET Verify

router.get("/verify", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.tokenPayload.userId).select("role");
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json({ userId: req.tokenPayload.userId, role: user.role });
  } catch (error) {
    res.status(500).json("Failed to verify token");
  }
});

module.exports = router;
