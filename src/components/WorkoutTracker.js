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

  useEffect(() => {
    const fetchWorkoutLog = async () => {
      if (!isAuthenticated || !user) return;

      setLoading(true);
      try {
        const q = query(collection(db, "workouts"), where("userId", "==", user.sub), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedWorkouts = querySnapshot.docs.map((doc) => doc.data());
        setWorkoutLog(fetchedWorkouts);
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

    const finalExercise = exercise === "Other" ? customExercise.trim() : exercise;

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
        setWorkoutLog((prev) => [...prev, workoutData]);
      } catch (error) {
        console.error("Error saving workout:", error);
        alert("There was an error saving your workout. Please try again.");
      }
    }

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
    const confirmClear = window.confirm("Are you sure you want to delete all workout logs?");
    if (!confirmClear || !user) return;

    try {
      const q = query(collection(db, "workouts"), where("userId", "==", user.sub));
      const querySnapshot = await getDocs(q);

      const deletePromises = querySnapshot.docs.map((workoutDoc) => deleteDoc(doc(db, "workouts", workoutDoc.id)));
      await Promise.all(deletePromises);

      setWorkoutLog([]);
    } catch (error) {
      console.error("Error deleting workout logs:", error);
      alert("Error deleting workout logs.");
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">Checking authentication...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-lg p-6 transition-all">
        {!isAuthenticated && (
          <p className="text-yellow-600 mb-4 font-semibold text-center">
            You are not logged in. Workouts will not be saved after you close this tab.
          </p>
        )}

        <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">Workout Logger</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="exercise" className="block font-medium text-teal-600 mb-1">Exercise</label>
            <select
              id="exercise"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              required
            >
              <option value="" disabled>Select an exercise...</option>
              <option value="Bench">Bench</option>
              <option value="Squat">Squat</option>
              <option value="Deadlift">Deadlift</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {exercise === "Other" && (
            <div>
              <label htmlFor="customExercise" className="block font-medium text-teal-600 mb-1">Custom Exercise</label>
              <input
                id="customExercise"
                type="text"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                value={customExercise}
                onChange={(e) => setCustomExercise(e.target.value)}
                placeholder="Enter exercise name"
                required
              />
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="sets" className="block font-medium text-teal-600 mb-1">Sets</label>
              <input
                id="sets"
                type="number"
                min="1"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="reps" className="block font-medium text-teal-600 mb-1">Reps</label>
              <input
                id="reps"
                type="number"
                min="1"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="weight" className="block font-medium text-teal-600 mb-1">Weight ({weightUnit})</label>
              <input
                id="weight"
                type="number"
                min="1"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
          >
            Save Workout
          </button>
        </form>

        <button
          onClick={handleReset}
          className="w-full mt-4 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md transition-all"
        >
          Reset
        </button>

        {workoutLog.length > 0 && (
          <button
            onClick={handleClearAll}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
          >
            Clear All Logs
          </button>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-teal-600 mb-4">Workout Log</h3>
        {loading ? (
          <p className="text-center text-teal-600">Loading...</p>
        ) : workoutLog.length === 0 ? (
          <p className="text-gray-500">No workouts logged yet!</p>
        ) : (
          <ul className="space-y-4">
            {workoutLog.map((entry, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="text-teal-700 font-semibold">{entry.exercise}</p>
                <p className="text-teal-500">Sets: {entry.sets} | Reps: {entry.reps}</p>
                <p className="text-teal-500">Weight: {entry.weight} {entry.weightUnit}</p>
                <p className="text-sm text-gray-500 mt-1">
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
