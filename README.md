# Start
In .env file, add mongodb connection string into MONGODB_URI
## Start the backend:
- Go into the backend folder
- `npm i`
- `node index.js`
  
- Windows users: If you face an error after running node index.js, run `npm rebuild bcrypt --build-from-source` then run `node index.js` again
  
## Start the frontend:
- Go into the frontend folder)
- Install the following project dependencies:
  `npm install`
  
  `npm install react-router-dom`
  
- Run the program with:
  
  `npm run start`

## It is possible that you may run into issues when starting the backend, the following commands may help:

`sudo chown -R your_username <path to node_modules folder>`  

`chmod +x <path to node_modules folder>.bin/*`  

`npm cache clean --force`  

`rm -rf node_modules`  

`rm package-lock.json`  


## It is possible that you may run into issues when starting the frontend, the following command may help:

`sudo chown -R your_username <path to main project folder>`  

`chmod +x <path to node_modules folder>.bin/*`  

`chmod +x <path to node_modules folder>.bin/*`  






