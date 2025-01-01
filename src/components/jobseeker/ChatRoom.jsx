//src/components/jobseeker/ChatRoom.jsx

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, addMessage } from "../../features/chat/chatSlice";
import {
  connectWebSocket,
  sendWebSocketMessage,
  closeWebSocket,
} from "../../utils/websocket";
import {
  connectNotificationWebSocket,
  sendNotificationWebSocketMessage,
} from "../../utils/notificationWebSocket";
import { fetchProfile } from "../../features/jobseekerprofile/jobseekerProfileSlice";
import { fetchChatRooms, updateLastMessage } from "../../features/chat/chatSlice";
import EmojiPicker from "emoji-picker-react";


const ChatRoom = () => {
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
  const messagesContainerRef = useRef(null); // Reference to the messages container
  const userid = useSelector((state) => state.auth.userid);
  console.log(userid, "ewe");
  const username = useSelector((state) => state.auth.username);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);  // To track page number for pagination
  const [hasMoreMessages, setHasMoreMessages] = useState(true); // To track if there are more messages to load
  const [showLoadButton, setShowLoadButton] = useState(false); // Track whether to show the load button
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);


  useEffect(() => {
    // Show load button if the message count exceeds 50
    if (messages.length > 50) {
      setShowLoadButton(true);
    } else {
      setShowLoadButton(false);
    }
  }, [messages]); 


  useEffect(() => {
    if (currentChatRoom && token) {
      dispatch(fetchMessages(currentChatRoom.id, page));
      const socket = connectWebSocket(
        currentChatRoom.id,
        (message) => {
          const messageWithId = message.id
            ? message
            : { ...message, id: `temp-${Date.now()}` };
          dispatch(addMessage(messageWithId));
             dispatch(fetchChatRooms());
        },
        token,
      );
      

      // Connect notification WebSocket
      const notificationSocket = connectNotificationWebSocket(
        token,
        data?.user?.id,
        dispatch
      );


      return () => {
        closeWebSocket();
      };
    }
  }, [dispatch, currentChatRoom, token, page]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);


  const fetchMoreMessages = useCallback(() => {
    if (!isFetching && hasMoreMessages) {
      const container = messagesContainerRef.current;
      const scrollHeightBefore = container.scrollHeight;
  
      setIsFetching(true);
      setPage((prevPage) => {
        const newPage = prevPage + 1;
        dispatch(fetchMessages(currentChatRoom.id, newPage))
          .then((response) => {
            if (response.payload.length === 0) {
              setHasMoreMessages(false);
            }
          })
          .finally(() => {
            setIsFetching(false);
            requestAnimationFrame(() => {
              const scrollHeightAfter = container.scrollHeight;
              container.scrollTop = scrollHeightAfter - scrollHeightBefore;
            });
          });
        return newPage;
      });
    }
  }, [dispatch, currentChatRoom, isFetching, hasMoreMessages]);
  
  

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    


    // Show the button only after the user has scrolled to the last 50 messages
    if (container.scrollTop <=50 && messages.length > 50) {
      setShowLoadButton(true); // Show load button when scrolled to top and more than 50 messages
    } else {
      setShowLoadButton(false); // Hide load button when not at the top
    }

    
  };

  // Automatically scroll to the bottom whenever messages change
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // Scroll to the bottom
    }
  }, [messages]);
  

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setIsEmojiPickerOpen(false); // Close the emoji picker after selecting an emoji
  };

  
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
      // Send notification payload
      const notificationPayload = {
        type: "notification",
        message: `New message from ${data?.user?.username}`,
        user_id: data?.user?.id,
        room_id: currentChatRoom.id,
            };
      sendNotificationWebSocketMessage(notificationPayload);
      // Re-fetch chat rooms after sending a message
      dispatch(fetchChatRooms());
      setNewMessage("");
    }
  };

  

  if (!currentChatRoom)
    return <div className="text-center text-lg">Select a chat </div>;

  const otherPerson =
    currentChatRoom.jobseeker.id === data?.user?.id
      ? currentChatRoom.employer
      : currentChatRoom.jobseeker;

  
    const profilePic =
      currentChatRoom.jobseeker.id === data?.user?.id
        ? currentChatRoom.employer_profile_pic
        : currentChatRoom.jobseeker_profile_pic;
    console.log(`${profilePic}`,":reciever profile pic")

    console.log(profilePic,":reciever profile picture 2")
    const defaultProfileImg = '/profile.jpg';


// Disable the send button if the user is not subscribed and there are more than 5 messages
const isSendButtonDisabled = !data?.user?.is_subscribed && messages.length > 5;
    
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 w-full max-w-4xl mx-auto rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center text-lg font-semibold mb-4 w-full px-4">
          <img
        src={profilePic ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${profilePic}` : defaultProfileImg}
        alt={`${otherPerson.username}'s profile`}
        className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-300"
        />
      <span className="truncate">Chat with {otherPerson.username}</span>
    
      </div>

       {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="w-full flex-grow overflow-y-auto bg-white p-4 rounded-lg mb-4 border border-gray-300"
        style={{ height: "350px" }} // Set a fixed height for the messages container
      onScroll={handleScroll} // Add the scroll handler to the container
    >
      {/* Only show the button if the message count is greater than 50 */}
      {showLoadButton && !isFetching && (
        <button
          onClick={fetchMoreMessages}
          className="text-teal-500 mt-2 text-sm hover:underline"
        >
          Load previous messages
        </button>
      )}
        {messages.map((message) => (
          <div
            key={message.id || `temp-${message.timestamp}`}
            className={`max-w-[50%] mb-3 p-3 rounded-lg shadow-md w-10/12 border ${message.sender.id === data.user.id ? "bg-green-100 self-end ml-auto" : "bg-gray-100 self-end mr-auto"} `}
          >
            <div
      className={`font-medium text-sm ${
        message.sender.id === data.user.id ? "text-right" : "text-left"
      }`}
    >
      {message.sender.id === data.user.id ? "You" : otherPerson.username}
    </div>
    <div
      className={`text-sm mt-1 ${
        message.sender.id === data.user.id ? "text-right" : "text-left"
      }`}
    >
      {message.content || "No content"}
    </div>
    <div
      className={`text-xs text-gray-500 mt-1 ${
        message.sender.id === data.user.id ? "text-right" : "text-left"
      }`}
    >
              {new Date(message.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
        
      </div>

      <div className="bg-white p-4 shadow-inner relative">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />

            <button
            type="button"
            onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
            className="bg-gray-300 p-2 rounded-md text-sm relative"
          >
            😊
          </button>
          <button
  type="submit"
  className={`${
    isSendButtonDisabled
      ? "bg-gray-400 text-gray-500 cursor-not-allowed"
      : "bg-teal-500 text-white hover:bg-teal-600 focus:ring-2 focus:ring-teal-400"
  } py-2 px-5 rounded-md text-sm focus:outline-none`}
  disabled={isSendButtonDisabled}
>
  {isSendButtonDisabled ? "Subscribe" : "Send"}
</button>
        </form>
        {isEmojiPickerOpen && (
          <div className="absolute bottom-full left-0 transform translate-y-2 bg-white p-2 rounded-md shadow-lg z-10">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
