# Welcome to Starting Fridayz!

# Introduction
Fridayz is an app for users to add thoughts (what we call beans as a reference to the phrase "spill the beans") to their post which will go live every Friday. With our app, going live on Friday is simulated by the "It's Friday" button. Stay connected with friends and receive updates on other's lives through this app!

# Features
- Weekly Blogging: Users can create and add to their blog throughout the week, adding thoughts (Beans) that record time stamps. The Beans are compiled and posted publicly, allowing friends to view, comment, and engage with the content.
- Community Engagement: Users can view their friends' posts, comment on them, and foster a community of support and interaction by allowing them to express how much or how little they like their posts.
- Profile Customization: A dedicated profile page for users to personalize and manage their account details and blog preferences.

# Components
Backend: see README in backend folder for APIs
Technologies Used
- Javascript 
- Node.js 
- React.js 
- Express.js 
- MongoDB

# Setup
In .env file, add mongodb connection string into MONGODB_URI (connection string included in final report) 
In backend folder in index.js, replace with frontend origin if frontend is not able to run on port 3000

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

# Commands
git clone https://github.com/eric-248/Fridayz.git

# Contributors
Made by Drew Wan, Eric Du, and Lauren Mirhan



