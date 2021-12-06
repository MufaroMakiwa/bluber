const commentController = require("./comment-controller");
const markController = require("./mark-controller");
const replyController = require("./reply-controller");
const ratingController = require("./rating-controller");
const userController = require("./user-controller");
const savedController = require("./saved-controller");


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

async function constructCommentResponse(comment, isNotification=false) {

  const getReplies = async () => {
    let replies =  await replyController.findAllByCommentId(comment._id);
    replies = await Promise.all(replies.map(async (reply) => await constructReplyResponse(reply)));
    return sortResponsesByKey(replies);
  }
  
  return {
    _id: comment._id,
    markId: comment.markId,
    dateAdded: comment.dateAdded,
    content: comment.content,
    ...(!isNotification && {user: await constructUserResponseFromUserId(comment.userId)}),
    ...(!isNotification && {targetUser: await constructUserResponseFromUserId(comment.targetUserId)}),
    ...(!isNotification && {replies: await getReplies()})
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

  const getMarksCount = async () => {
    let marks = await markController.findAllByUserId(user._id);
    return marks.length;
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

  // get reply notifications
  const getReplyNotifications = async () => {
    const replies = await replyController.findAllByTargetUserId(user._id);
    const notifications = await Promise.all(
      replies
        .filter(reply => reply.notificationStatus !== "IGNORED")
        .map(async (reply) => {
          const comment = await commentController.findOne(reply.commentId);
          const mark = await markController.findOne(comment.markId);
          const response = {
            _id: reply._id,
            content: reply.content,
            notificationStatus: reply.notificationStatus,
            dateAdded: reply.dateAdded,
            notificationType: "REPLY",
            user: await constructUserResponseFromUserId(reply.userId),
            comment: await constructCommentResponse(comment, true),
            mark: await constructMarkResponse(mark),
          }
          return response
        })
    );
    return notifications; 
  }

  // get comment notifications
  const getCommentNotifications = async () => {
    const comments = await commentController.findAllByTargetUserId(user._id);
    const notifications = await Promise.all(
      comments
        .filter(comment => comment.notificationStatus !== "IGNORED")
        .map(async (comment) => {
          const mark = await markController.findOne(comment.markId);
          const response = {   
            _id: comment._id,
            content: comment.content,
            notificationStatus: comment.notificationStatus,
            dateAdded: comment.dateAdded,
            notificationType: "COMMENT",
            user: await constructUserResponseFromUserId(comment.userId),
            mark: await constructMarkResponse(mark)
          }
          return response;
        })
    );
    return notifications;
  }

  // get rating notifications
  const getRatingNotifications = async () => {
    const ratings = await ratingController.findAllByTargetUserId(user._id);
    const notifications = await Promise.all(
      ratings.map(async (rating) => {
        const mark = await markController.findOne(rating.markId);
        const response = {
          _id: rating._id,
          rating: rating.rating,
          notificationStatus: rating.notificationStatus,
          dateAdded: rating.dateAdded,
          notificationType: "RATING",
          user: await constructUserResponseFromUserId(rating.userId),
          mark: await constructMarkResponse(mark)
        }
        return response;
      })
    );
    return notifications;
  }

  const getNotifications = async () => {
    const replyNotifications = await getReplyNotifications();
    const commentNotifications = await getCommentNotifications();
    const ratingNotifications = await getRatingNotifications();
    return sortResponsesByKey(replyNotifications.concat(ratingNotifications, commentNotifications));
  }

  const userRating = await getRating();
  
  return {
    userId: user._id,
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
    rating: userRating,
    viewedDemo: user.viewedDemo,
    marks: includePersonalInfo ? await getMarks() : getMarksCount(),
    ...(includePersonalInfo && {saved: await getSaved()}),
    ...(includePersonalInfo && {notifications: await getNotifications()}),
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


async function isCurrentUserMark(markId, userId) {
  let mark = await markController.findOne(markId);
  return mark.userId === userId;
}

async function isCurrentUserComment(commentId, userId) {
  let comment = await commentController.findOne(commentId);
  return comment.userId === userId;
}

async function updateNotificationStatuses(body) {
  const updates = {
    notificationStatus: body.status
  }

  // update rating notificcations
  body.ratingIds && (await Promise.all(
    body.ratingIds.map(async (ratingId) => await ratingController.updateOne(ratingId, updates))
  ));

  // update reply notifications
  body.replyIds && (await Promise.all(
    body.replyIds.map(async (replyId) => await replyController.updateOne(replyId, updates))
  ));

  // update comment notifications
  body.commentIds && (await Promise.all(
    body.commentIds.map(async (commentId) => await commentController.updateOne(commentId, updates))
  ));
}


module.exports = Object.freeze({
    constructMarkResponse,
    constructCommentResponse,
    constructReplyResponse,
    constructUserResponse,
    sortResponsesByKey,
    deleteMark,
    deleteComment,
    isCurrentUserMark,
    isCurrentUserComment,
    updateNotificationStatuses
});