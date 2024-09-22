
import React, { useState } from 'react';
import GroupChat from '../components/GroupChat';
import Content from '../components/Content';
import PrivateChat from '../components/PrivateChat';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ChatPage() {
  const [currentChat, setCurrentChat] = useState('groupchat');

  console.log('hit chatpage');

  let { apartment_id } = useParams(); 
  const aptId = apartment_id;


  const { apartment_username } = useSelector((state) => state.user);
  const username = apartment_username;

  console.log(`${username} from apt:${aptId} was identified`);

  const handleChatSelection = (user) => {
    setCurrentChat(user);
  };


  return (
    <>
      <div className="chatPage">
        <Content
          onChatSelect={handleChatSelection}
          user={username}
          aptId={aptId}
        />
        {currentChat === 'groupchat' ? (
          <GroupChat user={username} />
        ) : (

          <PrivateChat username={currentChat} currentUser={username} aptId={aptId} />

        )}
      </div>
    </>
  );
}

export default ChatPage;
