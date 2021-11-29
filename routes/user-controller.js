const User = require("../models/user");

async function findOne(userId){
    try{
      const user = await User.find({userId: userId});
      return user;
    } catch(err){
      return false;
    }
  }
  
async function addOne(name, email, imageUrl){
  const user = new User({ name, email, imageUrl });
  try {
      await user.save();
      return user;
  } catch(err) {
      return false;
  }
}

async function findOneByEmail(email) {
  try{
    const user = await User.findOne({email: email});
    return user;
  } catch(err){
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
    const user = await User.remove({userId: userId});
    return user;
  } catch(err){
    return false;
  }
}

module.exports = Object.freeze({
  findOne,
  addOne,
  findOneByName,
  findOneByEmail,
  deleteOne
});