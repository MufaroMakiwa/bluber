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
        // user image url
        "imageUrl": {
            type: String,
            required: false
        },
        // the user password.
        "password": {
          type: String,
          required: false,
        }
    }
);

module.exports = mongoose.model("users", UserSchema);