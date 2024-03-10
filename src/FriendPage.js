
import React, { useState } from 'react';
import Friend from './Friend';
import './index.css';

// Assuming the Friend component is defined elsewhere with the updated code

const FriendPage = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: 'John Doe', pictureUrl: 'https://placekitten.com/200/200', status: 'accepted' },
    { id: 2, name: 'Jane Doe', pictureUrl: 'https://placekitten.com/200/200', status: 'pending' },
    // Initial friends data
  ]);

  const removeFriend = (id) => {
    setFriends(friends.filter(friend => friend.id !== id));
  };

  const addFriend = (name, pictureUrl) => {
    const newFriend = {
      id: Math.max(...friends.map(friend => friend.id)) + 1, // Simple ID generation
      name,
      pictureUrl,
      status: 'pending', // New friends start as pending
    };
    setFriends([...friends, newFriend]);
  };

  const acceptFriend = (id) => {
    setFriends(friends.map(friend => 
      friend.id === id ? { ...friend, status: 'accepted' } : friend
    ));
  };

  return (
    <div className="friends-page">
      <button onClick={() => addFriend('New Friend', 'https://placekitten.com/g/200/300')}>Add Friend</button>
      {friends.map(friend => (
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


