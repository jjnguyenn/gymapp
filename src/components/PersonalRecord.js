import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc
} from "firebase/firestore";
import db from "../Firebase";

function PersonalRecord() {
  const { user, isAuthenticated } = useAuth0();
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [records, setRecords] = useState([]);

  // Load saved records when the user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadRecords();
    }
  }, [isAuthenticated, user]);

  const loadRecords = async () => {
    const recordsRef = collection(db, "personal_records");
    const q = query(recordsRef, where("userId", "==", user.sub), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    const fetchedRecords = [];
    querySnapshot.forEach((doc) => {
      fetchedRecords.push({ id: doc.id, ...doc.data() });
    });

    setRecords(fetchedRecords);
  };

  // Save a new record to Firestore
  const saveRecord = async () => {
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, "personal_records"), {
        userId: user.sub,
        exercise,
        weight,
        reps,
        timestamp: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);

      setExercise("");
      setWeight("");
      setReps("");

      setRecords((prev) => [
        { id: docRef.id, exercise, weight, reps, timestamp: new Date() },
        ...prev,
      ]);
    } catch (error) {
      console.error("Error saving record:", error);
      alert("Error saving record.");
    }
  };

  // Delete all records for the user
  const clearAllRecords = async () => {
    const confirmClear = window.confirm("Are you sure you want to delete all personal records?");
    if (!confirmClear || !user) return;

    try {
      const q = query(collection(db, "personal_records"), where("userId", "==", user.sub));
      const querySnapshot = await getDocs(q);

      const deletePromises = querySnapshot.docs.map((recordDoc) => deleteDoc(doc(db, "personal_records", recordDoc.id)));
      await Promise.all(deletePromises);

      setRecords([]);
    } catch (error) {
      console.error("Error deleting records:", error);
      alert("Error deleting records.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-teal-600">Personal Record</h2>

      {/* Record Form */}
      <div className="space-y-4">
        <div>
          <label className="text-teal-700 block mb-1">Exercise</label>
          <input
            type="text"
            value={exercise}
            onChange={(e) => {
              const input = e.target.value;
              if (/^[a-zA-Z\s]*$/.test(input)) {
                setExercise(input);
              }
            }}
            className="w-full border rounded p-2"
            placeholder="e.g., Bench Press"
          />
        </div>

        <div>
          <label className="text-teal-700 block mb-1">Weight (lbs or kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="e.g., 150"
          />
        </div>

        <div>
          <label className="text-teal-700 block mb-1">Reps</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="e.g., 12"
          />
        </div>

        <button
          onClick={saveRecord}
          className="w-full bg-teal-600 text-white p-2 rounded"
        >
          Save Record
        </button>
      </div>

      {/* Saved Records */}
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-teal-600">Saved Records</h3>
          {records.length > 0 && (
            <button
              onClick={clearAllRecords}
              className="text-sm text-red-500 hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-4 mt-4">
          {records.length > 0 ? (
            records.map((record) => (
              <div
                key={record.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <div className="text-teal-700 font-semibold">{record.exercise}</div>
                <div className="text-teal-500">
                  Weight: {record.weight} | Reps: {record.reps}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(record.timestamp?.seconds ? record.timestamp.seconds * 1000 : record.timestamp).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <p>No records found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalRecord;
