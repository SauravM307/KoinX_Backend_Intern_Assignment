const express = require("express");
const priceController = require("./../controllers/priceController.js");

const router = express.Router();
router.route("/").get(priceController.priceInTermsOf);

module.exports = router;
