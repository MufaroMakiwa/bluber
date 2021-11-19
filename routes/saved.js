const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const savedModel = require("../models/saved");


const userId = "gangoffour";

router.post(
  '/',
  [
    validator.isUserLoggedIn,
    validator.isSavedNameAlreadyExists,
  ],
  (req, res) => {
    const { start, end, name } = req.body;
    const saved = savedModel.addOne(userId, start, end, name);
    res.status(201).json(saved).end();
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
    const saved = savedModel.updateOne(req.params.savedId, req.body);
    res.status(200).json(saved).end();
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
    savedModel.deleteOne(req.params.savedId);
    res.status(200).json({
      message: "Saved place deleted successfully"
    }).end();
  }
);



module.exports = router;