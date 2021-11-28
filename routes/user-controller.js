const User = require("../models/user");

async function findOne(userId){
    try{
      const user = await User.find({user_id: userId});
      return user;
    } catch(err){
      return false;
    }
  }
  
async function addOne(name, email){
    const user = new User({name: name, email: email});
    try {
        await user.save();
        return user;
    } catch(err) {
        return false;
    }
  }

async function findOneByName(name){
    try{
      const user = await User.find({name: name});
      return user;
    } catch(err){
      return false;
    }
  }

async function deleteOne(userId){
    try{
      const user = await User.remove({user_id: userId});
      return user;
    } catch(err){
      return false;
    }
  }

module.exports = Object.freeze({
    findOne,
    addOne,
    findOneByName,
    deleteOne
  });