const admin = require("./firebaseAdmin.js");

async function addUser(req, res) {
  try {
    const {
      email,
      username,
      password,
      userId,
      profilePicture,
      name,
      lastName,
    } = req.body;

    const look = await admin
      .database()
      .ref("users")
      .orderByChild("username")
      .orderByChild("username")
      .equalTo(username)
      .once("value");

    if (
      usernameSnapshot.exists() &&
      Object.keys(usernameSnapshot.val()).filter((key) => key !== userId)
        .length > 0
    ) {
      return res.status(400).json({ error: "Username already exists" });
    }

    let pictureUrl = null;

    if (profilePicture) {
      pictureUrl = await uploadProfilePicture(profilePicture);
    }

    const commentRef = await admin.database().ref("users").push({
      userId,
      email,
      username,
      password,
      name,
      lastName,
      profilePicture: pictureUrl,
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });

    res.status(201).json({ message: "User created", userId: commentRef.key });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
}

//this is to set up the feed
async function getFriendPosts(req, res) {
  try {
    const { userId } = req.query;

    const friendDocs = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("friends")
      .get();
    const friendIds = friendDocs.docs.map((doc) => doc.id);

    const posts = [];

    for (const friendId of friendIds) {
      const friendPostsQuerySnapshot = await admin
        .firestore()
        .collection("users")
        .doc(friendId)
        .collection("posts")
        .get();
      friendPostsQuerySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
    }

    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error getting user posts:", error);
    res.status(500).json({ error: "Failed to get user posts" });
  }
}

//this is so when you search up a user you are able to see their posts
async function getUserPosts(req, res) {
  try {
    const { userId } = req.query;

    const retrieve = await admin
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .get();

    const posts = [];
    retrieve.forEach((doc) => {
      posts.push(doc.data());
    });

    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error getting user posts:", error);
    res.status(500).json({ error: "Failed to get user posts" });
  }
}

//able to see a user and their username when you look them up
async function getUser(req, res) {
  try {
    const { userId } = req.query;

    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();

    const publicUserData = {
      username: userData.username,
    };

    res.status(200).json({ user: publicUserData });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.userId;

    await admin.database().ref(`user/${userId}`).remove();
    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
}

async function editUser(req, res) {
  try {
    const commentId = req.params.userId;

    const { username, email, password, name, lastName } = req.body;

    const look = await admin
      .database()
      .ref("users")
      .orderByChild("username")
      .orderByChild("username")
      .equalTo(username)
      .once("value");

    if (
      usernameSnapshot.exists() &&
      Object.keys(usernameSnapshot.val()).filter((key) => key !== userId)
        .length > 0
    ) {
      return res.status(400).json({ error: "Username already exists" });
    }

    await admin
      .database()
      .ref(`user/${userId}`)
      .update({ email, username, password, name, lastName });

    res.status(200).json({ message: "Comment edited" });
  } catch (error) {
    console.error("Error editing comment", error);
    res.status(500).json({ error: "Failed to edit comment" });
  }
}

//adding a friend
async function addFriend(req, res) {
  try {
    const { userId, friendId } = req.body;

    const friendDoc = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("friends")
      .doc(friendId.id)
      .get();
    if (friendDoc.exists) {
      return res.status(400).json({ error: "Friend already added" });
    }

    await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("friends")
      .doc(friendId.id)
      .set({
        friendId: friendId,
      });

    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ error: "Failed to add friend" });
  }
}

//removing a friend...
async function deleteFriend(req, res) {
  try {
    const { userId, friendId } = req.body;

    await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("friends")
      .doc(friendId)
      .delete();

    res.status(200).json({ message: "Friend deleted successfully" });
  } catch (error) {
    console.error("Error deleting friend:", error);
    res.status(500).json({ error: "Failed to delete friend" });
  }
}

//will give list of usernames whose start matches user input
async function getUsernamesBySearch(req, res) {
  try {
    const { prefix } = req.query;

    // Query Firestore for usernames starting with the input prefix
    const usersSnapshot = await admin
      .firestore()
      .collection("users")
      .where("username", ">=", prefix)
      .where("username", "<", prefix + "\uf8ff")
      .get();

    const matchingUsernames = [];
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.username.startsWith(prefix)) {
        matchingUsernames.push(userData.username);
      }
    });

    res.status(200).json({ usernames: matchingUsernames });
  } catch (error) {
    console.error("Error getting usernames by prefix:", error);
    res.status(500).json({ error: "Failed to get usernames" });
  }
}

//need code log in and logout

module.exports = {
  addUser,
  deleteUser,
  editUser,
  getUser,
  getUserPosts,
  addFriend,
  deleteFriend,
  getFriendPosts,
};
