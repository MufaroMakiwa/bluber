const { v4: uuidv4 } = require("uuid");
// let data = [];


// /**
//  * @typedef Rating
//  * @prop {string} ratingId - The id for the rating
//  * @prop {string} userId - Id of the user making the rating
//  * @prop {Date} dateAdded - The date the mark was added
//  * @prop {Date} dateModified - The date the rating was modified
//  * @prop {string} markId - The id of the mark the rating is for
//  * @prop {Integer} rating - The rating for the mark on a scale of 1 - 5
//  * @prop {string} targetUserId - The id of the user who made the marking
//  */

// class Rating {
//   /**
//    * Add a rating for a mark
//    * 
//    * @param {string} userId - The id of the user making the rating
//    * @param {string} markId - The id of the mark being rated
//    * @param {string} rating - The rating given
//    * @param {string} targetUserId - The id of the target user
//    * @returns {Rating} - The newly created rating object
//    */
//   static addOne(userId, markId, rating, targetUserId) {
//     const ratingId = uuidv4();
//     const date = new Date();
//     const ratingObj = { ratingId, userId, dateAdded: date, dateModified: date, markId, rating, targetUserId };
//     data.push(ratingObj);
//     return ratingObj;
//   }

//   /**
//    * Find a rating by rating id
//    * 
//    * @param {string} userId - The id of the user making the marking
//    * @param {string} markId - The id of the mark rated
//    * @returns {Rating | undefined} - The rating object if it exists
//    */
//   static findOne(userId, markId) {
//     return data.filter(rating => rating.markId === markId && rating.userId === userId)[0];
//   }

//   /**
//    * Find ratings made by given user
//    * 
//    * @param {string} userId - Id of the given user
//    * @returns {Rating[]} - An arraty of ratings
//    */
//   static findAllByUserId(userId) {
//     return data.filter(rating => rating.userId === userId);
//   }

//   /**
//    * Find ratings for a mark
//    * 
//    * @param {string} markId - The id of the given mark
//    * @returns {Rating[]} - An array of ratings for a mark
//    */
//   static findAllByMarkId(markId) {
//     return data.filter(rating => rating.markId === markId);
//   }
  
//   /**
//    * Find all ratings for markins made by some user
//    * 
//    * @param {string} targetUserId - Id of target user
//    * @returns {Rating[]} - An array of ratings for marks made by given user
//    */
//   static findAllByTargetUserId(targetUserId) {
//     return data.filter(rating => rating.targetUserId === targetUserId);
//   }

//   /**
//    * Update a rating object 
//    * 
//    * @param {string} ratingId - The id of a rating object
//    * @param {string} rating - The updated rating
//    * @returns {Rating} - The updated rating
//    */
//   static updateOne(userId, markId, rating) {
//     const ratingObj = Rating.findOne(markId, userId);
//     ratingObj.rating = rating;
//     ratingObj.dateModified = new Date();
//     return ratingObj;
//   }

//   /**
//    * Delete the given rating
//    * 
//    * @param {string} userId - The id of the user who made the marking
//    * @param {string} markId - The id of the mark rated
//    */
//   static deleteOne(userId, markId) {
//     data = data.filter(rating => rating.markId !== markId && rating.userId !== userId);
//   }
// }

// module.exports = Rating;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
      // reference to _id field in the User collection
      "rating_id": {
        type: String, 
        default: uuidv4(),
        required: false,
    },
      // reference to _id field in the User collection
      "user_id": {
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
      "mark_id": {
        type: String,
        required: true,
    },
      "rating": {
        type: Number,
        required: true,
    },
      "target_user_id": {
        type: String,
        required: true,
    },
  }
);

// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("rating", RatingSchema);
