const admin = require('./firebaseAdmin.js'); 


async function addComment(req, res) {
    try {
        const { postId, text, likes, userId } = req.body;

        const commentRef = await admin.database().ref(`posts/${postId}/comments`).push({
            userId,
            likes,
            text,
            createdAt: admin.database.ServerValue.TIMESTAMP
        });

        res.status(201).json({ message: 'Comment created', commentId: commentRef.key });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
}


async function getComment(req, res){

try {
   const{postId} = req.query; 

   const retrieve = await admin.database().ref(`posts/${postId}/comments`).once('value')
   const comments = retrieve.val(); 

   res.status(200).json({comments});
}
catch(error) {

    console.error('Error getting comments:', error);
    res.status(500).json({ error: 'Failed to get comments' });
}}


async function deleteComment(req,res){

try{
    const { postId, commentId } = req.params;

    await admin.database().ref(`posts/${postId}/comments/${commentId}`).remove();

    res.status(200).json({ message: 'Comment deleted' });
}

catch(error){
    console.error('Error deleting comment', error); 
    res.status(500).json({error: 'Failed to delete comment'}); 
}
}


async function editComment(req,res){
  try{
    const { postId, commentId } = req.params;
    const { text } = req.body;
    await admin.database().ref(`posts/${postId}/comments/${commentId}`).update({ text });

    res.status(200).json({message: 'Comment edited'}); 

  }

  catch(error){
    console.error('Error editing comment', error); 
    res.status(500).json({error: 'Failed to edit comment'}); 

  }


}




module.exports = {
 
addComment, 
getComment,
deleteComment, 
editComment
}