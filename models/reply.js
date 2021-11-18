const { v4: uuidv4 } = require("uuid");
let data = [];


/**
 * @typedef Reply
 * @prop {string} replyId - The id for the reply
 * @prop {string} userId - Id of the user making the reply
 * @prop {Date} dateAdded - The date the reply was added
 * @prop {Date} dateModified - The date the reply was modified
 * @prop {string} commentId - The id of the comment the reply is for
 * @prop {string} content - The content of the reply
 * @prop {string} targetUserId - The id of the user to reply to
 */


 class Reply {
  /**
   * Add a new reply
   * 
   * @param {string} userId - The id of user making the reply
   * @param {string} commentId - The id of the comment the reply is for
   * @param {string} content - The content of the reply
   * @param {string} targetUserId - The id of the user to reply to
   * @returns {Reply} - The newly created comment object
   */
  static addOne(userId, commentId, content, targetUserId) {
    const date = new Date();
    const replyId = uuidv4();
    const reply = { replyId, userId, dateAdded: date, dateModified: date, commentId, content, targetUserId};
    data.push(reply);
    return reply;
  }

  /**
   * Find a reply with given id
   * 
   * @param {string} replyId - The id for the reply
   * @returns {Reply | undefined} - The reply object with given id if exists
   */
  static findOne(replyId) {
    return data.filter(reply => reply.replyId === replyId)[0];
  }

  /**
   * Find all replies for a given comment
   * 
   * @param {string} commentId - The id of a comment
   * @returns {Reply[]} - an array of the replies for the given comment
   */
  static findAllByCommentId(commentId) {
    return data.filter(reply => reply.commentId === commentId);
  }

  /**
   * Find all replies made by a given user
   * 
   * @param {string} userId - The id of the user
   * @returns {Reply[]} - An array of replies made by the given user
   */
  static findAllByUserId(userId) {
    return data.filter(reply => reply.userId === userId);
  }

  /**
   * Find all replies to the given user
   * 
   * @param {string} targetUserId - The id of the target user
   * @returns {Reply[]} - An array of replies to the given user 
   */
  static findAllByTargetUserId(targetUserId) {
    return data.filter(reply => reply.targetUserId === targetUserId);
  }

  /**
   * Update a reply
   * 
   * @param {string} replyId - The id of a reply
   * @param {Object} content - The updated content for the reply
   * @returns {Reply} - The updated reply 
   */
  updateOne(replyId, content) {
    const reply = Reply.findOne(replyId);
    reply.content = content;
    reply.dateModified = new Date();
    return reply;

  }

  /**
   * Delete a reply 
   * 
   * @param {string} replyId - The id of the reply
   */
  deleteOne(replyId) {
    data = data.filter(reply => reply.replyId !== replyId);
  }
}

module.exports = Reply;