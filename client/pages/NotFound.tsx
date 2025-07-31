import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, MessageCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-university-bg-light pt-20">
      <div className="text-center max-w-md mx-auto px-4">
        {/* University Logo */}
        <div className="w-20 h-20 bg-university-green rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-2xl">MU</span>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-university-green mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Sorry, the page you're looking for doesn't exist. It might have been moved, 
          deleted, or the URL might be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="bg-university-green hover:bg-university-green-dark text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 flex items-center space-x-2 justify-center"
          >
            <Home size={20} />
            <span>Return to Home</span>
          </Link>
          
          <Link
            to="/chatbot"
            className="bg-white hover:bg-university-bg-light text-university-green font-semibold py-3 px-6 rounded-full border-2 border-university-green transition-colors duration-200 flex items-center space-x-2 justify-center"
          >
            <MessageCircle size={20} />
            <span>Ask the Chatbot</span>
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 mt-8">
          If you believe this is an error, please contact our support team or try using our chatbot for assistance.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
