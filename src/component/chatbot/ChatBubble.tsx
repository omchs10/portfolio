import React from 'react';
import { Message } from './types';

export const ChatBubble: React.FC<Message> = ({ sender, text }) => {
  const bubbleClass = sender === 'user'
    ? 'bg-blue-100 text-blue-800 self-end rounded-br-md'
    : 'bg-gray-100 text-gray-800 self-start rounded-bl-md';

  return (
    <div className={`chat-bubble max-w-[85%] p-4 rounded-xl shadow-sm ${bubbleClass}`}>
      <p>{text}</p>
    </div>
  );
};
