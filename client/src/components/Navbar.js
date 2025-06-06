import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const authLinks = (
    <>
      <span className="text-gray-300 mr-4">Hello, {user && user.username}</span>
      <button 
        onClick={logout}
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-0"
      >
        Logout
      </button>
    </>
  );

  const guestLinks = (
    <>
      <Link
        to="/login"
        className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
      >
        Register
      </Link>
    </>
  );

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-semibold text-xl tracking-tight">Todo App</Link>
      </div>
      <div className="block lg:hidden">
        <button 
          className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
          onClick={toggleMenu}
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? '' : 'hidden lg:block'}`}>
        <div className="text-sm lg:flex-grow">
          {isAuthenticated && (
            <Link
              to="/todos"
              className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
            >
              My Todos
            </Link>
          )}
        </div>
        <div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;