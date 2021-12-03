const Comment = require("../models/comment");

async function findOne(commentId){
    try{
    const comment = await Comment.findOne({_id: commentId});
    return comment;
    } catch(err){
    return false;
    }
  }
  
async function addOne(userId, markId, content, targetUserId, notificationStatus){
    const date = new Date();    
    const comment = new Comment({userId: userId,  markId: markId, dateAdded: date, content: content, targetUserId: targetUserId, notificationStatus: notificationStatus});
    try {
        await comment.save();
        return comment;
    } catch(err) {
        return false;
    }
  }

async function findAllByUserId(userId){
    try{
      const comment = await Comment.find({userId: userId});
      return comment;
    } catch(err){
      return false;
    }
  }

async function findAllByMarkId(markId){
    try{
        const comment = await Comment.find({markId: markId});
        return comment;
    } catch(err){
        return false;
    }
}

async function findAllByTargetUserId(targetUserId){
    try{
        const comment = await Comment.find({targetUserId: targetUserId});
        return comment;
    } catch(err){
        return false;
    }
}



async function deleteOne(commentId){
  try{
    const comment = await Comment.deleteOne({_id: commentId});
    return comment;
  } catch(err){
    return false;
  }
}

/**
 * 
 * @param {*} markId 
 * Deletes all comments that belong to a mark with a certain markId
 * 
 */
async function deleteMany(markId){
  try{
    return await Comment.deleteMany({markId: markId});
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
  deleteOne,
  deleteMany
});