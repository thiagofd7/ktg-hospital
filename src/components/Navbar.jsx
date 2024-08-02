import React, { useState } from 'react';
import Link from 'next/link';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { pathname, push } = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getLinkClassName = (path) => {
    const baseClass = `mr-4 hover:${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`;
    return pathname === path ? `${baseClass} font-bold` : baseClass;
  };

  const handleLinkClick = (path) => {
    if (pathname === path) {
      setIsSidebarOpen(false); 
    } else {
      push(path);
      setIsSidebarOpen(false); 
    }
  };

  return (
    <nav className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-md`}>
      <div className="flex items-center ml-6">
        <img
          src="https://icones.pro/wp-content/uploads/2022/03/icone-de-l-hopital-bleu.png"
          alt="logohospital"
          className="w-8 h-8"
        />
        <p className={`ml-2 text-lg ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>KTG</p>
      </div>
      <div className="hidden md:flex">
        <Link href="/" className={getLinkClassName('/')}>
          Home
        </Link>
        <Link href="/dashboard" className={getLinkClassName('/dashboard')}>
          Dashboard
        </Link>
      </div>
      <div className="flex items-center md:hidden">
        <button onClick={toggleSidebar} className="focus:outline-none mr-4">
          <FiMenu size={24} />
        </button>
      </div>
      <div className="flex items-center">
        <button onClick={toggleDarkMode} className="focus:outline-none mr-4">
          {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>
        <span className="mr-2 hidden md:inline">Admin</span>
        <img
          src="https://icones.pro/wp-content/uploads/2022/07/icones-d-administration-bleu.png"
          alt="Admin"
          className="w-5 h-5"
        />
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar}></div>
      <div className={`fixed top-0 left-0 h-full w-64 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4">
          <span className=" text-lg font-bold">KTG <span className="text-blue-500">HOSPITAL</span></span>
          <button onClick={toggleSidebar} className="focus:outline-none">
            <FiX size={24} className="" />
          </button>
        </div>
        <div className="mt-4">
          <button
            onClick={() => handleLinkClick('/')}
            className="block px-4 py-2 text-left w-full hover:bg-gray-700"
          >
            Home
          </button>
          <button
            onClick={() => handleLinkClick('/dashboard')}
            className="block px-4 py-2 text-left w-full hover:bg-gray-700"
          >
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
