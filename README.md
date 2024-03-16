# Welcome to Starting Fridayz!

##Introduction
Fridayz is an app for users to add thoughts (what we call beans as a reference to the phrase "spill the beans") to their post which will go live every Friday. With our app, going live on Friday is simulated by the "It's Friday" button. Stay connected with friends and receive updates on other's lives through this app!

##Components

##Setup
In .env file, add mongodb connection string into MONGODB_URI  

Start the backend:  
- Go into the backend folder ( `cd backend`)
- `npm i`
- connect to database:  
- `node index.js`
  
Start the frontend:
- In a new terminal
- Go into the frontend folder (`cd frontend`)
- Install the following project dependencies:
  `npm install`
  
  `npm install react-router-dom`
  
- Run the program with:
  
  `npm run start`

It is possible that you may run into issues when starting the backend, the following commands may help:
- Windows users: If you face an error after running node index.js, run `npm rebuild bcrypt --build-from-source` then run `node index.js` again

- for mac users you may need to run these commands:  
  
`sudo chown -R your_username <path to node_modules folder>`  

`chmod +x <path to node_modules folder>.bin/*`  

`npm cache clean --force`  

`rm -rf node_modules`  

`rm package-lock.json`  

It is possible that you may run into issues when starting the frontend, the following command may help:
-  for mac users you may need to run these commands:

`sudo chown -R your_username <path to main project folder>`  

`chmod +x <path to node_modules folder>.bin/*`  

`chmod +x <path to node_modules folder>.bin/*`  

##Commands
git clone 

##Contributors
Made by Drew Wan, Eric Du, and Lauren Mirhan



