// components/Navbar.js
import React from 'react';
import Link from 'next/link';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { pathname } = useRouter();

  const getLinkClassName = (path) => {
    const baseClass = `mr-4 hover:${isDarkMode ? 'text-gray-400' : 'text-blue-600'}`;
    return pathname === path ? `${baseClass} font-bold` : baseClass;
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
      <div>
        <Link href="/" className={getLinkClassName('/')}>
          Home
        </Link>
        <Link href="/dashboard" className={getLinkClassName('/dashboard')}>
          Dashboard
        </Link>
      </div>
      <div className="flex items-center">
        <button
          onClick={toggleDarkMode}
          className="focus:outline-none mr-4"
        >
          {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>
        <span className="mr-2">Admin</span>
        <img
          src="https://icones.pro/wp-content/uploads/2022/07/icones-d-administration-bleu.png"
          alt="Admin"
          className="w-5 h-5"
        />
      </div>
    </nav>
  );
};

export default Navbar;
