const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const markModel = require("../models/mark");


const userId = "gangoffour";

router.post(
  '/',
  [
    validator.isUserLoggedIn
  ],
  (req, res) => {
    const { tags, caption, start, end } = req.body;
    const mark = markModel.addOne(userId, tags, caption, start, end);
    res.status(201).json(mark).end();
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
    const mark = markModel.updateOne(req.params.markId, req.body);
    res.status(200).json(mark).end();
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
    markModel.deleteOne(req.params.markId);
    res.status(200).json({
      message: "Mark deleted successfully"
    }).end();
  }
);


module.exports = router;