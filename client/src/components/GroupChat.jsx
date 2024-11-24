import React, { useState, useEffect } from 'react';

import EmojiPicker from 'emoji-picker-react';
import ScrollToBottom from 'react-scroll-to-bottom';

function GroupChat({ user, aptId, socket }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const to = 'groupchat';

  useEffect(() => {
    if (socket) {
      if (user) {
        socket.on('message-deleted', ({ msgId, replacementMsg }) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg._id === msgId
                ? { ...msg, msg: replacementMsg, deleteForAll: true }
                : msg
            )
          );
        });
      }

      socket.emit('get-grp-chat-history', { to: to, aptId: aptId });
      socket.on('grp-chat-history', (msg) => {
        setMessages(msg);
      });

      socket.on('chat-msgs', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => {
        socket.off('chat-history');
        socket.off('chat-msgs');
      };
    }
  }, [user, socket, messages]);

  const currTime = new Date();
  const formatTime = `${currTime
    .getHours()
    .toString()
    .padStart(2, '0')}:${currTime.getMinutes().toString().padStart(2, '0')}`;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('chat-msgs', {
        userId: user,
        to: to,
        msg: input,
        aptId: aptId,
        time: formatTime,
      });
      setInput('');
    }
  };

  const onEmojiClick = (emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
  };

  const handleDelete = (msgId) => {
    socket.emit('handle-delete-msgs', { msgId });
  };

  return (
    <div className="groupchat">
      <div className="chatname">group chat</div>
      <ScrollToBottom className="msgsdiv">
        <ul id="msgs">
          {messages.map((msg, index) => (
            <div
              className={msg.userId === user ? 'my-msg' : ''}
              style={{ display: 'flex', width: '100%' }}
              key={index}
            >
              <li
                className={msg.userId === user ? 'my-message' : 'other-message'}
              >
                <strong>{msg.userId}</strong>
                <br />
                {msg.msg}
                <br />
                {msg.deleteForAll === false && <div>{msg.time}</div>}
                {msg.userId === user && msg.deleteForAll === false && (
                  <button onClick={() => handleDelete(msg._id)}>D</button>
                )}
              </li>
            </div>
          ))}
        </ul>
      </ScrollToBottom>

      <form id="chat-form" onSubmit={handleFormSubmit}>
        <button
          type="button"
          id="emojipicker-btn"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          {showEmojiPicker ? '🫣' : '😊'}
        </button>

        {showEmojiPicker && (
          <div id="emojishow-div">
            <div id="emojiclose-div">
              <button
                id="emojiclose-btn"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                x
              </button>
            </div>
            <EmojiPicker
              width={'500px'}
              onEmojiClick={(emojiObject) => onEmojiClick(emojiObject)}
            />
          </div>
        )}

        <input
          type="text"
          id="chat-input"
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="send-button">send</button>
      </form>
    </div>
  );
}

export default GroupChat;
