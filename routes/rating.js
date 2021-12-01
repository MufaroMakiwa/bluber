const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const ratingController = require("./rating-controller");


/**
 * Add a rating to a mark
 * 
 * @name POST /rating
 * 
 * @param {string} markId - the Id of the mark to rate
 * @param {number} rating - the rating added by the user
 * @param {string} targetUserId - the author of the mark being rated
 * @return {Rating} - the created rating object
 * @throws {403} - if user is not logged logged in, trying to rate their own mark or
 *                  trying to rate when they are already rating
 * @throws {400} - if markId or targetUserId do not exist or the comment content is invalid
 */
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
    const { markId, rating, targetUserId } = req.body;
    const ratingObj = await ratingController.addOne(req.session.userId, markId, rating, targetUserId);
    res.status(201).json(ratingObj).end();
  }
);

/**
 * Delete a rating
 * 
 * @name DELETE /rating/:markId?
 * 
 * @param {string} markid - the Id of mark to be remove a rating from
 * @throws {403} - if user is not logged logged in, trying to rate their own mark or
 *                  trying to rate when they are already rating
 * @throws {400} - if mark with given id does not exist
 */
router.delete(
  '/:markId?',
  [
    validator.isUserLoggedIn,
    validator.isMarkIdInParamsExists,
    validator.isMarkRatingAllowed,
    (req, res, next) => validator.checkMarkRatingStatus(req, res, next, true)
  ],
  async (req, res) => {
    await ratingController.deleteOne(req.session.userId, req.params.markId);
    res.status(200).json({
      message: "Rating deleted successfully"
    }).end();
  }
);


module.exports = router;