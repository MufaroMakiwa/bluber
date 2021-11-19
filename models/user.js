const { v4: uuidv4 } = require("uuid");
let data = [];


/**
 * @typedef User
 * @prop {string} userId - The id for the user (googleId)
 * @prop {string} name - The name of the user
 * @prop {string} email - The email of the user
 * @prop {string} dateAdded - The date the user was created
 */

class User {
  
  /**
   * Add a new user
   * 
   * @param {string} name - The name of the user
   * @param {string} email - The email of the user
   * @returns {User} - The newly created user
   */
  static addOne(name, email) {
    const userId = uuidv4(); // userId will be replace by the googleid hence will be passed in as an arg
    const dateAdded = new Date();
    const user = { userId, name, email, dateAdded };
    data.push(user);
    return user;
  }

  /**
   * 
   * @param {string} userId - The id of the a user
   * @returns {User | undefined} - The user object if one exists
   */
  static findOne(userId) {
    return data.filter(user => user.userId === userId)[0];
  }

  /**
   * Delete a users account
   * 
   * @param {string} userId - The of user whose account is to be deleted
   */
  static deleteOne(userId) {
    data = data.filter(user => user.userId !== userId);
  }
}

module.exports = User;