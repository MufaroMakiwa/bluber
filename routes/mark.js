const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const userModel = require("../models/user");
const commentModel = require("../models/comment");
const markModel = require("../models/mark");
const ratingModel = require("../models/rating");
const savedModel = require("../models/saved");
const replyModel = require("../models/reply");


router.post(
  '/',
  [
    validator.isUserLoggedIn
  ],
  (req, res) => {

  }
);

router.patch(
  '/:markId?',
  [
    validator.isUserLoggedIn,
    validator.isMarkIdInParamsExists,
    validator.isValidMarkModifier
  ],
  (req, res) => {
    
  }
);

router.delete(
  '/:markId?',
  [
    validator.isUserLoggedIn,
    validator.isMarkIdInParamsExists,
    validator.isValidMarkModifier
  ],
  (req, res) => {

  }
);


module.exports = router;