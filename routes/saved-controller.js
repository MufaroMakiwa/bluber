const Saved = require("../models/saved");
const { v4: uuidv4 } = require("uuid");

async function findOne(savedId){
    try{
    const saved = await Saved.find({saved_id: savedId});
    return saved;
    } catch(err){
    return false;
    }
  }

  async function findOneByName(name){
    try{
    const saved = await Saved.find({name: name});
    return saved;
    } catch(err){
    return false;
    }
  }
  
async function addOne(userId, start, end, name){
    const date = new Date();
    const savedId = uuidv4();
    
    const saved = new Saved({saved_id: savedId, user_id: userId, start: start, date_added: date, date_modified: date, end: end, name: name});
    try {
        await saved.save();
        return saved;
    } catch(err) {
        return false;
    }
  }

async function findAllByUserId(userId){
    try{
      const saved = await Saved.find({user_id: userId});
      return saved;
    } catch(err){
      return false;
    }
  }

async function updateOne(savedId, body){
    try{
        const saved = await Saved.find({saved_id: savedId});
        body.name && (saved.name = body.name);
        body.start && (saved.start = body.start);
        body.end && (saved.end = body.end);
        saved.dateModified = new Date();
        return saved;
    } catch(err){
        return false;
    }
}

async function deleteOne(savedId){
    try{
      const saved = await Saved.remove({saved_id: savedId});
      return saved;
    } catch(err){
      return false;
    }
  }

module.exports = Object.freeze({
    findOne,
    addOne,
    findAllByUserId,
    updateOne,
    deleteOne,
    findOneByName
  });