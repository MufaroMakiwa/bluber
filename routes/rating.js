const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const ratingController = require("./rating-controller");


const userId1 = "gangoffour1";
const userId2 = "gangoffour2";


router.post(
  '/',
  [
    validator.isUserLoggedIn,
    validator.isMarkIdInBodyExists,
    validator.isMarkRatingAllowed,
    validator.isTargetUserIdExists,
    (req, res, next) => validator.checkMarkRatingStatus(req, res, next, false)
  ],
  async (req, res) => {
    const { markId, rating } = req.body;
    const ratingObj = await ratingController.addOne(userId1, markId, rating, userId2);
    res.status(201).json(ratingObj).end();
  }
);

router.patch(
  '/:markId?',
  [
    validator.isUserLoggedIn,
    validator.isMarkIdInParamsExists,
    validator.isMarkRatingAllowed,
    (req, res, next) => validator.checkMarkRatingStatus(req, res, next, true)
  ],
  async (req, res) => {
    const ratingObj = await ratingController.updateOne(userId1, req.params.markId, req.body.rating);
    res.status(200).json(ratingObj).end();

  }
);

router.delete(
  '/:markId?',
  [
    validator.isUserLoggedIn,
    validator.isMarkIdInParamsExists,
    validator.isMarkRatingAllowed,
    (req, res, next) => validator.checkMarkRatingStatus(req, res, next, true)
  ],
  async (req, res) => {
    await ratingController.deleteOne(userId1, req.params.markId);
    res.status(200).json({
      message: "Rating deleted successfully"
    }).end();
  }
);

module.exports = router;