// routes/adminRoutes.js
const router = require("express").Router();
const User = require("../models/User");
const { verifyAdmin } = require("../middleware/authMiddleware");
const adminRouter = router


// DELETE a user by ID
adminRouter.delete("/user/:id", verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = {
    adminRouter
};
