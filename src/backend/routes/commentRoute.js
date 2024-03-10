const express = require('express'); 
const router = express.Router(); 
const commentController = require('../controlers/comments');


//create 
router.post('/comments', commentController.addComment); 

//delete
router.delete('/comments/:commentId' , commentConrtoller.deleteComment); 

//read
router.get('/comment', commentController.getComment);

//edit
router.put('/comment/:commentId', commentController.editComment); 


module.exports = router; 