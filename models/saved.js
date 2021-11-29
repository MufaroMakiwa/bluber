const { v4: uuidv4 } = require("uuid");

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 const SavedSchema = new Schema(
   {
       // reference to _id field in the User collection
    //    "savedId": {
    //      type: String,
    //      default: uuidv4(),
    //      required: false,
    //  },
       // reference to _id field in the User collection
       "userId": {
         type: String, 
         required: true,
     },
       // we set a default value here to be 0
       "dateAdded": {
         type: Date,
         required: false,
         default: new Date(),
     },
       // we set a default value here to be 0
       "dateModified": {
         type: Date,
         required: false,
         default: new Date(),
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
 module.exports = mongoose.model("saved", SavedSchema);
 