import React, { useState, useRef } from "react";
import paperClipIcon from "./Pictures/paper-clip.svg"; // Make sure this path is correct
import { UserContext } from "./context/userContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { areDatesEqual } from "./genFunctions";

const Beans = ({ addBean }) => {
  const { user } = useContext(UserContext);

  const [allBeans, setAllBeans] = useState([]);
  const [myBeans, setBeans] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [latestBeanId, setLatestBeanId] = useState("");
  const [nextFriday, setNextFriday] = useState(getNextFridayDate());

  const fileInputRef = useRef(null);

  function getNextFridayDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilFriday = 5 - dayOfWeek; // Friday is the 5th day of the week (0-indexed)
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);
    nextFriday.setHours(21, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
    return nextFriday;
  }

  const fetchBeans = async () => {
    try {
      const response = await axios.get("http://localhost:5050/record/beans");
      setAllBeans(response.data);
      localStorage.setItem("allBeans", JSON.stringify(response.data)); // Store fetched data in local storage
      return response.data;
    } catch (error) {
      console.error("Error retrieving beans:", error);
      throw error;
    }
  };

  const getData = async () => {
    // if (user) {
    try {
      //console.log(allBeans);
      const response = await axios.get("http://localhost:5050/record/posts");
      const filteredPosts = response.data.filter((post) => {
        // Check if the post's username matches the user's username
        const isUserPost = post.username === user.username;
        const postDate = new Date(post.toBePosted);
        const isNextFriday = areDatesEqual(postDate, nextFriday);
        return isUserPost && isNextFriday;
      });
      const updatedBeansInFilteredPosts = filteredPosts.map((post) => {
        const beansForPost = post.beans.map((beanId) => {
          // Find the corresponding bean using the beanId
          return allBeans.find((bean) => bean._id === beanId);
        });
        return beansForPost;
        // username: post.username,
        // comments: post.comments,
        // likes: post.likes,
        // toBePosted: post.toBePosted,
        //beans:
      });
      const flattenedBeans = updatedBeansInFilteredPosts.flat();
      //console.log(flattenedBeans);
      localStorage.setItem("myBeans", JSON.stringify(flattenedBeans)); // Store fetched data in local storage
      // Set each individual bean to an element in the myBeans array
      setBeans(flattenedBeans);
    } catch (error) {
      console.error("Error retrieving posts:", error);
      throw error;
    }
    // }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchBeans();
    };

    const check = (storedAllBeans, storedMyBeans) => {
      let myBeans = [];
      if (storedMyBeans) {
        // Parse the stored data from localStorage
        myBeans = JSON.parse(storedMyBeans);

        // Filter out any null values
        myBeans = myBeans.filter((bean) => bean !== null);

        // Check if the filtered array has the same length as the original array
        if (
          storedAllBeans &&
          myBeans.length === JSON.parse(storedMyBeans).length
        ) {
          return true; // No null values
        } else {
          return false; // Null values present
        }
      } else {
        return false; // localStorage item not found, consider it as no null values
      }
    };
    const storedAllBeans = localStorage.getItem("allBeans");
    const storedMyBeans = localStorage.getItem("myBeans");

    if (check(storedAllBeans, storedMyBeans)) {
      setAllBeans(JSON.parse(storedAllBeans));
      setBeans(JSON.parse(storedMyBeans));
    } else {
      fetchData();
    }
    //console.log(myBeans);
  }, [user]); // Include empty dependency array to run once on mount

  useEffect(() => {
    // Call getData only when allBeans has been updated
    if (allBeans.length > 0) {
      getData();
    }
  }, [allBeans]);

  const handleAddBean = async () => {
    if (textInput.trim() !== "") {
      // const time = new Date(); // Get the current time
      // setBeans([
      //   ...myBeans,
      //   { type: "text", content: textInput, date: time.toLocaleString() },
      // ]);
      // setTextInput("");
      // const newBean = {
      //   type: "text",
      //   content: textInput,
      //   date: time.toLocaleString(),
      // };
      // addBean(newBean); // Use addBean prop to update state in HomePage
      setTextInput("");

      // try {
      //   const response = await axios.post("http://localhost:5050/record/beans/new", {
      //     thought: textInput,
      //     _id: user._id, // Assuming postId is available in the calling scope
      //   });
      //   setLatestBeanId(response.data._id);
      //   return response.data._id; // Return the created bean's ID
      // } catch (error) {
      //   console.error("Error adding bean:", error);
      //   throw error; // Throw the error for handling by the caller
      // }

      // axios
      //   .put("http://localhost:5050/record/post/addBean", {
      //     username: user.username, // Replace 'example_username' with the actual username
      //     beanId: latestBeanId, // Replace 'example_beanId' with the actual beanId
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error adding bean to post:", error);
      //   });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      // reader.onload = (event) => {
      //   setBeans([...myBeans, { type: "image", content: event.target.result }]);
      //   const newBean = { type: "image", content: event.target.result };
      //   addBean(newBean); // Use addBean prop to update state in HomePage
      // };
      // reader.readAsDataURL(file);
    }
  };

  const textInputHandler = (e) => {
    setTextInput(e.target.value);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="home">
      <div className="square-wrapper">
        <div className="square">
          {myBeans &&
            myBeans.map((bean, index) => (
              <div key={index}>
                {bean && bean._id ? (
                  <>
                    {bean.time}
                    <br />
                    {bean.thought}
                  </>
                ) : (
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAQSURBVBhXY/j//z8ABf4C/qc1gYQAAAAAElFTkSuQmCC
                    "
                    alt="Uploaded"
                    style={{ maxWidth: "100%", maxHeight: "800px" }}
                  />
                )}
                <br /> {/* Add a newline after each bean */}
                <br />
              </div>
            ))}
        </div>
        <div
          className="addToBean-container"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <textarea
            className="addToBean-input"
            placeholder="Type here..."
            value={textInput}
            onChange={textInputHandler}
            style={{ flexGrow: 1 }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={paperClipIcon}
              alt="Upload"
              onClick={triggerFileInput}
              style={{ cursor: "pointer", width: "20px", marginRight: "10px" }}
            />
            <button onClick={handleAddBean}>Add To Bean</button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Beans;
