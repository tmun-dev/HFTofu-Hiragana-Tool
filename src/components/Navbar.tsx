import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookMarked, House, Info } from "lucide-react";
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPage =
    location.pathname === "/" ? "home" : location.pathname.slice(1);

  return (
    <nav className="bg-gray-100 shadow-lg w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="HandsFreeTOFU Logo"
              className="h-14 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex h-full items-center">
            <Link
              to="/"
              className={`px-8 h-20 text-xl font-bebas font-semibold transition-colors duration-200 flex items-center ${
                currentPage === "home"
                  ? "text-gray-900 bg-[#268bd2]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              <p className="mr-2">HOME</p>
              <House />
            </Link>
            <Link
              to="/learn"
              className={`px-8 h-20 text-xl font-bebas font-semibold transition-colors duration-200 flex items-center ${
                currentPage === "learn"
                  ? "text-gray-900 bg-[#268bd2]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              <p className="mr-2">LEARN</p>
              <BookMarked />
            </Link>
            <Link
              to="/about"
              className={`px-8 h-20 text-xl font-bebas font-semibold transition-colors duration-200 flex items-center ${
                currentPage === "about"
                  ? "text-gray-900 bg-[#268bd2]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              <p className="mr-2">ABOUT</p>
              <Info />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[#4f87cd] focus:outline-none p-2"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Active Page Indicator */}
      <div
        className="w-full h-6 bg-[#268bd2] transition-transform duration-200 transform"
        style={{
          transform: "translateX(0)",
        }}
      />

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="bg-white">
          <Link
            to="/"
            className={`w-full text-left px-6 py-4 text-2xl font-bebas transition-colors duration-200 ${
              currentPage === "home"
                ? "text-white bg-[#4f87cd]"
                : "text-gray-700 hover:text-white hover:bg-[#4f87cd]"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/learn"
            className={`w-full text-left px-6 py-4 text-2xl font-bebas transition-colors duration-200 ${
              currentPage === "learn"
                ? "text-white bg-[#4f87cd]"
                : "text-gray-700 hover:text-white hover:bg-[#4f87cd]"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Learn
          </Link>
          <Link
            to="/about"
            className={`w-full text-left px-6 py-4 text-2xl font-bebas transition-colors duration-200 ${
              currentPage === "about"
                ? "text-white bg-[#4f87cd]"
                : "text-gray-700 hover:text-white hover:bg-[#4f87cd]"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
