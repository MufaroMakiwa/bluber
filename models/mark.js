const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarkSchema = new Schema(
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
      "tags": {
        type: Array,
        required: true,
    },
      "caption": {
        type: String,
        required: true,
    },
      "start": {
        type: Object,
        required: true,
    },
      "end": {
        type: Object,
        required: true,
    },
      "path": {
        type: Array,
        required: true,
    },
  }
);

module.exports = mongoose.model("marks", MarkSchema);
