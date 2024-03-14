# Backend for Fridayz

## How to run
 - Modify the .env file with the correct port, mongoDB URL, and a secure JWT token
 - `npm i`
 - `node index.js`

 ## API

**Bean Endpoints:**
   - **Create Bean**: `POST /api/beans`
     - Description: Creates a new bean.
     - Authorization Header: Bearer token (JWT) obtained after successful login.
     - Request Body: JSON object containing the bean information.
     - Example: `curl -X POST -H "Authorization: <JWT>" -H "Content-Type: application/json" -d '{"thought": "This is a new bean"}' http://localhost:5050/api/beans`

   - **Get All Beans**: `GET /api/beans`
     - Description: Retrieves all beans.
     - Example: `curl http://localhost:5050/api/beans`

   - **Get Bean by ID**: `GET /api/beans/:beanId`
     - Description: Retrieves a bean by its ID.
     - Path Parameter: `beanId` - ID of the bean.
     - Example: `curl http://localhost:5050/api/beans/<beanId>`

   - **Update Bean**: `PUT /api/beans/:beanId`
     - Description: Updates the specified bean.
     - Authorization Header: Bearer token (JWT) obtained after successful login.
     - Path Parameter: `beanId` - ID of the bean to be updated.
     - Request Body: JSON object containing the updated bean information.
     - Example: `curl -X PUT -H "Authorization: <JWT>" -H "Content-Type: application/json" -d '{"thought": "Updated bean thought"}' http://localhost:5050/api/beans/<beanId>`

   - **Delete Bean**: `DELETE /api/beans/:beanId`
     - Description: Deletes the specified bean.
     - Authorization Header: Bearer token (JWT) obtained after successful login.
     - Path Parameter: `beanId` - ID of the bean to be deleted.
     - Example: `curl -X DELETE -H "Authorization: <JWT>" http://localhost:5050/api/beans/<beanId>`

**Post Endpoints:**
   - **Create Post**: `POST /api/posts`
     - Description: Creates a new post.
     - Authorization Header: Bearer token (JWT) obtained after successful login.
     - Request Body: JSON object containing the post information.
     - Example: `curl -X POST -H "Authorization: <JWT>" -H "Content-Type: application/json" -d '{"content": "New post content"}' http://localhost:5050/api/posts`

   - **Get All Posts**: `GET /api/posts`
     - Description: Retrieves all posts.
     - Example: `curl http://localhost:5050/api/posts`

   - **Get Post by ID**: `GET /api/posts/:postId`
     - Description: Retrieves a post by its ID.
     - Path Parameter: `postId` - ID of the post.
     - Example: `curl http://localhost:5050/api/posts/<postId>`

   - **Add Comment to Post**: `POST /api/posts/:postId/comments`
     - Description: Adds a comment to the specified post.
     - Authorization Header: Bearer token (JWT) obtained after successful login.
     - Path Parameter: `postId` - ID of the post to which the comment will be added.
     - Request Body: JSON object containing the comment.
     - Example: `curl -X POST -H "Authorization: <JWT>" -H "Content-Type: application/json" -d '{"comment": "This is a new comment"}' http://localhost:5050/api/posts/<postId>/comments`

   - **Like Post**: `POST /api/posts/:postId/like`
     - Description: Likes the specified post.
     - Authorization Header: Bearer token (JWT) obtained after successful login.
     - Path Parameter: `postId` - ID of the post to be liked.
     - Example: `curl -X POST -H "Authorization: <JWT>" http://localhost:5050/api/posts/<postId>/like`

   - **Unlike Post**: `DELETE /api/posts/:postId/unlike`
     - Description: Removes the like from the specified post.
     - Authorization Header: Bearer token (JWT) obtained after successful login.
     - Path Parameter: `postId` - ID of the post from which the like will be removed.
     - Example: `curl -X DELETE -H "Authorization: <JWT>" http://localhost:5050/api/posts/<postId>/unlike`

**User Endpoints:**
   - **Register User**: `POST /api/users/register`
     - Description: Registers a new user with the application.
     - Request Body: JSON object containing user information (e.g., username, email, password).
     - Example: `curl -X POST -H "Content-Type: application/json" -d '{"username": "exampleuser", "email": "user@example.com", "password": "password123"}' http://localhost:5050/api/users/register`

   - **Login User**: `POST /api/users/login`
     - Description: Authenticates a user and generates a JSON Web Token (JWT) for accessing protected routes.
     - Request Body: JSON object containing user credentials (e.g., username/email, password).
     - Example: `curl -X POST -H "Content-Type: application/json" -d '{"username": "exampleuser", "password": "password123"}' http://localhost:5050/api/users/login`

   - **Get User Profile**: `GET /api/users/profile`
     - Description: Retrieves the profile information of the authenticated user.
     - Authorization Header: Bearer token (JWT) obtained after successful login.
     - Example: `curl -H "Authorization: <JWT>" http://localhost:5050/api/users/profile`

   - **Update User Profile**: `PUT /api/users/profile`
     - Description: Updates the profile information of the authenticated user.
     - Authorization Header: Bearer token (JWT) obtained after successful login.
     - Request Body: JSON object containing updated user information (e.g., username, email, bio).
     - Example: `curl -X PUT -H "Authorization: <JWT>" -H "Content-Type: application/json" -d '{"username": "newusername", "email": "newemail@example.com", "bio": "New bio"}' http://localhost:5050/api/users/profile`

   - **Add Friend**: `POST /api/users/add-friend/:friendId`
     - Description: Adds a friend to the authenticated user's friend list.
     - Authorization Header: Bearer token (JWT) obtained after successful login.
     - Path Parameter: `friendId` - ID of the user to be added as a friend.
     - Example: `curl -X POST -H "Authorization: <JWT>" http://localhost:5050/api/users/add-friend/<friendId>`

   - **Remove Friend**: `DELETE /api/users/remove-friend/:friendId`
     - Description: Removes a friend from the authenticated user's friend list.
     - Authorization Header: Bearer token (JWT) obtained after successful login.
     - Path Parameter: `friendId` - ID of the user to be removed from the friend list.
     - Example: `curl -X DELETE -H "Authorization: <JWT>" http://localhost:5050/api/users/remove-friend/<friendId>`