import React, { useState, useEffect } from 'react';
import Contentbox from '../components/ContentBox';
function Content({ setCurrentChat, socket, user, aptId }) {

  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(['groupchat']);
  const [showDropdown, setShowDropdown] = useState(false);

  // useEffect(() => {
  //   console.log("Current user:", user);
  //   console.log(aptId)
  //   socket.emit('identify', { username: user, aptId: aptId });
  // }, [user])

  useEffect(() => {
    if (socket) {
      socket.emit('get-selected-users', { username: user, aptId: aptId });
      socket.on('load-selected-users', (users) => {
        console.log("Selected users loaded:", users);
        setSelectedUsers(users);
      });

      socket.on('user-list', (users) => {
        setAvailableUsers(users);
      });

      return () => {
        socket.off('load-selected-users');
        socket.off('user-list');
      };
    }

  }, [user,socket]);

  const handleUserSelect = (selectedUser) => {
    if (!selectedUsers.includes(selectedUser)) {
      const updatedUsers = [...selectedUsers, selectedUser];
      setSelectedUsers(updatedUsers);
      socket.emit('save-selected-users', {
        username: user,
        selectedUsers: updatedUsers,
        aptId: aptId
      });
    }
    setShowDropdown(false);
  };

  const handleChatSelect = (user) => {
    setCurrentChat(user)
  }

  return (

    <div className='content'>
      <div className="contentdiv">
        <div className="contentbox-container">
          {selectedUsers.map((user, index) => (
            <Contentbox key={index} name={user} onClick={() => handleChatSelect(user)} />
          ))}
        </div>
        <div className="add-button-div">
          <button className="add-button" onClick={() => setShowDropdown(!showDropdown)}>+</button>
        </div>

        {showDropdown && (
          <div className="dropdown">
            {availableUsers.map((user, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleUserSelect(user)}
              >
                {user}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="userprofiledisplay">{user}</div>
    </div>

  )
}

export default Content
