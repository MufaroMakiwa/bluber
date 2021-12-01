const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const replyController = require("./reply-controller");
const { constructReplyResponse }  = require("./utils");


/**
 * Create a post
 * 
 * @name POST /reply
 * 
 * @param {string} commentId - the Id of the comment to reply to
 * @param {string} content - content of the reply
 * @param {string} targetUserId - id of author of the reply
 * @return {Reply} - the created mark
 * @throws {403} - if user is not logged logged in
 * @throws {400} - if markId or targetUserId do not exist
 */
router.post(
  '/',
  [
    validator.isUserLoggedIn,
    validator.isValidResponseContent,
    validator.isCommentIdInBodyExists,
    validator.isTargetUserIdExists
  ],
  async (req, res) => {
    const { commentId, content, targetUserId } = req.body;
    const reply = await replyController.addOne(req.session.userId, commentId, content, targetUserId);
    res.status(201).json({
      reply: await constructReplyResponse(reply)
    }).end();
  }
);

/**
 * Delete a reply
 * 
 * @name DELETE /reply/:replyId?
 * 
 * @param {string} replyId - the Id of reply to be deleted
 * @throws {403} - if user is not logged logged in or not the owner of the reply
 * @throws {400} - if reply with given id does not exist
 */
router.delete(
  '/:replyId?',
  [
    validator.isUserLoggedIn,
    validator.isReplyIdInParamsExists,
    validator.isValidReplyModifier
  ],
  async (req, res) => {
    await replyController.deleteOne(req.params.replyId);
    res.status(200).json({
      message: "Reply deleted sucessfully"
    }).end();
  }
);


module.exports = router;