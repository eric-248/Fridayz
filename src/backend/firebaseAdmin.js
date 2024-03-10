var admin = require("firebase-admin");
var serviceAccount = require("../serviceaccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  //need database url 
});

const db = admin.firestore(); 
module.exports = admin; 