import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Chatbot", path: "/chatbot" },
    {
      name: "University Website",
      path: "https://www.mut.ac.ke/",
      external: true,
    },
    {
      name: "Masomo Portal",
      path: "https://elearning.mut.ac.ke/",
      external: true,
    },
    {
      name: "Student Portal",
      path: "https://studentportal.mut.ac.ke/",
      external: true,
    },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and University Name */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-university-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">MU</span>
            </div>
            <div className="flex flex-col">
              <span className="text-university-green font-bold text-lg leading-tight">
                Murang'a University
              </span>
              <span className="text-gray-600 text-sm leading-tight">
                Chatbot Assistant
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-university-green transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-university-green transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-university-green transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {menuItems.map((item) =>
                item.external ? (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 text-gray-700 hover:text-university-green hover:bg-university-bg-light transition-colors duration-200 rounded-md font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-3 py-2 text-gray-700 hover:text-university-green hover:bg-university-bg-light transition-colors duration-200 rounded-md font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
