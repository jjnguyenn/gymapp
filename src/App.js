import React, { useState, useEffect, Suspense } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { doc, getDoc } from "firebase/firestore";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import db from "./Firebase";

const Settings = React.lazy(() => import("./components/Settings"));
const Modal = React.lazy(() => import("./components/Modal"));
const WorkoutTracker = React.lazy(() => import("./components/WorkoutTracker"));
const ProgressTracker = React.lazy(() => import("./components/ProgressTracker"));
const ThemeToggle = React.lazy(() => import("./components/ThemeToggle"));
const PersonalRecord = React.lazy(() => import("./components/PersonalRecord"));
const Calories = React.lazy(() => import("./components/Calories"));
const Schedule = React.lazy(() => import("./components/Schedule"));
const UserProfile = React.lazy(() => import("./components/UserProfile"));

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [userSettings, setUserSettings] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const fetchSettings = async () => {
      const savedMode = localStorage.getItem("darkMode");

      if (isAuthenticated && user) {
        try {
          const docRef = doc(db, "settings", user.sub);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setDarkMode(data.darkMode ?? (savedMode === "true"));
            localStorage.setItem("darkMode", data.darkMode);
            setUserSettings(data);
          } else {
            setDarkMode(savedMode === "true");
          }
        } catch (error) {
          console.error("Failed to fetch settings:", error);
          setDarkMode(savedMode === "true");
        }
      } else {
        setDarkMode(savedMode === "true");
      }
    };

    fetchSettings();
  }, [isAuthenticated, user]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  if (isLoading) return <div>Loading</div>;

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      <Router>
        <nav className="bg-teal-600 p-4 text-white">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center text-white text-2xl font-bold hover:text-teal-200">
              <span className="mr-2">🏋️</span> 💅
            </Link>
            <div className="lg:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
                {menuOpen ? "✖️" : "☰"}
              </button>
            </div>
            <ul className="hidden lg:flex space-x-6">
              <li><Link to="/workouts" className="hover:text-teal-200">Workouts</Link></li>
              <li><Link to="/progress" className="hover:text-teal-200">Progress</Link></li>
              <li><Link to="/personal-record" className="hover:text-teal-200">Personal Record</Link></li>
              <li><Link to="/calories" className="hover:text-teal-200">Calories</Link></li>
              <li><Link to="/schedule" className="hover:text-teal-200">Schedule</Link></li>
              <li>
                <button onClick={() => setIsSettingsModalOpen(true)} className="hover:text-teal-200">Settings</button>
              </li>
            </ul>
            <div className="hidden lg:flex items-center space-x-4">
              <Suspense fallback={<div>Loading</div>}>
                <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              </Suspense>
              {isAuthenticated ? (
                <>
                  <span className="text-white hidden md:inline">Welcome, {user.name}</span>
                  <button onClick={() => logout({ returnTo: window.location.origin })} className="hover:text-teal-200">Log Out</button>
                </>
              ) : (
                <button onClick={() => loginWithRedirect()} className="hover:text-teal-200">Log In</button>
              )}
            </div>
          </div>

          {menuOpen && (
            <div className="lg:hidden mt-4 space-y-2">
              <ul className="space-y-2">
                <li><Link to="/workouts" onClick={() => setMenuOpen(false)} className="block hover:text-teal-200">Workouts</Link></li>
                <li><Link to="/progress" onClick={() => setMenuOpen(false)} className="block hover:text-teal-200">Progress</Link></li>
                <li><Link to="/personal-record" onClick={() => setMenuOpen(false)} className="block hover:text-teal-200">Personal Record</Link></li>
                <li><Link to="/calories" onClick={() => setMenuOpen(false)} className="block hover:text-teal-200">Calories</Link></li>
                <li><Link to="/schedule" onClick={() => setMenuOpen(false)} className="block hover:text-teal-200">Schedule</Link></li>
                <li><button onClick={() => { setIsSettingsModalOpen(true); setMenuOpen(false); }} className="block hover:text-teal-200">Settings</button></li>
              </ul>

              <div className="mt-4 flex items-center space-x-4">
                <Suspense fallback={<div>Loading</div>}>
                  <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                </Suspense>
                {isAuthenticated ? (
                  <>
                    <span className="text-white">{user.name}</span>
                    <button onClick={() => logout({ returnTo: window.location.origin })} className="hover:text-teal-200">Log Out</button>
                  </>
                ) : (
                  <button onClick={() => loginWithRedirect()} className="hover:text-teal-200">Log In</button>
                )}
              </div>
            </div>
          )}
        </nav>

        <main className="p-6">
          <Suspense fallback={<div>Loading</div>}>
            <Modal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)}>
              <Settings />
            </Modal>
          </Suspense>

          <Routes>
            <Route path="/" element={isAuthenticated ? <UserProfile /> : <p>Please log in to see your profile.</p>} />
            <Route path="/workouts" element={<Suspense fallback={<div>Loading</div>}><WorkoutTracker userSettings={userSettings} /></Suspense>} />
            <Route path="/progress" element={<Suspense fallback={<div>Loading</div>}><ProgressTracker /></Suspense>} />
            <Route path="/personal-record" element={<Suspense fallback={<div>Loading</div>}><PersonalRecord /></Suspense>} />
            <Route path="/calories" element={<Suspense fallback={<div>Loading</div>}><Calories /></Suspense>} />
            <Route path="/schedule" element={<Suspense fallback={<div>Loading</div>}><Schedule /></Suspense>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
