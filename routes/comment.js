const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const commentController = require("./comment-controller");
const { deleteComment, constructCommentResponse }  = require("./utils");


/**
 * Create a comment
 * 
 * @name POST /comment
 * 
 * @param {string} markId - the Id of the mark
 * @param {string} content - content of the comment
 * @param {string} targetUserId - id of author of the mark
 * @return {Comment} - the created comment
 * @throws {403} - if user is not logged logged in
 * @throws {400} - if markId or targetUserId do not exist or the comment content is invalid
 */
router.post(
  '/',
  [
    validator.isUserLoggedIn,
    validator.isValidResponseContent,
    validator.isMarkIdInBodyExists,
    validator.isTargetUserIdExists
  ],
  async (req, res) => {
    const { markId, content, targetUserId } = req.body;
    const comment = await commentController.addOne(req.session.userId, markId, content, targetUserId);
    res.status(201).json({
      comment: await constructCommentResponse(comment)
    }).end();
  }
);

/**
 * Delete a comment
 * 
 * @name DELETE /comment/:commentId?
 * 
 * @param {string} commentId - the Id of comment to be deleted
 * @throws {403} - if user is not logged logged in or not the owner of the comment
 * @throws {400} - if commentId with given id does not exist
 */
router.delete(
  '/:commentId?',
  [
    validator.isUserLoggedIn,
    validator.isCommentIdInParamsExists,
    validator.isValidCommentModifier
  ],
  async (req, res) => {
    await deleteComment(req.params.commentId);
    res.status(200).json({
      message: "Comment deleted sucessfully"
    }).end();
  }
);


module.exports = router;