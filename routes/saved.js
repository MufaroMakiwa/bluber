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
    validator.isUserLoggedIn,
    validator.isSavedNameAlreadyExists,
  ],
  (req, res) => {

  }
);

router.patch(
  '/:savedId?',
  [
    validator.isUserLoggedIn,
    validator.isSavedIdInParamsExists,
    validator.isValidSavedModifier,
    validator.isSavedNameAlreadyExists
  ],
  (req, res) => {

  }
);

router.delete(
  '/:savedId?',
  [
    validator.isUserLoggedIn,
    validator.isSavedIdInParamsExists,
    validator.isValidSavedModifier
  ],
  (req, res) => {

  }
);



module.exports = router;