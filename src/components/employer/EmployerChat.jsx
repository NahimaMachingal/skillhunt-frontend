//src/components/jobseeker/Chat.jsx
import React from 'react';
import ELayout from '../../components/Auth/ELayout';  // Import Layout component
import EmployerChatList from './EmployerChatList';
import EmployerChatRoom from './EmployerChatRoom';

const EmployerChat = () => {
  return (
    
      <div className="flex flex-grow">
        {/* Chat List Section */}
        <div className="w-1/4 border-r border-gray-300 h-full">
          <div className="h-full flex flex-col p-4 bg-white overflow-auto">
            <EmployerChatList />
          </div>
        </div>

        {/* Chat Room Section */}
        <div className="w-3/4 h-full">
          <div className="h-full flex flex-col p-4 bg-white overflow-auto">
            <EmployerChatRoom />
          </div>
        </div>
      </div>
    
  );
};

export default EmployerChat;


