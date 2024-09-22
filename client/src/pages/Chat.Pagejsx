import React, { useState } from 'react'
import GroupChat from '../components/GroupChat';
import Content from '../components/Content';
import PrivateChat from '../components/PrivateChat'

function ChatPage() {
  const [currentChat, setCurrentChat] = useState('groupchat')
  const [username, setUserName] = useState('');

  const aptId='iiits-bh3';
  const handleChatSelection = (user) => {
    setCurrentChat(user);
  }

  useEffect(() => {
    const user = prompt('enter your name');
    setUserName(user);
  }, [])


  return (
    <>
      <div className="chatPage">
        <Content onChatSelect={handleChatSelection} user={username} aptId={aptId} />
        {currentChat === 'groupchat' ? (
          <GroupChat user={username} />
        ) : (
          <PrivateChat username={currentChat} currentUser={username} aptId={aptId}/>
        )}
      </div>
    </>
  )
}

export default ChatPage;
