import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "../Firebase";

function Settings() {
  const { user, isAuthenticated } = useAuth0();
  const [darkMode, setDarkMode] = useState(false);
  const [unit, setUnit] = useState("lbs");
  const [heightUnit, setHeightUnit] = useState("cm"); 
  const [notification, setNotification] = useState({
    message: "",
    type: "", 
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      const loadSettings = async () => {
        const docRef = doc(db, "settings", user.sub);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDarkMode(data.darkMode ?? false);
          setUnit(data.unit ?? "lbs");
          setHeightUnit(data.heightUnit ?? "cm"); 
        }
      };

      loadSettings();
    }
  }, [isAuthenticated, user]);

  const saveSettings = async () => {
    if (!user) return;

    const settingsData = {
      darkMode,
      unit,
      heightUnit, 
    };

    try {
      await setDoc(doc(db, "settings", user.sub), settingsData, { merge: true });
      setNotification({
        message: "Settings saved successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      setNotification({
        message: "Error saving settings.",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8 space-y-6">


      {notification.message && (
        <div
          className={`${
            notification.type === "success"
              ? "bg-green-500"
              : "bg-red-500"
          } text-white p-4 rounded-lg mb-6`}
        >
          {notification.message}
        </div>
      )}

      <h2 className="text-2xl font-bold text-teal-600">Settings</h2>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-teal-700">Dark Mode</label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </div>

      {/* Units */}
      <div>
        <label className="text-teal-700 block mb-1">Preferred Units</label>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full border rounded p-2 bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          >
          <option value="lbs">Pounds (lbs)</option>
          <option value="kg">Kilograms (kg)</option>
        </select>
      </div>

      {/* Height Unit */}
      <div>
        <label className="text-teal-700 block mb-1">Preferred Height Unit</label>
        <select
          value={heightUnit}
          onChange={(e) => setHeightUnit(e.target.value)}
          className="w-full border rounded p-2 bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          >
          <option value="cm">Centimeters (cm)</option>
          <option value="ft-in">Feet (ft)</option>
        </select>
      </div>

      
      <button
        onClick={saveSettings}
        className="w-full bg-teal-600 text-white p-2 rounded"
      >
        Save Settings
      </button>
    </div>
  );
}

export default Settings;
