const commentController = require("./comment-controller");
const markController = require("./mark-controller.js");
const replyController = require("./reply-controller");
const ratingController = require("./rating-controller");
const userController = require("./user-controller");


async function constructMarkResponse(mark) {
  let comments = await commentController.findAllByMarkId(mark._id);
  comments = await Promise.all(comments.map(async (comment) => await constructCommentResponse(comment)));
  
  return {
    _id: mark._id,
    user: await constructUserResponseFromUserId(mark.userId),
    dateAdded: mark.dateAdded,
    tags: mark.tags,
    caption: mark.caption,
    start: mark.start,
    end: mark.end,
    path: mark.path,
    comments: sortResponsesByKey(comments)
  };
}

async function constructCommentResponse(comment) {
  let replies =  await replyController.findAllByCommentId(comment._id);
  replies = await Promise.all(replies.map(async (reply) => await constructReplyResponse(reply)));
 
  return {
    _id: comment._id,
    user: await constructUserResponseFromUserId(comment.userId),
    markId: comment.markId,
    dateAdded: comment.dateAdded,
    content: comment.content,
    targetUser: await constructUserResponseFromUserId(comment.targetUserId),
    replies: sortResponsesByKey(replies)
  }
}

async function constructReplyResponse(reply) {
  return {
    _id: reply._id,
    user: await constructUserResponseFromUserId(reply.userId),
    dateAdded: reply.dateAdded,
    commentId: reply.commentId,
    content: reply.content, 
    targetUser: await constructUserResponseFromUserId(reply.targetUserId),
  }
}

async function constructUserResponseFromUserId(userId) {
  const user = await userController.findOne(userId);
  const response = await constructUserResponse(user);
  return response 
}

async function constructUserResponse(user) {
  const userRatings = await ratingController.findAllByTargetUserId(user._id);
  const rating = userRatings.reduce((prev, curr) => prev + curr.rating, 0);
  
  return {
    userId: user._id,
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
    rating: rating
  };
}

function sortResponsesByKey(responses, key="dateAdded"){
  return responses.sort((mark1,mark2) => (mark2[key] - mark1[key]));
}

async function deleteMark(markId){ 
  let comments = await commentController.findAllByMarkId(markId)
  await Promise.all(comments.forEach(async(comment)=> await replyController.deleteMany(comment._id)))
  await commentController.deleteMany(markId);
  await markController.deleteOne(markId)
}

async function deleteComment(commentId){
  await commentController.deleteOne(commentId);
  await replyController.deleteMany(commentId)
}



module.exports = Object.freeze({
    constructMarkResponse,
    constructCommentResponse,
    constructReplyResponse,
    constructUserResponse,
    sortResponsesByKey,
    deleteMark,
    deleteComment
});