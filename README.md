Start the backend:
- Modify the .env file with the correct port, mongoDB URL, and a secure JWT token
  `npm i`
  `node index.js`

Start the frontend:
- Go into the main project folder (not inside the frontend or backend folder)
- Install the following project dependencies:
  `npm install`
  `npm install -D react-router-dom`
- Run the program with:
  `npm run start`

It is possible that you may run into issues when starting the backend, the following commands may help:

`sudo chown -R your_username /Users/crazydog/Desktop/Fridayz/backend/node_modules`
`chmod +x /Users/crazydog/Desktop/Fridayz/backend/node_modules/.bin/*`
`npm cache clean --force`
`rm -rf node_modules`
`rm package-lock.json`

It is possible that you may run into issues when starting the frontend, the following command may help:

`sudo chown -R your_username /Users/crazydog/Desktop/Fridayz`
`chmod +x /Users/crazydog/Desktop/Fridayz/frontend/node_modules/.bin/*`
`chmod +x /Users/crazydog/Desktop/Fridayz/backend/node_modules/.bin/*`

