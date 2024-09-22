import React, { useState, useEffect } from 'react';
import GroupChat from '../components/GroupChat';
import Content from '../components/Content';
import PrivateChat from '../components/PrivateChat';
import { fetchData } from '../utils/Roomutils';
import { useDispatch } from 'react-redux';
import { setApartmentDetails } from '../redux/slice/userSlice';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
function ChatPage() {
  const [currentChat, setCurrentChat] = useState('groupchat');
  const [username, setUserName] = useState('');
  const dispatch = useDispatch();
  const { apartment_id } = useParams();
  const {
    data: roomData,
    isError: roomerr,
    isLoading,
  } = useQuery({
    queryKey: ['room', `${apartment_id}`],
    queryFn: () => {
      return fetchData(apartment_id);
    },
  });
  useEffect(() => {
    if (roomData) {
      dispatch(setApartmentDetails(roomData));
    }
  }, [roomData]);
  const aptId = 'iiits-bh3';
  const handleChatSelection = (user) => {
    setCurrentChat(user);
  };

  useEffect(() => {
    const user = prompt('enter your name');
    setUserName(user);
  }, []);

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
          <PrivateChat
            username={currentChat}
            currentUser={username}
            aptId={aptId}
          />
        )}
      </div>
    </>
  );
}

export default ChatPage;
