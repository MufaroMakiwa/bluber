// const { v4: uuidv4 } = require("uuid");
// let data = [];


// /**
//  * @typedef User
//  * @prop {string} userId - The id for the user (googleId)
//  * @prop {string} name - The name of the user
//  * @prop {string} email - The email of the user
//  * @prop {string} dateAdded - The date the user was created
//  */

// class User {
  
//   /**
//    * Add a new user
//    * 
//    * @param {string} name - The name of the user
//    * @param {string} email - The email of the user
//    * @returns {User} - The newly created user
//    */
//   static addOne(name, email) {
//     const userId = uuidv4(); // userId will be replace by the googleid hence will be passed in as an arg
//     const dateAdded = new Date();
//     const user = { userId, name, email, dateAdded };
//     data.push(user);
//     return user;
//   }

//   /**
//    * 
//    * @param {string} userId - The id of the a user
//    * @returns {User | undefined} - The user object if one exists
//    */
//   static findOne(userId) {
//     return data.filter(user => user.userId === userId)[0];
//   }

//   /**
//    * 
//    * @param {string} name - The name of the a user
//    * @returns {User | undefined} - The user object if one exists
//    */
//      static findOneByName(name) {
//       return data.filter(user => user.name === name)[0];
//     }

//   /**
//    * Delete a users account
//    * 
//    * @param {string} userId - The of user whose account is to be deleted
//    */
//   static deleteOne(userId) {
//     data = data.filter(user => user.userId !== userId);
//   }
// }

// module.exports = User;


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
        "date_added": {
            type: String,
            required: false,
            default: new Date(),
        },
        // reference to _id field in the User collection
        "user_id": {
            type: Schema.Types.ObjectId, 
            ref: "User",
            required: false,
        },
        
    }
);

// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("users", UserSchema);