import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";
import cookieParser from "cookie-parser";
// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
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
router.get("/user/friends", async (req, res) => {
  try {
    const user = await UserObject.findOne(req.body.username);
    const friends = await User.find(user.friends);
    res.status(200).json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving friends");
  }
});

//get user by username
router.get("/user", async (req, res) => {
  const username = req.query.username;
  const collection = await db.collection("users");
  const user = await collection.findOne({ username: username });
  // console.log(username);
  // console.log(user);
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
router.post("/beans/new", async (req, res) => {
  try {
    const beanObject = new BeanObject({
      thought: req.body.thought, // Assuming req.body contains the 'thought' field
      time: Date.now(),
    });
    const result = await beanObject.save();

    //add objectid to post
    const post = await PostObject.findById(req.body._id);
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

//add a bean to the post
router.put("/post/addBean", async (req, res) => {
  const { username } = req.body.username; // Get the postId from the request params
  const { beanId } = req.body.beanId; // Get the beanId from the request body

  try {
    // Find the post by its ID
    const posts = await Post.find({ username: username });
    // If the post is not found, return a 404 status
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const matchingPost = posts.find(
      (post) => post.toBePosted === getNextFridayDate()
    );
    if (matchingPost) {
      matchingPost.beans.push(beanId);
      await matchingPost.save();
      console.log("Matching post:", matchingPost);
      res.status(200).json({ message: "Bean added to post", post: post });
    } else {
      console.log("No post found for the desired date");
    }
  } catch (error) {
    console.error("Error adding bean to post:", error);
    // Return a 500 status with an error message
    res.status(500).json({ error: "Error adding bean to post" });
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
// router.patch("/user/friends/new", async (req, res) => {
//   const friendUsername = req.body.friendUsername;
//   const collection = await db.collection("users");
//   const user = await collection.findOne({ _id: req.body._id });

//   //const user = await UserObject.findById(req.body._id);
//   user.friends.push(req.body.friendUsername);
//   user.save();

//   res.json(user);
// });
router.patch("/user/friends/new", async (req, res) => {
  try {
    const friendUsername = req.body.friendUsername;
    const userId = req.body._id;
    const extractedId = userId.match(/(?<=")[^"]+(?=")/)[0];
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const collection = await db.collection("users");
    const user = await collection.findOne({ _id: new ObjectId(extractedId) });
    if (!user) {
      return res.status(404).json({ error: "ALKFJIEUROEWIUUser not found" });
    }
    user.friends.push(friendUsername);

    await collection.updateOne(
      { _id: new ObjectId(extractedId) },
      { $set: { friends: user.friends } }
    );
    const result = await collection.findOne({ _id: new ObjectId(extractedId) });
    res.json(user);
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete a friend
router.put("/user/friends/delete/:_id/:friendUsername", async (req, res) => {
  const user = await UserObject.findById(req.params._id);
  const index = user.friends.indexOf(friendUsername);
  if (index !== -1) {
    user.friends.splice(index, 1);
  }
  //await user.save();

  res.json(post);
});

//update user bio
router.patch("user/updateBio", async (req, res) => {
  try {
    const newBio = req.body.newBio;
    const userId = req.body._id;
    const extractedId = userId.match(/(?<=")[^"]+(?=")/)[0];

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const collection = await db.collection("users");
    const user = await collection.findOne({ _id: new ObjectId(extractedId) });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user document with the new bio contents
    await collection.updateOne(
      { _id: new ObjectId(extractedId) },
      { $set: { bio: newBio } }
    );
    res.json(result);
  } catch (error) {
    console.error("Error updating bio:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
    //res.json(user);
    //res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    // jwt.sign(
    //   {
    //     email: user.email,
    //     _id: user._id,
    //     username: user.username,
    //     password: user.password,
    //   },
    //   process.env.JWT_SECRET,
    //   {},
    //   (err, token) => {
    //     if (err) throw err;
    //     res
    //       .cookie("token", token, { sameSite: "none", secure: true })
    //       .json(user);
    //   }
    // );
    res.cookie("_id", user._id, {
      maxAge: 900000,
      sameSite: "None",
      httpOnly: false,
      secure: true,
    });
    res.cookie("email", user.email, {
      maxAge: 900000,
      sameSite: "None",
      httpOnly: false,
      secure: true,
    });
    res.cookie("username", user.username, {
      maxAge: 900000,
      sameSite: "None",
      httpOnly: false,
      secure: true,
    });
    res.cookie("password", user.password, {
      maxAge: 900000,
      sameSite: "None",
      httpOnly: false,
      secure: true,
    });

    res.send("updated");
  } else {
    res.json({ error: "Incorrect password" });
  }
});

//get current user
router.post("/users/current", async (req, res) => {
  try {
    const _id = req.body._id;
    if (_id) {
      res.json(req.body);
    } else {
      res.json({ error: "No account logged in" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
