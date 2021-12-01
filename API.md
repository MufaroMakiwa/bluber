### USERS

#### POST /api/user/session

Get the current session user if one exists

- @name GET /user/session
- @returns {User | null} - The current session user if one exists

##### Success code: 201

#### DELETE /api/user/session

Logout the current session user

- @return {User} - an array of freets created by author
- @throws {403} - if user is not logged in

##### Success code: 200

#### POST /api/user

Create a new user with given name, email and imageUrl

- @param {string} name - name of user
- @param {string} email - email of user
- @param {string} imageUrl - imageUrl of the user
- @return {User} - the created user
- @throws {403} - if user is already logged in
- @throws {400} - if username is already taken and when password or username is not in correct format

##### Success code: 201

### MARKING

#### GET /api/mark

Retrieve marks in an area spanned by given start and end points

- @param {string} startLat - the lat for the start point
- @param {string} startLng - the lng for the start point
- @param {string} endLat - the lat for the end point
- @param {string} endLng - the lng for the end point
- @returns {Mark[]} - An array of marks in an area

##### Success code: 200

#### POST /api/mark

Create a new mark with the given fields by the current user

- @param {string} caption - the caption for the mark
- @param {array} tags - a list of tags associated with the mark
- @param {Object} start - the start of the mark
- @param {Object} end - the end of the mark
- @return {Mark} - the created mark
- @throws {403} - if user is not logged logged in
- @throws {400} - if caption or tags are invalid

##### Success code: 200

#### DELETE /api/mark/:markId?

Delete a mark by current user with given markId

- @param {string} markId - the Id of mark to delete
- @throws {403} - if user is not logged logged in or not the owner of the mark
- @throws {400} - if mark with given id does not exist

##### Success code: 200

### REPLIES

#### POST /api/reply

Add a reply to a comment

- @param {string} commentId - the Id of the comment to reply to
- @param {string} content - content of the reply
- @param {string} targetUserId - id of author of the reply
- @return {Reply} - the created mark
- @throws {403} - if user is not logged logged in
- @throws {400} - if markId or targetUserId do not exist

##### Success code: 200

#### DELETE /api/reply/:replyId?

Delete a reply made to a comment by the current user

- @param {string} replyId - the Id of reply to be deleted
- @throws {403} - if user is not logged logged in or not the owner of the reply
- @throws {400} - if reply with given id does not exist

##### Success code: 200

### RATINGS

#### POST /api/rating

Add a rating by the current user to a given mark

- @param {string} markId - the Id of the mark to rate
- @param {number} rating - the rating added by the user
- @param {string} targetUserId - the author of the mark being rated
- @return {Rating} - the created rating object
- @throws {403} - if user is not logged logged in, trying to rate their own mark or trying to rate when they are already rating
- @throws {400} - if markId or targetUserId do not exist or the comment content is invalid

##### Success code: 201

#### DELETE /api/rating/:markId?

Delete a rating made by the current user to the mark with given id

- @param {string} markid - the Id of mark to be remove a rating from
- @throws {403} - if user is not logged logged in, trying to rate their own mark or trying to rate when they are already rating
- @throws {400} - if mark with given id does not exist

##### Success code: 200

### SAVED PLANS

#### POST /api/saved

Create a saved plan by the current user

- @param {string} name - the name of the saved plan
- @param {Object} start - the start of the plan
- @param {Object} end - the end of the plan
- @return {Saved} - the created saved plan
- @throws {403} - if user is not logged logged in
- @throws {400} - if saved name is invalid or already exists

##### Success code: 200

#### DELETE /api/saved/:savedId?

Delete a saved plan by the current user

- @param {string} savedId - the Id of saved plan
- @throws {403} - if user is not logged logged in or not the owner of the saved plan
- @throws {400} - if saved plan with given id does not exist

##### Success code: 200

### COMMENTS

#### POST /api/comment

Create a new comment by the current user

- @param {string} markId - the Id of the mark
- @param {string} content - content of the comment
- @param {string} targetUserId - id of author of the mark
- @return {Comment} - the created comment
- @throws {403} - if user is not logged logged in
- @throws {400} - if markId or targetUserId do not exist or the comment content is invalid

##### Success code: 201

#### DELETE /api/comment/:commentId?

Delete a comment by the current user to comment with with given id

- @param {string} commentId - the Id of comment to be deleted
- @throws {403} - if user is not logged logged in or not the owner of the comment
- @throws {400} - if commentId with given id does not exist

##### Success code: 200

### BLUEBIKES

#### GET /api/bluebikes

Acquire data from the bluebikes api

- @return {Bluebike data} an object that maps each station id to its metadata and current status

##### Success code: 200
