const router = require("express").Router();
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");
const reactionRoutes = require("./reactionRoutes");
const friendRoutes = require("./friendRoutes");

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);
router.use("/reactions", reactionRoutes);
router.use("/friends", friendRoutes);

module.exports = router;
