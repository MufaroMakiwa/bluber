const express = require("express");
const router = express.Router();
// const validator = require("./middleware");
const ratingController = require("./rating-controller");
// const { constructMarkResponse } = require("./utils");


router.post(
  '/',
  [
    // validator.isUserLoggedIn,
    // validator.isMarkIdInBodyExists,
    // validator.isMarkRatingAllowed,
    // validator.isTargetUserIdExists,
    // (req, res, next) => validator.checkMarkRatingStatus(req, res, next, false)
  ],
  async (req, res) => {
    const { markId, rating, targetUserId } = req.body;
    const ratingObj = await ratingController.addOne(req.session.userId, markId, rating, targetUserId);
    res.status(201).json(ratingObj).end();
  }
);

router.delete(
  '/:markId?',
  [
    // validator.isUserLoggedIn,
    // validator.isMarkIdInParamsExists,
    // validator.isMarkRatingAllowed,
    // (req, res, next) => validator.checkMarkRatingStatus(req, res, next, true)
  ],
  async (req, res) => {
    await ratingController.deleteOne(req.session.userId, req.params.markId);
    res.status(200).json({
      message: "Rating deleted successfully"
    }).end();
  }
);


module.exports = router;