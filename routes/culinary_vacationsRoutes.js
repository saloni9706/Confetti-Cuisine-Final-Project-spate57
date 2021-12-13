/* eslint-disable linebreak-style */

"use strict";

const router = require("express").Router(),
  connectEnsureLogin = require("connect-ensure-login"), //authorization
  culinaryVacationsController = require("../controllers/culinaryVacationsController");

router.get("", culinaryVacationsController.index, culinaryVacationsController.indexView);
router.get("/new",connectEnsureLogin.ensureLoggedIn(),culinaryVacationsController.new);
router.post("/create",connectEnsureLogin.ensureLoggedIn(), culinaryVacationsController.create, culinaryVacationsController.redirectView);
router.get("/:id/edit",connectEnsureLogin.ensureLoggedIn(), culinaryVacationsController.edit);
router.put("/:id/update",connectEnsureLogin.ensureLoggedIn(), culinaryVacationsController.update, culinaryVacationsController.redirectView);
router.get("/:id", culinaryVacationsController.show, culinaryVacationsController.showView);
router.delete("/:id/delete",connectEnsureLogin.ensureLoggedIn(), culinaryVacationsController.delete, culinaryVacationsController.redirectView);

module.exports = router;
