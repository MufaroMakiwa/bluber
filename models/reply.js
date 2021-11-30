const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema(
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
      "commentId": {
        type: String,
        required: true,
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

module.exports = mongoose.model("reply", ReplySchema);
