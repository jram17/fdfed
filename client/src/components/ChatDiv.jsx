import React from 'react'
import EmojiPicker from 'emoji-picker-react';
import ScrollToBottom from 'react-scroll-to-bottom';
function ChatDiv({currentUser,name}) {
  return (
    <div className='groupchat'>
      <div className="chatname">{name}</div>
      <ScrollToBottom className="msgsdiv">
        <ul id='msgs'>
          {messages.map((msg, index) => (
            <div className={msg.userId === currentUser ? 'my-msg' : ''} style={{ display: 'flex', width: '100%' }} key={index}>
              <li className={msg.userId === currentUser ? 'my-message' : 'other-message'}>
                <strong>{msg.userId}</strong><br />{msg.msg}
              </li>
            </div>
          ))}
        </ul>
      </ScrollToBottom>

      <form id='chat-form' onSubmit={handleFormSubmit}>
        <button type="button" id='emojipicker-btn' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          {showEmojiPicker ? '🫣' : '😊'}
        </button>

        {showEmojiPicker && (
          <div id='emojishow-div'>
            <div id='emojiclose-div'>
              <button id='emojiclose-btn' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>x</button>
            </div>
            <EmojiPicker width={'500px'} onEmojiClick={(emojiObject) => onEmojiClick(emojiObject)} />
          </div>
        )}

        <input
          type="text"
          id='chat-input'
          autoComplete='off'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='send-button'>send</button>
      </form>
    </div>
  )
}

export default ChatDiv
