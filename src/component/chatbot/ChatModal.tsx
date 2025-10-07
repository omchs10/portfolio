import React, { useState, useEffect, useRef } from 'react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition.ts';
import { getBotResponse } from '../../services/chatbotService.ts';
import { MicIcon, PaperPlaneIcon, XIcon } from '../icons/index.ts';
import { ChatBubble } from './ChatBubble.tsx';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

interface ChatModalProps {
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const chatLogRef = useRef<HTMLDivElement>(null);

  const { isListening, toggleListening, isSupported } = useSpeechRecognition(setMessage);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setMessages(prev => [...prev, { sender: 'user', text: message }]);
      setTimeout(() => {
        const botResponse = getBotResponse(message);
        setMessages(prev => [...prev, { sender: 'assistant', text: botResponse }]);
      }, 1000);
      setMessage('');
    }
  };

  const handleClose = () => {
    if (isListening) {
      toggleListening();
    }
    onClose();
  };

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col h-full max-h-[80vh]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">Smart Assistant</h1>
          <div className="flex flex-col items-center justify-center">
            <div onClick={toggleListening} className="relative w-8 h-8 cursor-pointer">
              <div className={`flex items-center justify-center w-full h-full rounded-full transition-all duration-500 transform scale-100 ${isListening ? 'bg-red-500 text-white animate-pulse-slow' : 'bg-gray-300 text-gray-600 hover:bg-gray-400'}`}>
                <MicIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {isListening ? 'Listening...' : 'Tap to speak'}
            </div>
          </div>
          <button className="absolute top-8 right-8 text-gray-500 hover:text-gray-800" onClick={handleClose}>
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div ref={chatLogRef} className="flex-grow overflow-y-auto space-y-4 p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <p>Tap the mic to get started.</p>
              <p>Or start typing your message below.</p>
            </div>
          ) : (
            messages.map((msg, index) => <ChatBubble key={index} sender={msg.sender} text={msg.text} />)
          )}
        </div>

        <div className="mt-4 flex flex-col">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              className="bg-blue-600 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center transition-colors duration-300 hover:bg-blue-700"
              onClick={handleSendMessage}
            >
              <PaperPlaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};