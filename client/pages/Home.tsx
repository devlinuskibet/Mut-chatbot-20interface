import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, User, Bot, Loader2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Murang'a University Chatbot Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
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
        text: `I understand you're asking about "${inputMessage}". As a Murang'a University assistant, I can help you with information about admissions, courses, campus facilities, student services, and more. What specific information would you like to know?`,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-university-bg-light to-white">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* University Logo and Title */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 bg-university-green rounded-full flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-3xl">MU</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-university-green">
                  Murang'a University
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mt-2">
                  Chatbot Assistant
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Your intelligent companion for navigating Murang'a University.
                Get instant assistance with admissions, academic programs,
                campus facilities, student services, and much more. Available
                24/7 to help you succeed in your educational journey.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-university-green hover:bg-university-green-dark text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto"
              >
                <MessageCircle size={24} />
                <span>Start Conversation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-university-green mb-4">
              What Can I Help You With?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the various ways our AI assistant can support your
              university experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Admissions & Applications",
                description:
                  "Get guidance on admission requirements, application processes, and deadlines.",
                icon: "📚",
              },
              {
                title: "Academic Programs",
                description:
                  "Learn about courses, departments, faculty, and curriculum details.",
                icon: "🎓",
              },
              {
                title: "Campus Life",
                description:
                  "Discover facilities, clubs, events, and student activities.",
                icon: "🏫",
              },
              {
                title: "Student Services",
                description:
                  "Access information about support services, resources, and assistance.",
                icon: "🤝",
              },
              {
                title: "Financial Information",
                description:
                  "Learn about fees, scholarships, and financial aid opportunities.",
                icon: "💰",
              },
              {
                title: "Technical Support",
                description:
                  "Get help with online portals, systems, and digital resources.",
                icon: "💻",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-university-green mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chatbot Interface Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-university-green text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="text-university-green" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">MU Assistant</h3>
                  <p className="text-sm text-university-green-light">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-university-green-light transition-colors"
                aria-label="Close chat"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-university-green text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && (
                        <Bot
                          size={16}
                          className="text-university-green mt-1 flex-shrink-0"
                        />
                      )}
                      {message.sender === "user" && (
                        <User
                          size={16}
                          className="text-white mt-1 flex-shrink-0"
                        />
                      )}
                      <div>
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
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
                  <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot size={16} className="text-university-green" />
                      <div className="flex space-x-1">
                        <Loader2 className="animate-spin" size={16} />
                        <span className="text-sm">Typing...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-university-green focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-university-green text-white p-3 rounded-full hover:bg-university-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
