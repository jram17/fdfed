import React from 'react'
import { io } from 'socket.io-client';
const socket = io('http://localhost:9000');
import EmojiPicker from 'emoji-picker-react';
import ScrollToBottom from 'react-scroll-to-bottom';
function GroupChat({user,aptId}) {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const to = 'groupchat';

  useEffect(() => {
    console.log("Current user:", user);
    socket.emit('identify', {username:user,aptId:aptId});
  }, [user])

  useEffect(() => {
    // socket.on('to', to)


    // socket.on('chat-history', (msgs) => {
    //     setMessages(msgs);
    // });

    socket.emit('get-grp-chat-history', { to: to,aptId:aptId });
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
  }, [user]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('chat-msgs', { userId: user, to: to, msg: input,aptId:aptId });
      setInput('');
    }
  };

  const onEmojiClick = (emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji)
    console.log(emojiObject.emoji)
  }


  return (
    <div className='groupchat'>
      <div className="chatname">group chat</div>
      <ScrollToBottom className="msgsdiv">
        <ul id='msgs'>
          {messages.map((msg, index) => (
            <div
              className={msg.userId === user ? 'my-msg' : ''}
              style={{ display: 'flex', width: '100%' }}
              key={index}
            >
              <li className={msg.userId === user ? 'my-message' : 'other-message'}>
                <strong>{msg.userId}</strong>
                <br />
                {msg.msg}
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

export default GroupChat;
