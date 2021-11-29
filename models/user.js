const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        // note that we don't have a short_id field, by default mongoDB creates this field, which is our Primary Key
        "email": {
            type: String,
            required: true,
        },
        "name": {
            type: String,
            required: true,
        },
        // we set a default value here to be 0
        "dateAdded": {
            type: String,
            required: false,
            default: new Date(),
        },
        // reference to _id field in the User collection
        "userId": {
            // type: Schema.Types.ObjectId, 
            // ref: "User",
            // required: false,
            type: String,
            required: false
        },
    }
);

// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("users", UserSchema);