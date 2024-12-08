//src/components/employer/EmployerChatRoom.jsx

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, addMessage } from "../../features/chat/chatSlice";
import {
  connectWebSocket,
  sendWebSocketMessage,
  closeWebSocket,
} from "../../utils/websocket";
import { fetchProfile } from "../../features/employerprofile/employerProfileSlice";
import { fetchChatRooms } from "../../features/chat/chatSlice";

const EmployerChatRoom = () => {
  const dispatch = useDispatch();
  const currentChatRoom = useSelector((state) => state.chat.currentChatRoom);
  const messages = useSelector((state) => state.chat.messages);
  const token = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
  console.log(user, "eww778ii");
  const { data, status, error } = useSelector((state) => state.profile);
  console.log("opw2", data?.user?.id);
  console.log(data, "data")
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const userid = useSelector((state) => state.auth.userid);
  console.log(userid, "ewe");
  const username = useSelector((state) => state.auth.username);

  useEffect(() => {
    if (currentChatRoom && token) {
      dispatch(fetchMessages(currentChatRoom.id));
      const socket = connectWebSocket(
        currentChatRoom.id,
        (message) => {
          const messageWithId = message.id
            ? message
            : { ...message, id: `temp-${Date.now()}` };
          dispatch(addMessage(messageWithId));
          // Refresh chat rooms on new message
        dispatch(fetchChatRooms());
        },
        token,
      );



      return () => {
        closeWebSocket();
      };
    }
  }, [dispatch, currentChatRoom, token]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log("Current user details:", {
        userid: user.id, // Use the user object
        username: user.username, // Use the user object
        newMessage,
      });

      console.log("Sending message:", {
        user_id: data?.user?.id,
        username: data?.user?.username,
        message: newMessage,
      });
      const messagePayload = {
        type: "chat_message",
        message: newMessage,
        user_id: data?.user?.id, // Use user.id
        username: data?.user?.username, // Use user.username
        timestamp: new Date().toISOString(),
      };

      sendWebSocketMessage(messagePayload);

      // Re-fetch chat rooms after sending a message
      dispatch(fetchChatRooms());
      setNewMessage("");
    }
  };

  if (!currentChatRoom)
    return <div className="text-center text-lg">Select a chat room</div>;

  const otherPerson =
    currentChatRoom.employer.id === data?.user?.id
      ? currentChatRoom.jobseeker
      : currentChatRoom.employer;

      const profilePic =
      currentChatRoom.jobseeker.id === data?.user?.id
        ? currentChatRoom.jobseeker_profile_pic
        : currentChatRoom.employer_profile_pic;
    console.log(`${profilePic}`,":reciever profile pic")
    const defaultProfileImg = '/profile.jpg';
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 max-w-4xl mx-auto rounded-xl shadow-lg">
      <div className="flex items-center text-2xl font-semibold mb-4">
      
      <img
        src={profilePic ? `http://localhost:8000${profilePic}` : defaultProfileImg}
        alt={`${otherPerson.username}'s profile`}
        className="w-10 h-10 rounded-full mr-2"
      />
      Chat with {otherPerson.username}
  </div>

      <div className="flex-grow overflow-y-auto bg-gray-50 p-4 rounded-lg mb-4 border border-gray-300">
        {messages.map((message) => (
          <div
            key={message.id || `temp-${message.timestamp}`}
            className={`mb-2 p-2 rounded-lg ${message.sender.id === data.user.id ? "bg-pink-100 self-end" : "bg-green-100 self-start"} max-w-3/4`}
          >
            <div className="font-semibold">
            {message.sender.id === data.user.id ? "You" : otherPerson.username}
            </div>
            <div>{message.content || "No content"}</div>
            <div className="text-sm text-gray-500">
              {new Date(message.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full mt-4">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-2"
        >
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

export default EmployerChatRoom;
