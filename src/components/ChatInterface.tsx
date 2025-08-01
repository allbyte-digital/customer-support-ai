import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Clock, CheckCircle } from 'lucide-react';
import { Message } from '../types';
import { commonResponses } from '../data/mockData';

interface ChatInterfaceProps {
  onEscalate: (reason: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onEscalate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: commonResponses.greeting,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('order') && (message.includes('status') || message.includes('track'))) {
      return commonResponses.orderStatus;
    } else if (message.includes('password') || message.includes('login') || message.includes('account')) {
      return "I can help you with account issues. For password resets, please visit our login page and click 'Forgot Password'. If you're having trouble accessing your account, I can guide you through the recovery process.";
    } else if (message.includes('billing') || message.includes('payment') || message.includes('charge')) {
      return commonResponses.billing;
    } else if (message.includes('slow') || message.includes('bug') || message.includes('error') || message.includes('technical')) {
      return commonResponses.technicalIssue;
    } else if (message.includes('refund') || message.includes('return') || message.includes('cancel')) {
      return "I understand you'd like to discuss a refund or return. Our return policy allows for returns within 30 days. For refund requests, I'll need to escalate this to our billing specialist. Would you like me to do that now?";
    } else if (message.includes('escalate') || message.includes('manager') || message.includes('human')) {
      return commonResponses.escalation;
    } else {
      return "I understand your concern. Let me help you with that. Could you provide a bit more detail about your specific situation so I can give you the most accurate assistance?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // Check if escalation is needed
      if (response === commonResponses.escalation) {
        setTimeout(() => {
          onEscalate('Customer requested human agent');
        }, 1000);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold">Customer Support AI</h3>
            <p className="text-sm text-blue-100">Available 24/7</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <CheckCircle size={16} />
          <span>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'assistant' && (
                  <Bot size={16} className="mt-1 flex-shrink-0" />
                )}
                {message.type === 'user' && (
                  <User size={16} className="mt-1 flex-shrink-0" />
                )}
                <div className="text-sm">{message.content}</div>
              </div>
              <div className={`text-xs mt-1 opacity-70 ${
                message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot size={16} />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};