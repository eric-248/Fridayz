import React, { useState } from 'react';
import Friend from './Friend';
import './index.css';

const FriendPage = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: 'John Doe', pictureUrl: 'https://placekitten.com/200/200', status: 'accepted' },
    { id: 2, name: 'Jane Doe', pictureUrl: 'https://placekitten.com/200/200', status: 'pending' },
    // Initial friends data
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const removeFriend = (id) => {
    setFriends(friends.filter(friend => friend.id !== id));
  };

  const addFriend = (name, pictureUrl) => {
    const newFriend = {
      id: Math.max(...friends.map(friend => friend.id)) + 1,
      name,
      pictureUrl,
      status: 'pending',
    };
    setFriends([...friends, newFriend]);
  };

  const acceptFriend = (id) => {
    setFriends(friends.map(friend => 
      friend.id === id ? { ...friend, status: 'accepted' } : friend
    ));
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="friends-page">
      <input 
        type="text" 
        placeholder="Search friends..." 
        value={searchQuery} 
        onChange={handleSearchInputChange} 
      />
      <button onClick={() => addFriend('New Friend', 'https://placekitten.com/g/200/300')}>Add Friend</button>
      {filteredFriends.map(friend => (
        <Friend
          key={friend.id}
          name={friend.name}
          pictureUrl={friend.pictureUrl}
          onRemove={() => removeFriend(friend.id)}
          status={friend.status}
          onAccept={() => acceptFriend(friend.id)}
        />
      ))}
    </div>
  );
};

export default FriendPage;
