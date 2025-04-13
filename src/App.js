import React, { useState, useEffect, Suspense } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Ensure you're importing setDoc
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Use Router and Routes for routing
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

  if (isLoading) return <div>Loading...</div>;

  return (
<div className={`min-h-screen ${darkMode ? "dark" : ""} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
<Router basename={process.env.PUBLIC_URL}>
        <nav className="bg-teal-600 p-4 text-white">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
        
            <Link to="/" className="flex items-center text-white text-2xl font-bold hover:text-teal-200">
  <span className="mr-2">🏋️</span> 💅
</Link>

 
            <ul className="flex space-x-6">
              <li>
                <Link to="/workouts" className="hover:text-teal-200">Workouts</Link>
              </li>
              <li>
                <Link to="/progress" className="hover:text-teal-200">Progress</Link>
              </li>
              <li>
                <Link to="/personal-record" className="hover:text-teal-200">Personal Record</Link>
              </li>
              <li>
                <Link to="/calories" className="hover:text-teal-200">Calories</Link> {/* Link to Calories */}
              </li>
              <li>
  <Link to="/schedule" className="hover:text-teal-200">Schedule</Link>
</li>

              <li>
                <button
                  onClick={() => setIsSettingsModalOpen(true)}
                  className="hover:text-teal-200"
                >
                  Settings
                </button>
              </li>
            </ul>

            {/* Theme Toggle */}
            <Suspense fallback={<div>Loading theme toggle...</div>}>
              <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </Suspense>

            {/* User Authentication */}
            {isAuthenticated ? (
              <div className="ml-4">
                <p className="text-white">Welcome, {user.name}</p>
                <button onClick={() => logout({ returnTo: window.location.origin })} className="text-white hover:text-teal-200 ml-2">
                  Log Out
                </button>
              </div>
            ) : (
              <button onClick={() => loginWithRedirect()} className="text-white hover:text-teal-200">
                Log In
              </button>
            )}
          </div>
        </nav>

        <main className="p-6">
          {/* Modal to show settings */}
          <Suspense fallback={<div>Loading Modal...</div>}>
            <Modal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)}>
              <Settings />
            </Modal>
          </Suspense>

        
          <Routes>
          <Route
          path="/"
          element={isAuthenticated ? <UserProfile /> : <p>Please log in to see your profile.</p>}
        />
       
            <Route path="/workouts" element={
              <Suspense fallback={<div>Loading workout tracker...</div>}>
                <WorkoutTracker userSettings={userSettings} />
              </Suspense>
            } />

            {/* Progress Section */}
            <Route path="/progress" element={
              <Suspense fallback={<div>Loading progress tracker...</div>}>
                <ProgressTracker />
              </Suspense>
            } />

            {/* Personal Record Section */}
            <Route path="/personal-record" element={
              <Suspense fallback={<div>Loading personal record...</div>}>
                <PersonalRecord />
              </Suspense>
            } />

<Route path="/calories" element={
              <Suspense fallback={<div>Loading calorie calculator...</div>}>
                <Calories />
              </Suspense>
            } />

<Route path="/schedule" element={
  <Suspense fallback={<div>Loading schedule...</div>}>
    <Schedule />
  </Suspense>
} />

          </Routes>

          
        </main>
        
      </Router>
    </div>
  );
}

export default App;
