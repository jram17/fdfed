
import React, { useState, useEffect } from 'react';
import GroupChat from '../components/GroupChat';
import Content from '../components/Content';
import PrivateChat from '../components/PrivateChat';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';


function ChatPage() {
  const [currentChat, setCurrentChat] = useState('groupchat');
  const [socket, setSocket] = useState(null);


  let { apartment_id } = useParams();
  const aptId = apartment_id;


  const { apartment_username } = useSelector((state) => state.user);
  const username = apartment_username;

  console.log(`${username} from apt:${aptId} was identified`);

  useEffect(() => {
    const newsocket = io('http://localhost:5000');
    setSocket(newsocket);

    // newsocket.on('disconnect',)
    return () => {
      newsocket.disconnect();

    }
  }, []);


  useEffect(() => {
    if (socket) {
      socket.emit('identify', { username: username, aptId: apartment_id });
    }
  }, [username, socket])





  return (
    <>
      <div className="chatPage">
        <Content
          setCurrentChat={setCurrentChat}
          currentChat={currentChat}
          socket={socket}
          user={username}
          aptId={aptId}
        />
        {currentChat === 'groupchat' ? (
          <GroupChat user={username} aptId={aptId} socket={socket} />
        ) : (

          <PrivateChat username={currentChat} currentUser={username} aptId={aptId} socket={socket} />

        )}
      </div>
    </>
  );
}

export default ChatPage;
