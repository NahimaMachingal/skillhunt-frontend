//src/components/jobseeker/ChatRoom.jsx

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, addMessage } from '../../features/chat/chatSlice';
import { connectWebSocket, sendWebSocketMessage, closeWebSocket } from '../../utils/websocket';

const ChatRoom = () => {
  const dispatch = useDispatch();
  const currentChatRoom = useSelector(state => state.chat.currentChatRoom);
  const messages = useSelector(state => state.chat.messages);
  const token = useSelector(state => state.auth.accessToken);
  const user = useSelector(state => state.auth.user);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const userid = useSelector(state => state.auth.userid);
  const username = useSelector(state => state.auth.username);

  useEffect(() => {
    if (currentChatRoom && token) {
      dispatch(fetchMessages(currentChatRoom.id));
      const socket = connectWebSocket(currentChatRoom.id, (message) => {
        const messageWithId = message.id ? message : { ...message, id: `temp-${Date.now()}` };
        dispatch(addMessage(messageWithId));
      }, token);

      return () => {
        closeWebSocket();
      };
    }
  }, [dispatch, currentChatRoom, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Current user details:', {
        userid: user.id,    // Use the user object
        username: user.username,  // Use the user object
        newMessage
      });
      
      console.log('Sending message:', {
        user_id: user.id,
        username: user.username,
        message: newMessage
      });
      const messagePayload = {
        type: 'chat_message',
        message: newMessage,
        user_id: user.id,    // Use user.id
        username: user.username,  // Use user.username
        timestamp: new Date().toISOString()
      };

      sendWebSocketMessage(messagePayload);

      setNewMessage('');
    }
  };

  if (!currentChatRoom) return <div className="text-center text-lg">Select a chat room</div>;

  const otherPerson = currentChatRoom.jobseeker.id === user.id ? currentChatRoom.employer : currentChatRoom.jobseeker;

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 max-w-4xl mx-auto rounded-xl shadow-lg">
      <div className="text-2xl font-semibold mb-4">
        Chat with {otherPerson.username}
      </div>

      <div className="flex-grow overflow-y-auto bg-gray-50 p-4 rounded-lg mb-4 border border-gray-300">
        {messages.map(message => (
          <div key={message.id || `temp-${message.timestamp}`} className={`mb-2 p-2 rounded-lg ${message.sender.id === userid ? 'bg-blue-100 self-end' : 'bg-green-100 self-start'} max-w-3/4`}>
            <div className="font-semibold">{message.sender.username || `${message.sender.name}`}</div>
            <div>{message.content || 'No content'}</div>
            <div className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full mt-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 border rounded-md text-sm"
          />
          <button
            type="submit"
            className="bg-teal-500 text-white py-2 px-4 rounded-md text-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
