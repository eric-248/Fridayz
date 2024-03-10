//starting the server up 
const express = require('express'); 
const commentController = require('../routes/commentRoute'); 
const app = express(); 
app.use(express.json); 
const bodyParser = require('body-parser'); 

















const Port = 3000; 
app.listen(PORT, () => { 

console.log('Server running on port ${PORT}'); 
}); 



//side note: dealt with user creation + deletion, editing, and getting user
//learn how to use firebase function to authenticate a user 