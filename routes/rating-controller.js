const Rating = require("../models/rating");
const { v4: uuidv4 } = require("uuid");

async function findOne(userId, markId){
    try{
    const rating = await Rating.find({rating_id: markId, user_id: userId});
    return rating;
    } catch(err){
    return false;
    }
  }
  
async function addOne(userId, markId, ratingContent, targetUserId){
    const date = new Date();
    const ratingId = uuidv4();
    
    const rating = new Rating({rating_id: ratingId, user_id: userId, mark_id: markId, date_added: date, date_modified: date, rating: ratingContent, target_user_id: targetUserId});
    try {
        await rating.save();
        return rating;
    } catch(err) {
        return false;
    }
  }

async function findAllByUserId(userId){
    try{
      const rating = await Rating.find({user_id: userId});
      return rating;
    } catch(err){
      return false;
    }
  }

async function findAllByMarkId(markId){
    try{
        const rating = await Rating.find({mark_id: markId});
        return rating;
    } catch(err){
        return false;
    }
}

async function findAllByTargetUserId(targetUserId){
    try{
        const rating = await Rating.find({target_user_id: targetUserId});
        return rating;
    } catch(err){
        return false;
    }
}

async function updateOne(userId, markId, ratingContent){
    try{
        const rating = await Rating.find({rating_id: markId, user_id: userId});
        rating.rating = ratingContent;
        rating.dateModified = new Date();
        rating.save();
        return rating;
    } catch(err){
        return false;
    }
}

async function deleteOne(userId, markId){
    try{
      const rating = await Rating.remove({rating_id: markId, user_id: userId});
      return rating;
    } catch(err){
      return false;
    }
  }

module.exports = Object.freeze({
    findOne,
    addOne,
    findAllByUserId,
    findAllByMarkId,
    findAllByTargetUserId,
    updateOne,
    deleteOne
  });