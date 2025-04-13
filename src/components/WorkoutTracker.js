import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import db from "../Firebase";

function WorkoutTracker() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [exercise, setExercise] = useState("");
  const [customExercise, setCustomExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [workoutLog, setWorkoutLog] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load from localStorage
  const loadLocalWorkouts = () => {
    try {
      const stored = localStorage.getItem("localWorkouts");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // Save to localStorage
  const saveLocalWorkouts = (workouts) => {
    localStorage.setItem("localWorkouts", JSON.stringify(workouts));
  };

  useEffect(() => {
    const fetchWorkoutLog = async () => {
      setLoading(true);
      try {
        let firebaseWorkouts = [];
        if (isAuthenticated && user) {
          const q = query(
            collection(db, "workouts"),
            where("userId", "==", user.sub),
            orderBy("timestamp", "desc")
          );
          const querySnapshot = await getDocs(q);
          firebaseWorkouts = querySnapshot.docs.map((doc) => doc.data());
        }

        const localWorkouts = loadLocalWorkouts();
        setWorkoutLog([...firebaseWorkouts, ...localWorkouts]);
      } catch (error) {
        console.error("Error fetching workouts: ", error);
        alert("There was an error fetching your workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchSettings = async () => {
      if (isAuthenticated && user) {
        try {
          const settingsRef = doc(db, "settings", user.sub);
          const settingsSnap = await getDoc(settingsRef);
          if (settingsSnap.exists()) {
            const settingsData = settingsSnap.data();
            setWeightUnit(settingsData.unit || "kg");
          }
        } catch (error) {
          console.error("Error fetching user settings:", error);
        }
      }
    };

    fetchWorkoutLog();
    fetchSettings();
  }, [isAuthenticated, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalExercise =
      exercise === "Other" ? customExercise.trim() : exercise;

    if (!finalExercise || !sets || !reps || !weight) return;

    const workoutData = {
      exercise: finalExercise,
      sets,
      reps,
      weight,
      weightUnit,
      timestamp: Date.now(),
      userId: user?.sub || null,
    };

    if (isAuthenticated && user) {
      try {
        await addDoc(collection(db, "workouts"), workoutData);
      } catch (error) {
        console.error("Error saving workout:", error);
        alert("There was an error saving your workout. Please try again.");
      }
    } else {
      const updatedLocal = [workoutData, ...loadLocalWorkouts()];
      saveLocalWorkouts(updatedLocal);
    }

    setWorkoutLog((prev) => [workoutData, ...prev]);
    setExercise("");
    setCustomExercise("");
    setSets("");
    setReps("");
    setWeight("");
  };

  const handleReset = () => {
    setExercise("");
    setCustomExercise("");
    setSets("");
    setReps("");
    setWeight("");
  };

  const handleClearAll = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to delete all workout logs?"
    );
    if (!confirmClear) return;

    try {
      if (isAuthenticated && user) {
        const q = query(
          collection(db, "workouts"),
          where("userId", "==", user.sub)
        );
        const querySnapshot = await getDocs(q);

        const deletePromises = querySnapshot.docs.map((workoutDoc) =>
          deleteDoc(doc(db, "workouts", workoutDoc.id))
        );
        await Promise.all(deletePromises);
      }

      localStorage.removeItem("localWorkouts");
      setWorkoutLog([]);
    } catch (error) {
      console.error("Error deleting workouts:", error);
      alert("Error deleting workouts.");
    }
  };

  if (isLoading)
    return <p className="text-center text-gray-500">Checking authentication</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-lg p-6 transition-all">
        {!isAuthenticated && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded-md">
            <p className="font-semibold">You are not logged in.</p>
            <p className="text-sm">
              Your workouts will be saved locally but not to the cloud.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Exercise</label>
            <select
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="w-full border rounded-md p-2 bg-white dark:bg-gray-800"
            >
              <option value="">Select Exercise</option>
              <option value="Bench Press">Bench Press</option>
              <option value="Squat">Squat</option>
              <option value="Deadlift">Deadlift</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {exercise === "Other" && (
            <div>
              <label className="block font-medium mb-1">Custom Exercise</label>
              <input
                type="text"
                value={customExercise}
                onChange={(e) => setCustomExercise(e.target.value)}
                className="w-full border rounded-md p-2 bg-white dark:bg-gray-800"
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Sets</label>
              <input
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="w-full border rounded-md p-2 bg-white dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Reps</label>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full border rounded-md p-2 bg-white dark:bg-gray-800"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Weight ({weightUnit})</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border rounded-md p-2 bg-white dark:bg-gray-800"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Workout
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-auto"
            >
              Clear All
            </button>
          </div>
        </form>

        <hr className="my-6 border-gray-300 dark:border-gray-600" />

        <h2 className="text-xl font-semibold mb-4">Workout Log</h2>
        {workoutLog.length === 0 ? (
          <p className="text-gray-500">No workouts logged yet.</p>
        ) : (
          <ul className="space-y-2">
            {workoutLog.map((entry, index) => (
              <li
                key={index}
                className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              >
                <p className="font-medium text-lg">{entry.exercise}</p>
                <p className="text-sm">
                  {entry.sets} sets × {entry.reps} reps @ {entry.weight}
                  {entry.weightUnit}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(entry.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default WorkoutTracker;
