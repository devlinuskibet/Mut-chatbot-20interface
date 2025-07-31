import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  const quickLinks = [
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

  const contactInfo = [
    {
      icon: <MapPin size={18} />,
      text: "P.O. Box 75-01000, Murang'a, Kenya",
    },
    {
      icon: <Phone size={18} />,
      text: "+254 (0) 60 30721",
    },
    {
      icon: <Mail size={18} />,
      text: "info@mut.ac.ke",
    },
  ];

  return (
    <footer className="bg-university-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* University Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-university-green font-bold text-xl">
                  MU
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Murang'a University</h3>
                <p className="text-university-green-light">Chatbot Assistant</p>
              </div>
            </div>
            <p className="text-university-green-light leading-relaxed">
              Your intelligent assistant for navigating Murang'a University
              services and information. Get instant help with admissions,
              academics, and campus life.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-university-green-light hover:text-white transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span>{link.name}</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-university-green-light hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="text-university-green-light mt-1">
                    {contact.icon}
                  </div>
                  <span className="text-university-green-light">
                    {contact.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-university-green-light mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-university-green-light text-sm">
              © 2024 Murang'a University. All rights reserved.
            </p>
            <p className="text-university-green-light text-sm">
              Powered by AI Technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
