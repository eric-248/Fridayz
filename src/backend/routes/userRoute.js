const express = require('express'); 
const router = express.Router(); 
const userController = require('../controlers/user'); 

//create user 
router.post('/user', userController.addUser); 

//delete user
router.delete('/user/:userId', userController.deleteUser); 

//read // looking for specific users 
router.get('/user/:userId', userController.getUser);

//edit user 
router.put('/user/:userId', userController.editUser); 

//get user posts 
router.get('/posts/:userId', userController.getUserPosts); 

//adding a Friend
router.post('/user/friend', userController.addFriend); 

//deleting a friend 
router.delete('/user/:friendId', userController.deleteFriend); 

//getting the feed 
router.get('/user/:userId/friend-posts', userController.getFriendPosts);



module.exports = router; 