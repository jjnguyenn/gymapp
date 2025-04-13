// src/components/Header.js

import React from "react";
import { Link } from "react-scroll"; 

const Header = () => {
  return (
    <header className="bg-teal-600 p-4">
      <nav className="flex justify-between items-center">
        <div className="text-white text-xl font-bold">Gym Buddy</div>
        <div className="space-x-4">
          <Link to="progress" smooth={true} duration={500} className="text-white hover:text-gray-200">Progress</Link>
          <Link to="workoutlog" smooth={true} duration={500} className="text-white hover:text-gray-200">Workout Log</Link>
          <Link to="profile" smooth={true} duration={500} className="text-white hover:text-gray-200">Profile</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
