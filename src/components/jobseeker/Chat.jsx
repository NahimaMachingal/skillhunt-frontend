//src/components/jobseeker/Chat.jsx
import React from 'react';
import Layout from '../../components/Auth/Layout';  // Import Layout component
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

const Chat = () => {
  return (
    <Layout>
      <div className="flex flex-grow">
        {/* Chat List Section */}
        <div className="w-1/4 border-r border-gray-300 h-full">
          <div className="h-full flex flex-col p-4 bg-white overflow-auto">
            <ChatList />
          </div>
        </div>

        {/* Chat Room Section */}
        <div className="w-3/4 h-full">
          <div className="h-full flex flex-col p-4 bg-white overflow-auto">
            <ChatRoom />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;


