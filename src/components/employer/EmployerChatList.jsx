//src/components/employer/EmployerChatList.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatRooms, setCurrentChatRoom } from '../../features/chat/chatSlice';
import { fetchProfile } from '../../features/employerprofile/employerProfileSlice';

const EmployerChatList = () => {

  const defaultProfileImg = '/profile.jpg';
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user, "username is");
  const chatRooms = useSelector(state => state.chat.chatRooms);
  const status = useSelector(state => state.chat.status);
  const { data, error } = useSelector((state) => state.profile);
  console.log("new username is", data?.user?.user_type);
  const currentUser = useSelector(state => state.auth.user);
  console.log(currentUser,"currentUser")
  const [searchTerm, setSearchTerm] = useState('');
  const currentChatRoom = useSelector((state) => state.chat.currentChatRoom);

  useEffect(() => {
    dispatch(fetchChatRooms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  
  useEffect(() => {
    if (chatRooms.length && currentChatRoom) {
      const updatedRoom = chatRooms.find(room => room.id === currentChatRoom.id);
      if (updatedRoom) {
        dispatch(setCurrentChatRoom(updatedRoom));
      }
    }
  }, [chatRooms, currentChatRoom, dispatch]);

  const filteredChatRooms = chatRooms.filter(room => {
    const otherPerson = room.employer?.id === data?.user?.id ? room.jobseeker : room.employer;
    console.log("jobseeker id is", room.jobseeker.id)
    console.log("room of jobseeker is", room.jobseeker)
    console.log("room of employer is", room.employer)
    console.log("current user id is", data?.user?.id)
    console.log("other person is", otherPerson)
    return otherPerson?.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (status === 'loading') return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin border-t-blue-500"></div>
    </div>
  );
  
  if (status === 'failed') return <div className="text-red-500 text-center">Error loading chat rooms</div>;

  return (
    <div className="h-screen p-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://example.com/your-background-image.jpg')` }}>
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">Chats</h1>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search Chats..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="w-full max-w-md bg-white bg-opacity-80 rounded-lg overflow-auto p-4">
        {filteredChatRooms.map(room => {
          const otherPerson = room.employer.id === data?.user?.id ? room.jobseeker : room.employer;

          return (
            <div key={room.id}>
              <div
                onClick={() => dispatch(setCurrentChatRoom(room))}
                className="flex items-center space-x-4 bg-white p-2 mb-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={
                    otherPerson?.profile_img
                    ? `http://localhost:8000${otherPerson.profile_img}`
                  : defaultProfileImg}
                  alt={otherPerson.username}
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex-grow">
                  <h2 className="font-semibold">{otherPerson.username}</h2>
                  {room.last_message && (
                    <p className="text-sm text-gray-500">
                      {room.last_message.content.length > 30
                        ? `${room.last_message.content.slice(0, 30)}...`
                        : room.last_message.content}
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-gray-300 h-px my-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployerChatList;

