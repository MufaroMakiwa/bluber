const User = require("../models/user");

async function findOne(userId){
    try{
      const user = await User.findOne({_id: userId});
      return user;
    } catch(err){
      return false;
    }
  }
  
async function addOne(name, email, imageUrl){
  const date = new Date();

  const user = new User({ name: name, email: email, imageUrl: imageUrl, dateAdded: date, viewedDemo: false });
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

async function updateOne(userId){
  try{
    const user = await User.find({_id: userId});
    user[0].viewedDemo = true;
    await user[0].save();
    return user[0];
  } catch(err){
    return false;
  }
}

async function deleteOne(userId){
  try{
    const user = await User.remove({_id: userId});
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
  deleteOne,
  updateOne
});