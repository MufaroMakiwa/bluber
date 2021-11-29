const Comment = require("../models/comment");
const { v4: uuidv4 } = require("uuid");

async function findOne(commentId){
    try{
    const comment = await Comment.find({commentId: commentId});
    return comment;
    } catch(err){
    return false;
    }
  }
  
async function addOne(userId, markId, content, targetUserId){
    const date = new Date();
    // const commentId = uuidv4();
    
    const comment = new Comment({userId: userId, markId: markId, dateAdded: date, dateModified: date, content: content, targetUserId: targetUserId});
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

async function updateOne(commentId, content){
    try{
        const comment = await Comment.find({commentId: commentId});
        comment.content = content;
        comment.dateModified = new Date();
        comment.save();
        return comment;
    } catch(err){
        return false;
    }
}

async function deleteOne(commentId){
    try{
      const comment = await Comment.remove({commentId: commentId});
      return comment;
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