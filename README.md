Start the backend:
- Go into the backend folder
- `npm i`
- `node index.js`
- 
- Windows users: If you face an error after running node index.js, run
- `npm rebuild bcrypt --build-from-source
- then run `node index.js again

Start the frontend:
- Go into the frontend folder)
- Install the following project dependencies:
  `npm install`
  `npm install react-router-dom`
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

