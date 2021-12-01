const commentController = require("./comment-controller");
const markController = require("./mark-controller");
const replyController = require("./reply-controller");
const ratingController = require("./rating-controller");
const userController = require("./user-controller");
const savedController = require("./saved-controller")


async function constructMarkResponse(mark, userId) {
  // get the comments
  let comments = await commentController.findAllByMarkId(mark._id);
  comments = await Promise.all(comments.map(async (comment) => await constructCommentResponse(comment)));

  // get the rating
  const markRatings = await ratingController.findAllByMarkId(mark._id);
  const rating = markRatings.reduce((prev, curr) => prev + curr.rating, 0);
  const ratingCount = markRatings.length;
  const isCurrentUserRating = markRatings.filter(rating => rating.userId === userId)[0];
  
  return {
    _id: mark._id,
    user: await constructUserResponseFromUserId(mark.userId),
    dateAdded: mark.dateAdded,
    tags: mark.tags,
    caption: mark.caption,
    start: mark.start,
    end: mark.end,
    path: mark.path,
    comments: sortResponsesByKey(comments),
    rating: ratingCount == 0 ? 0 : rating / ratingCount,
    ratingCount: ratingCount,
    isCurrentUserRating: isCurrentUserRating !== undefined
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
  const response = await constructUserResponse(user, false);
  return response 
}

async function constructUserResponse(user, includePersonalInfo=true) {
  // get user marks
  const getMarks = async () => {
    let marks = await markController.findAllByUserId(user._id);
    marks = await Promise.all(marks.map(async (mark) => await constructMarkResponse(mark)));
    return sortResponsesByKey(marks);
  }
  
  // get saved plans
  const getSaved = async () => {
    let saved = await savedController.findAllByUserId(user._id);
    return sortResponsesByKey(saved);
  }

  // get the rating
  const getRating = async () => {
    const userRatings = await ratingController.findAllByTargetUserId(user._id);
    const rating = userRatings.reduce((prev, curr) => prev + curr.rating, 0);
    const ratingCount = userRatings.length;
    return ratingCount === 0 ? 0 : rating / userRatings.length;
  }
  
  return {
    userId: user._id,
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
    ...(includePersonalInfo && {rating: await getRating()}),
    ...(includePersonalInfo && {marks: await getMarks()}),
    ...(includePersonalInfo && {saved: await getSaved()})
  };
}

function sortResponsesByKey(responses, key="dateAdded"){
  return responses.sort((mark1,mark2) => (mark2[key] - mark1[key]));
}

async function deleteMark(markId){ 
  let comments = await commentController.findAllByMarkId(markId);
  await Promise.all(comments.map(async (comment) => await replyController.deleteMany(comment._id)));
  await ratingController.deleteMany(markId);
  await commentController.deleteMany(markId);
  await markController.deleteOne(markId);
}

async function deleteComment(commentId){
  await replyController.deleteMany(commentId);
  await commentController.deleteOne(commentId);
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