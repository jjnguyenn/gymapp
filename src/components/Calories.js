import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { doc, getDoc } from "firebase/firestore";
import db from "../Firebase";

const Calories = () => {
  const { user, isAuthenticated } = useAuth0();

  const [unit, setUnit] = useState("lbs");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(!isAuthenticated);

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [weightCalories, setWeightCalories] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [calories, setCalories] = useState(null);

  const [weightBmi, setWeightBmi] = useState("");
  const [bmi, setBmi] = useState(null);
  const [heightBmiFeet, setHeightBmiFeet] = useState("");
  const [heightBmiInches, setHeightBmiInches] = useState("");
  const [heightBmiCm, setHeightBmiCm] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      const loadSettings = async () => {
        try {
          const docRef = doc(db, "settings", user.sub);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUnit(data.unit ?? "lbs");
            setHeightUnit(data.heightUnit ?? "cm");
          }
        } catch (error) {
          console.error("Failed to load settings:", error);
        } finally {
          setIsSettingsLoaded(true);
        }
      };

      loadSettings();
    }
  }, [isAuthenticated, user]);

  const calculateCalories = () => {
    if (!age || !weightCalories || (!heightFeet && !heightCm)) return;

    const w = parseFloat(weightCalories);
    const a = parseInt(age);

    let heightInCm;
    if (heightUnit === "ft-in" && heightFeet && heightInches) {
      heightInCm =
        parseInt(heightFeet) * 30.48 + parseInt(heightInches) * 2.54;
    } else {
      heightInCm = parseFloat(heightCm);
    }

    const weightKg = unit === "kg" ? w : w * 0.453592;

    const bmr =
      gender === "male"
        ? 10 * weightKg + 6.25 * heightInCm - 5 * a + 5
        : 10 * weightKg + 6.25 * heightInCm - 5 * a - 161;

    const maintenance = bmr * parseFloat(activityLevel);
    setCalories(Math.round(maintenance));
  };

  const calculateBMI = () => {
    if (!weightBmi || (!heightBmiFeet && !heightBmiCm)) return;

    const weightKg =
      unit === "kg" ? parseFloat(weightBmi) : parseFloat(weightBmi) * 0.453592;

    let heightInMeters;
    if (heightUnit === "ft-in" && heightBmiFeet && heightBmiInches) {
      heightInMeters =
        parseInt(heightBmiFeet) * 0.3048 + parseInt(heightBmiInches) * 0.0254;
    } else {
      heightInMeters = parseFloat(heightBmiCm) / 100;
    }

    const bmiValue = weightKg / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
  };

  if (!isSettingsLoaded) {
    return <div className="text-center text-teal-600 mt-12">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
 
      <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
          Daily Calorie Needs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-teal-700 mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Years"
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="block font-medium text-teal-700 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-teal-700 mb-1">Weight ({unit})</label>
            <input
              type="number"
              value={weightCalories}
              onChange={(e) => setWeightCalories(e.target.value)}
              placeholder={`e.g. ${unit === "lbs" ? "154" : "70"}`}
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          {heightUnit === "ft-in" ? (
            <div>
              <label className="block font-medium text-teal-700 mb-1">Height (ft & in)</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="Feet"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  className="w-1/2 p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                />
                <input
                  type="number"
                  placeholder="Inches"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  className="w-1/2 p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block font-medium text-teal-700 mb-1">Height (cm)</label>
              <input
                type="number"
                placeholder="e.g. 175"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block font-medium text-teal-700 mb-1">Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="1.2">0-1 days a week</option>
              <option value="1.375">1-3 days a week</option>
              <option value="1.55">3-5 days a week</option>
              <option value="1.725">6-7 days a week</option>
              <option value="1.9">Every day</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateCalories}
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md"
        >
          Calculate Calories
        </button>

        {calories && (
          <div className="mt-6 text-xl font-semibold text-teal-700">
            {calories} Calories
          </div>
        )}
      </div>


      <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
          BMI Calculator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-teal-700 mb-1">Weight ({unit})</label>
            <input
              type="number"
              placeholder={`e.g. ${unit === "lbs" ? "154" : "70"}`}
              value={weightBmi}
              onChange={(e) => setWeightBmi(e.target.value)}
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          {heightUnit === "ft-in" ? (
            <div>
              <label className="block font-medium text-teal-700 mb-1">Height (ft & in)</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="Feet"
                  value={heightBmiFeet}
                  onChange={(e) => setHeightBmiFeet(e.target.value)}
                  className="w-1/2 p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                />
                <input
                  type="number"
                  placeholder="Inches"
                  value={heightBmiInches}
                  onChange={(e) => setHeightBmiInches(e.target.value)}
                  className="w-1/2 p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block font-medium text-teal-700 mb-1">Height (cm)</label>
              <input
                type="number"
                placeholder="e.g. 175"
                value={heightBmiCm}
                onChange={(e) => setHeightBmiCm(e.target.value)}
                className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          )}
        </div>

        <button
          onClick={calculateBMI}
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md"
        >
          Calculate BMI
        </button>

        {bmi && (
          <div className="mt-6 text-xl font-semibold text-teal-700">
            Your BMI is {bmi}.
          </div>
        )}
      </div>
    </div>
  );
};

export default Calories;
