import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import axios from "axios";

const SearchBar = ({ selectedUser, setSelectedUser }) => {
  const { user } = useContext(UserContext);

  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);

  function getAllUsernames() {
    if (user) {
      axios
        .get("http://localhost:5050/record/users")
        .then((response) => {
          const usernames = response.data.map((user) => user.username);
          setAllUsers(usernames);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }

  useEffect(() => {
    getAllUsernames();
  }, []);

  const handleUserClick = (username) => {
    setSelectedUser(username); // Set the selected username
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
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {visible &&
              allUsers
                .filter((li) => li.toLowerCase().includes(search.toLowerCase()))
                .map((item, key) => (
                  <li key={key} onClick={() => handleUserClick(item)}>
                    {item}
                  </li>
                ))}
          </ul>
        </section>
        <hr />
        {/* Display the selected username */}
        {selectedUser && <p>Selected User: {selectedUser}</p>}
      </div>
    </div>
  );
};

export default SearchBar;
