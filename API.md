API Routes

--------------
POST /api/user/session 
201: Occurs when a valid user logs in successfully
400: Error occurs when an invalid user with a username that does not exist attempts to log in
503: Failure to join session

DELETE /api/user/delete
200: Occurs when a valid user is logged out successfully 

POST /api/user
201: Occurs when a new user account is successfully created
503: Failure to create a new user account 

-----------------
GET /api/mark 
200: Calculates all of the marks between a specific start and end point successfully

POST /api/mark
201: Adds a mark successfully at a start and end point 

DELETE /api/mark/:markId?
200: Occurs when a mark is deleted successfully

-----------------
POST /api/reply 
201: Occurs when a reply is added successfully

DELETE /api/reply/:replyId?
200: Occurs when a reply is deleted successfully 

------------------
POST /api/rating 
201: Occurs when a rating is added successfully 

DELETE /api/rating/:markId?
200: Occurs when a rating is deleted successfully 

-------------------
POST /api/saved 
201: Occurs when a rating is added successfully 

PATCH /api/saved/:savedId?
200: Occurs when the saved path is updated successfully

DELETE /api/saved/:savedId?
200: Occurs when the saved path is deleted successfully 

--------------------
GET /api/bluebikes
200: Occurs when the data from the bluebikes dataset is acquired successfully

---------------------
POST /api/comment
201: Occurs when a comment is added successfully 

DELETE /api/comment/:commentId?
200: Occurs when a comment is deleted successfully 
