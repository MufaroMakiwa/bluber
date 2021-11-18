const { v4: uuidv4 } = require("uuid");
let data = [];


/**
 * @typedef Comment
 * @prop {string} commentId - The id for the comment
 * @prop {string} userId - Id of the user making the comment
 * @prop {Date} dateAdded - The date the comment was added
 * @prop {Date} dateModified - The date the comment was modified
 * @prop {string} markId - The id of the mark the comment is for
 * @prop {string} content - The content of the comment
 * @prop {string} markerId - The id of the user who made the mark
 */


class Comment {
  /**
   * Add a new comment
   * 
   * @param {string} userId - The id of user making the comment
   * @param {string} markId - The id of the mark the comment is for
   * @param {string} content - The content of the comment
   * @param {string} markerId - The id of the user who made the mark
   * @returns {Comment} - The newly created comment object
   */
  static addOne(userId, markId, content, markerId) {
    const date = new Date();
    const commentId = uuidv4();
    const comment = { commentId, userId, dateAdded: date, dateModified: date, markId, content, markerId };
    data.push(comment);
    return comment;
  }

  /**
   * Find a comment with given id
   * 
   * @param {string} commentId - The id for the comment
   * @returns {Comment | undefined} - The comment object with given id if exists
   */
  static findOne(commentId) {
    return data.filter(comment => comment.commentId === commentId)[0];
  }

  /**
   * Find all comments for a given mark
   * 
   * @param {string} markId - The id mark
   * @returns {Comment[]} - an array of the comments for the given mark
   */
  static findAllByMarkId(markId) {
    return data.filter(comment => comment.markId === markId);
  }

  /**
   * Find all comments made by a given user
   * 
   * @param {string} userId - The id of the user
   * @returns {Comment[]} - An array of comments made by the given user
   */
  static findAllByUserId(userId) {
    return data.filter(comment => comment.userId === userId);
  }

  /**
   * Find all comments for the given marker
   * 
   * @param {string} markerId - The id of the user who places some marks
   * @returns {Comment[]} - An array of comments for the given user 
   */
  static findAllByMarkerId(markerId) {
    return data.filter(comment => comment.markerId === markerId);
  }

  /**
   * Update a comment
   * 
   * @param {string} commentId - The id of a comment
   * @param {Object} content - The updated content for the comment
   * @returns {Comment} - The updated comment 
   */
  updateOne(commentId, content) {
    const comment = Comment.findOne(commentId);
    comment.content = content;
    return comment;

  }

  /**
   * Delete a comment 
   * 
   * @param {string} commentId - The id of the comment
   */
  deleteOne(commentId) {
    data = data.filter(comment => comment.commentId !== commentId);
  }
}

module.exports = Comment;