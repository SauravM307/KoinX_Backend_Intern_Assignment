const express = require("express");
const companiesController = require("./../controllers/companiesController.js");

const router = express.Router();

router.route("/").get(companiesController.getAllCompanies);

module.exports = router;
