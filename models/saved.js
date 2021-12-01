const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const SavedSchema = new Schema(
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
      "start": {
        type: Object,
        required: true,
    },
      "end": {
        type: Object,
        required: true,
    },
      "name": {
        type: String,
        required: true,
    },
   }
 );
 
 // mongoose will automatically create the collection for our DB
 module.exports = mongoose.model("saved_plan", SavedSchema);
 