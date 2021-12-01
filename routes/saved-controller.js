const Saved = require("../models/saved");

async function findOne(savedId){
    try{
    const saved = await Saved.findOne({_id: savedId});
    return saved;
    } catch(err){
    return false;
    }
  }

  async function findOneByName(name){
    try{
    const saved = await Saved.findOne({name: name});
    return saved;
    } catch(err){
    return false;
    }
  }
  
async function addOne(userId, start, end, name){
    const date = new Date();
    
    const saved = new Saved({userId: userId, start: start, dateAdded: date, end: end, name: name});
    try {
        await saved.save();
        return saved;
    } catch(err) {
        return false;
    }
  }

async function findAllByUserId(userId){
    try{
      const saved = await Saved.find({userId: userId});
      return saved;
    } catch(err){
      return false;
    }
  }


async function deleteOne(savedId){
    try{
      const saved = await Saved.deleteOne({_id: savedId});
      return saved;
    } catch(err){
      return false;
    }
  }

module.exports = Object.freeze({
    findOne,
    addOne,
    findAllByUserId,
    deleteOne,
    findOneByName
  });