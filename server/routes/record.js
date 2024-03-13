import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// import { PostObject } from "../../server/models/postModel.js";
// import { UserObject } from "../../server/models/userModel.js";
// import { BeanObject } from "../../server/models/beanModel.js";
import PostObject from "../../server/models/postModel.js";
import UserObject from "../../server/models/userModel.js";
import BeanObject from "../../server/models/beanModel.js";

// const PostObject = require("../../server/models/postModel.js");
// const UserObject = require("../../server/models/userModel.js");
// const BeanObject = require("../../server/models/beanModel.js");

//get all users
router.get("/users", async (req, res) => {
  try {
    const collection = db.collection("users");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users");
  }
});

//get all posts
router.get("/posts", async (req, res) => {
  try {
    const collection = db.collection("posts");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving posts");
  }
});

//get all beans
router.get("/beans", async (req, res) => {
  try {
    const collection = db.collection("beans");
    const results = await collection.find({}).toArray();
    res.json(results);
    //res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving beans");
  }
});

//get friends of a user
router.get("/user/friends/:username", async (req, res) => {
  try {
    const user = await UserObject.findOne(req.params.username);
    const friends = await User.find(user.friends);
    res.status(200).json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving friends");
  }
});

//get user by username
router.get("/user/:username", async (req, res) => {
  const collection = await db.collection("users");
  const user = await collection.findOne(req.params.username);
  res.json(user);
});

//get bean by id
router.get("/beans/:_id", async (req, res) => {
  const collection = await db.collection("beans");
  // const query = { _id: new ObjectId(req.params.id) };
  // const result = await collection.findOne(query);

  // if (!result) res.send("Not found").status(404);
  // else res.send(result).status(200);
  const bean = await collection.findById(req.params._id);
  res.json(bean);
});

// This section will help you get a single record by id
// router.get("/:id", async (req, res) => {
//   let collection = await db.collection("records");
//   let query = { _id: new ObjectId(req.params.id) };
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

//add a bean and return the object id so it can be appended to post
router.post("/beans/new/:_id", async (req, res) => {
  try {
    const beanObject = new BeanObject({
      thought: req.body.thought, // Assuming req.body contains the 'thought' field
      time: Date.now(),
    });
    const result = await beanObject.save();

    //add objectid to post
    const post = await PostObject.findById(req.params._id);
    post.thoughts.push({ _id: result._id });
    post.save();

    res.status(201).send({ _id: result._id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding bean");
  }
});

function getNextFridayDate() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilFriday = 5 - dayOfWeek; // Friday is the 5th day of the week (0-indexed)
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + daysUntilFriday);
  nextFriday.setHours(21, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
  return nextFriday;
}

//create a post
router.post("/posts/new", async (req, res) => {
  try {
    const postObject = new PostObject({
      toBePosted: getNextFridayDate(),
      username: req.body.username,
    });
    const result = await postObject.save();
    res.status(201).send({ _id: result._id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding bean");
  }
});

//add a like to the post
router.put("/posts/like/:_id", async (req, res) => {
  const post = await PostObject.findById(req.params._id);
  post.likes++;
  post.save();

  res.json(post);
});

//add a comment to the post
router.put("/posts/comment/:_id", async (req, res) => {
  const post = await PostObject.findById(req.params._id);
  post.comments.push(req.body.comment);
  post.save();

  res.json(post);
});

//add a friend
router.put("/user/friends/new/:_id/:friendUsername", async (req, res) => {
  const user = await UserObject.findById(req.params._id);
  post.friends.push(req.params.friendUsername);
  post.save();

  res.json(post);
});

//delete a friend
router.put("/user/friends/delete/:_id/:friendUsername", async (req, res) => {
  const user = await UserObject.findById(req.params._id);
  const index = user.friends.indexOf(friendUsername);
  if (index !== -1) {
    user.friends.splice(index, 1);
  }
  await user.save();

  res.json(post);
});

//update user bio
router.patch("user/bio/:_id", async (req, res) => {
  const user = await UserObject.findById(req.params._id);
  user.bio = req.body.bio;
  user.save();

  res.json(user);
});

// This section will help you create a new record.
// router.post("/", async (req, res) => {
//   try {
//     let newDocument = {
//       name: req.body.name,
//       position: req.body.position,
//       level: req.body.level,
//     };
//     let collection = await db.collection("records");
//     let result = await collection.insertOne(newDocument);
//     res.send(result).status(204);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error adding record");
//   }
// });

// This section will help you update a record by id.
// router.patch("/:id", async (req, res) => {
//   try {
//     const query = { _id: new ObjectId(req.params.id) };
//     const updates = {
//       $set: {
//         name: req.body.name,
//         position: req.body.position,
//         level: req.body.level,
//       },
//     };

//     let collection = await db.collection("records");
//     let result = await collection.updateOne(query, updates);
//     res.send(result).status(200);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error updating record");
//   }
// });

// // This section will help you delete a record
// router.delete("/:id", async (req, res) => {
//   try {
//     const query = { _id: new ObjectId(req.params.id) };

//     const collection = db.collection("records");
//     let result = await collection.deleteOne(query);

//     res.send(result).status(200);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error deleting record");
//   }
// });

//create a user to register
router.post("/users/register", async (req, res) => {
  try {
    const collection = db.collection("users");
    const dupUser = await collection.findOne({ username: req.body.username });
    if (dupUser) {
      res.json({ error: "Duplicate username exists." });
      return;
    }
    const dupEmailUser = await collection.findOne({ email: req.body.email });
    if (dupEmailUser) {
      res.json({ error: "Duplicate email exists." });
      return;
    }

    const addedUser = await collection.insertOne({
      username: req.body.username, // Use the username from route parameters
      friends: [],
      email: req.body.email, // Access email from request body
      password: req.body.password, // Access password from request body
      bio: "",
    });

    const user = {
      _id: addedUser.insertedId, // Use insertedId to get the ID of the inserted document
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      friends: [],
      bio: "",
    };

    res.json({
      _id: addedUser.insertedId, // Use insertedId to get the ID of the inserted document
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      friends: [],
      bio: "",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

//login feature
router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  const collection = db.collection("users");
  const user = await collection.findOne({ email });
  if (!user) {
    res.json({ error: "Account with this email does not exist" });
    return;
  }

  if (user.password === req.body.password) {
    res.json(user);
  } else {
    res.json({ error: "Incorrect password" });
  }
});

export default router;
