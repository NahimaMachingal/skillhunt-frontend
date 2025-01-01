import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, addMessage, clearMessages } from '../../features/chatbot/chatbotSlice';


const EmployerChatbot = ({ activeUser }) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); 
  const [showQuestions, setShowQuestions] = useState(true);
  const messages = useSelector((state) => state.chatbot.messages);
  const messagesEndRef = useRef(null);


  const commonQuestions = [
    { question: "How do I contact customer support?", answer: "If you need assistance, you can contact customer support by emailing support@skillhunt.com or visiting the 'Contact Us' section on the website." },
    { question: "Is my data secure on this platform?", answer: "Yes, we prioritize the security of your personal and professional information. Our platform uses industry-standard encryption methods to ensure that your data is protected." },
    { question: "How do I get a job recommendation?", answer: "You will receive job recommendations based on your profile and preferences. You can also filter job listings by category, location, and other criteria." },
    { question: "Can I receive interview alerts?", answer: "Yes, you can set up interview alerts to receive notifications about interview scheduling that match your preferences." },
  ];

  // Scroll to the bottom whenever messages update
    useEffect(() => {
      const chatContainer = messagesEndRef.current?.parentNode;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, [messages]);
  
    // Clear messages when activeUser changes
      useEffect(() => {
        dispatch(clearMessages());
        setShowQuestions(true);
      }, [activeUser, dispatch]);

  const handleSend = () => {
      if (input.trim()) {
        dispatch(addMessage({ sender: 'user', text: input })); // Add user message immediately
        setLoading(true);
        dispatch(sendMessage(input)).finally(() => {
          setLoading(false); // Reset loading when the bot response is received
        });
        setInput('');
      }
    };

  const handleQuestionClick = (question, answer) => {
      dispatch(addMessage({ sender: 'user', text: question }));
      dispatch(addMessage({ sender: 'bot', text: answer }));
      setShowQuestions(false);
    };

    

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/chatbt.jpg")' }}
    >
      <div className="mr-48 w-96 h-[500px] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
        <h1 className="m-0 p-4 bg-blue-600 text-white text-center text-lg">FAQ</h1>
        <div className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto bg-gray-100"
        style={{ maxHeight: 'calc(100vh - 150px)' }} // Adjust height if necessary
        >
        
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end gap-2 ${msg.sender === 'bot' ? '' : 'flex-row-reverse'}`}
            >
              <img
                src={
                  msg.sender === 'bot'
                    ? '/robot.png' // Replace with actual bot avatar URL
                    : '/user.jpg' // Replace with actual user avatar URL
                }
                alt={msg.sender}
                className="w-10 h-10 rounded-full"
              />
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg text-sm shadow-md ${
                  msg.sender === 'bot' ? 'bg-blue-100' : 'bg-green-100'
                }`}
              >
                <span>{msg.text}</span>
              </div>
            </div>
          ))}

{loading && ( // Show loader when loading
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-400"></div>
            </div>
          )}


          <div ref={messagesEndRef}></div>
        </div>
        <div className="flex p-4 bg-gray-100">
        {showQuestions && (
          <div className="flex flex-wrap gap-2 mb-4 justify-start">
          {commonQuestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleQuestionClick(item.question, item.answer)}
              className="px-4 py-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 text-gray-800 text-sm font-medium transition-all"
            >
              {item.question}
            </button>
          ))}
        </div>
                )}
                </div>
                <div className="flex p-4 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <button
            onClick={handleSend}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerChatbot;
