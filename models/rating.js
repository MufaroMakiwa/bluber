const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
      // reference to _id field in the User collection
      "userId": {
        type: String, 
        required: true,
    },
      // we set a default value here to be 0
      "dateAdded": {
        type: Date,
        required: true,
    },
      "markId": {
        type: String,
        required: true,
    },
      "rating": {
        type: Number,
        required: true,
    },
      "targetUserId": {
        type: String,
        required: true,
    },
  }
);

module.exports = mongoose.model("rating", RatingSchema);
