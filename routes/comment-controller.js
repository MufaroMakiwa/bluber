const Comment = require("../models/comment");
const { v4: uuidv4 } = require("uuid");

async function findOne(commentId){
    try{
    const comment = await Comment.find({comment_id: commentId});
    return comment;
    } catch(err){
    return false;
    }
  }
  
async function addOne(userId, markId, content, targetUserId){
    const date = new Date();
    const commentId = uuidv4();
    
    const comment = new Comment({comment_id: commentId, user_id: userId, mark_id: markId, date_added: date, date_modified: date, content: content, target_user_id: targetUserId});
    try {
        await comment.save();
        return comment;
    } catch(err) {
        return false;
    }
  }

async function findAllByUserId(userId){
    try{
      const comment = await Comment.find({user_id: userId});
      return comment;
    } catch(err){
      return false;
    }
  }

async function findAllByMarkId(markId){
    try{
        const comment = await Comment.find({mark_id: markId});
        return comment;
    } catch(err){
        return false;
    }
}

async function findAllByTargetUserId(targetUserId){
    try{
        const comment = await Comment.find({target_user_id: targetUserId});
        return comment;
    } catch(err){
        return false;
    }
}

async function updateOne(commentId, content){
    try{
        const comment = await Comment.find({comment_id: commentId});
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
      const comment = await Comment.remove({comment_id: commentId});
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