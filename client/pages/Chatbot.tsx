import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to the Murang'a University Chatbot! I'm here to assist you with any questions about the university. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate API call to chatbot backend
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thank you for your question about "${inputMessage}". As your Murang'a University assistant, I can provide information about admissions, academic programs, campus facilities, student services, fees, and much more. What would you like to know specifically?`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const quickQuestions = [
    "What are the admission requirements?",
    "Tell me about available courses",
    "How much are the fees?",
    "Where is the campus located?",
    "What facilities are available?",
    "How do I apply for scholarships?",
  ];

  return (
    <div className="min-h-screen bg-university-bg-light pt-20">
      <div className="max-w-4xl mx-auto p-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-university-green mb-4">
            University Chatbot Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Get instant answers to your questions about Murang'a University
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-university-green text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Bot className="text-university-green" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">MU Assistant</h3>
                <p className="text-university-green-light">Ready to help you</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-sm lg:max-w-lg px-4 py-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-university-green text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {message.sender === "bot" && (
                      <Bot
                        size={20}
                        className="text-university-green mt-1 flex-shrink-0"
                      />
                    )}
                    {message.sender === "user" && (
                      <User
                        size={20}
                        className="text-white mt-1 flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p
                        className={`text-xs mt-2 ${
                          message.sender === "user"
                            ? "text-university-green-light"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 max-w-sm lg:max-w-lg px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bot size={20} className="text-university-green" />
                    <div className="flex items-center space-x-2">
                      <Loader2 className="animate-spin" size={16} />
                      <span className="text-sm">Assistant is typing...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-600 mb-3">Try asking about:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="text-left p-2 text-sm text-university-green bg-university-bg-light rounded-lg hover:bg-university-green-light hover:text-white transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Murang'a University..."
                className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-university-green focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-university-green text-white p-3 rounded-full hover:bg-university-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need more help? Visit our{" "}
            <a
              href="https://www.mut.ac.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-university-green hover:underline"
            >
              official website
            </a>{" "}
            or contact us directly.
          </p>
        </div>
      </div>
    </div>
  );
}
