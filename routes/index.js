/* eslint-disable linebreak-style */
"use strict";

const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  subscriberRoutes = require("./subscriberRoutes"),
  courseRoutes = require("./courseRoutes"),
  culinary_vacationsRoutes = require("./culinary_vacationsRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes"),
  apiRoutes = require("./apiRoutes");

router.use("/api", apiRoutes);
router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/culinary_vacations", culinary_vacationsRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
