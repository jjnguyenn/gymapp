import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Settings from "./Settings";

const UserProfile = () => {
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (isLoading) {
    return <div className="text-center mt-10 text-gray-500"></div>;
  }

  const firstName = user?.name?.split(" ")[0] || null;

  const cards = [
    {
      title: "🏋️ Workouts",
      description: "Track and log your training sessions.",
      route: "/workouts",
    },
    {
      title: "📅 Schedule",
      description: "Plan workouts and rest days on a calendar.",
      route: "/schedule",
    },
    {
      title: "🔥 Calories",
      description: "Calculate your daily calorie needs.",
      route: "/calories",
    },
    {
      title: "📈 Progress",
      description: "Visualize your fitness journey.",
      route: "/progress",
    },
    {
      title: "💪 Personal Record",
      description: "Track your PRs and milestones.",
      route: "/personal-record",
    },
    {
      title: "⚙️ Settings",
      description: isAuthenticated
        ? "Adjust your preferences and units."
        : "Preferences are stored locally unless logged in.",
      route: null,
      onClick: () => setIsSettingsOpen(true),
    },
  ];

  return (
    <section className="max-w-7xl mx-auto mt-6 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {isAuthenticated
              ? `Hey ${firstName} 👋`
              : "Welcome to Gym Buddy 💪"}
          </h1>
          <p className="text-sm text-teal-100">
            {isAuthenticated
              ? "Welcome back! Ready to hit your goals today?"
              : "Your preferences will be stored locally. Log in to sync across devices."}
          </p>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {user?.picture && (
              <img
                src={user.picture}
                alt="User avatar"
                className="w-20 h-20 rounded-full border-2 border-white shadow"
              />
            )}
            <div>
              <p className="text-sm">📧 {user?.email}</p>
            </div>
          </div>
        ) : (
          <button
            onClick={loginWithRedirect}
            className="mt-4 md:mt-0 bg-white text-teal-700 font-semibold px-5 py-2 rounded shadow hover:bg-teal-100 transition"
          >
            Log In to Save Progress
          </button>
        )}
      </div>

      {/* Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-5 rounded-md shadow hover:shadow-lg transition cursor-pointer border dark:border-gray-700"
            onClick={() => {
              if (item.route) {
                navigate(item.route);
              } else {
                item.onClick?.();
              }
            }}
          >
            <h3 className="text-teal-600 font-semibold text-lg mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="mt-10 text-center text-gray-500 text-sm italic">
        “You better be grinding”
      </div>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <Settings />
      </Modal>
    </section>
  );
};

export default UserProfile;
