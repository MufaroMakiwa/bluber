const { v4: uuidv4 } = require("uuid");
// let data = [];


// /**
//  * @typedef Comment
//  * @prop {string} commentId - The id for the comment
//  * @prop {string} userId - Id of the user making the comment
//  * @prop {Date} dateAdded - The date the comment was added
//  * @prop {Date} dateModified - The date the comment was modified
//  * @prop {string} markId - The id of the mark the comment is for
//  * @prop {string} content - The content of the comment
//  * @prop {string} targetUserId - The id of the user who made the mark
//  */


// class Comment {
//   /**
//    * Add a new comment
//    * 
//    * @param {string} userId - The id of user making the comment
//    * @param {string} markId - The id of the mark the comment is for
//    * @param {string} content - The content of the comment
//    * @param {string} targetUserId - The id of the user who made the mark
//    * @returns {Comment} - The newly created comment object
//    */
//   static addOne(userId, markId, content, targetUserId) {
//     const date = new Date();
//     const commentId = uuidv4();
//     const comment = { commentId, userId, dateAdded: date, dateModified: date, markId, content, targetUserId };
//     data.push(comment);
//     return comment;
//   }

//   /**
//    * Find a comment with given id
//    * 
//    * @param {string} commentId - The id for the comment
//    * @returns {Comment | undefined} - The comment object with given id if exists
//    */
//   static findOne(commentId) {
//     return data.filter(comment => comment.commentId === commentId)[0];
//   }

//   /**
//    * Find all comments for a given mark
//    * 
//    * @param {string} markId - The id mark
//    * @returns {Comment[]} - an array of the comments for the given mark
//    */
//   static findAllByMarkId(markId) {
//     return data.filter(comment => comment.markId === markId);
//   }

//   /**
//    * Find all comments made by a given user
//    * 
//    * @param {string} userId - The id of the user
//    * @returns {Comment[]} - An array of comments made by the given user
//    */
//   static findAllByUserId(userId) {
//     return data.filter(comment => comment.userId === userId);
//   }

//   /**
//    * Find all comments for the given marker
//    * 
//    * @param {string} targetUserId - The id of the user who places some marks
//    * @returns {Comment[]} - An array of comments for the given user 
//    */
//   static findAllByTargetUserId(targetUserId) {
//     return data.filter(comment => comment.targetUserId === targetUserId);
//   }

//   /**
//    * Update a comment
//    * 
//    * @param {string} commentId - The id of a comment
//    * @param {Object} content - The updated content for the comment
//    * @returns {Comment} - The updated comment 
//    */
//   updateOne(commentId, content) {
//     const comment = Comment.findOne(commentId);
//     comment.content = content;
//     comment.dateModified = new Date();
//     return comment;

//   }

//   /**
//    * Delete a comment 
//    * 
//    * @param {string} commentId - The id of the comment
//    */
//   deleteOne(commentId) {
//     data = data.filter(comment => comment.commentId !== commentId);
//   }
// }

// module.exports = Comment;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
      // reference to _id field in the Comment collection
      "comment_id": {
        type: String, 
        default: uuidv4(),
        required: false,
    },
      // reference to _id field in the User collection
      "user_id": {
        type: String, 
        required: true,
    },
      // reference to _id field in the Mark collection
      "mark_id": {
        type: String, 
        required: true,
    },
      // we set a default value here to be 0
      "date_added": {
        type: Date,
        required: false,
        default: new Date(),
    },
      // we set a default value here to be 0
      "date_modified": {
        type: Date,
        required: false,
        default: new Date(),
    },
      "content": {
        type: String,
        required: true,
    },
      "target_user_id": {
        type: String,
        required: true,
    },
  }
);

// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("comments", CommentSchema);
