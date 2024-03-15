import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";

const SearchBar = ({ selectedUser, setSelectedUser }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [currUser, setUser] = useState(null);
  const dropdownRef = useRef(null); // Use useRef for mutable ref object

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5050/api/users/profile",
        {
          headers: {
            Authorization: token, // Include JWT token in the Authorization header
          },
        }
      );
      setUser(response.data); // Update user state with profile data
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  function getAllUsernames() {
    axios
      .get("http://localhost:5050/api/users/allUsers")
      .then((response) => {
        const usernames = response.data.map((user) => user.username);
        setAllUsers(usernames);
        //console.log(usernames);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  useEffect(() => {
    getAllUsernames();
    fetchUserProfile();
    console.log(allUsers);
    //console.log(allUsers);
  }, []);

  useEffect(() => {
    // Filter current user once allUsers state is updated
    if (currUser && allUsers.length > 0) {
      filterCurrentUser(allUsers);
    }
  }, [allUsers, currUser]);

  useEffect(() => {
    // Function to close the dropdown when clicking outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    // Add event listener when the dropdown is visible
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when the dropdown is not visible
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  function filterCurrentUser(usernames) {
    //console.log(usernames);
    return usernames.filter((username) => username !== currUser.username);
  }

  const handleUserClick = (username) => {
    setSelectedUser(username); // Set the selected username
    setVisible(false);
  };

  return (
    <div className="content">
      <div className="container">
        <section className="section">
          <input
            type="text"
            className="input"
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedUser(""); // Clear selectedUser when input changes
            }}
            onFocus={() => setVisible(true)}
            // onBlur={() => setVisible(false)}
            placeholder="Search..."
          />
          {visible && (
            <div ref={dropdownRef} className="dropdown-box">
              <ul className="dropdown-list">
                {allUsers
                  .filter((li) =>
                    li.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item, key) => (
                    <li key={key} onClick={() => handleUserClick(item)}>
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </section>
        <hr />
        {/* Display the selected username */}
        {selectedUser && (
          <div className="selected-user-box">
            <p>Selected User: {selectedUser}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
