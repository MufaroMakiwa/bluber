const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
      // reference to _id field in the User collection
      "userId": {
        type: String, 
        required: true,
    },
      // reference to _id field in the Mark collection
      "markId": {
        type: String, 
        required: true,
    },
      "dateAdded": {
        type: Date,
        required: false,
        default: new Date(),
    },
      "content": {
        type: String,
        required: true,
    },
      "targetUserId": {
        type: String,
        required: true,
    },
  }
);

module.exports = mongoose.model("comments", CommentSchema);
