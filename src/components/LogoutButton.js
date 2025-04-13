import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ThemeToggle from "./ThemeToggle"; 

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  return (
    <nav className="bg-teal-600 p-4 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

        <h1 className="text-2xl font-bold">Gym Buddy</h1>

       
        <ul className="flex space-x-6 items-center">
          <li>
            <a href="#workouts" className="hover:text-teal-200">Workouts</a>
          </li>
          <li>
            <a href="#progress" className="hover:text-teal-200">Progress</a>
          </li>
          <li>
            <a href="#settings" className="hover:text-teal-200">Settings</a>
          </li>
        </ul>

    
        <div className="flex items-center space-x-4">
   
          {toggleDarkMode && <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}

          {!isLoading && (
            <>
              {isAuthenticated ? (
                <>
                  <span className="hidden md:inline">{user?.name}</span>
                  <button
                    onClick={() =>
                      logout({
                        logoutParams: {
                          returnTo: window.location.origin,
                        },
                      })
                    }
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => loginWithRedirect()}
                  className="bg-white text-teal-600 px-4 py-2 rounded hover:bg-gray-200"
                >
                  Log In
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
