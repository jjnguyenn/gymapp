import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal"; 
import Settings from "./Settings"; 

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (!isAuthenticated) {
    return <p className="text-center mt-6 text-gray-700">Please log in to access your dashboard.</p>;
  }

  const cards = [
    {
      title: "🏋️ Workouts",
      description: "Track and log your training sessions.",
      route: "/workouts"
    },
    {
      title: "📅 Schedule",
      description: "Plan workouts and rest days on a calendar.",
      route: "/schedule"
    },
    {
      title: "🔥 Calories",
      description: "Calculate your daily calorie needs.",
      route: "/calories"
    },
    {
      title: "📈 Progress",
      description: "Visualize your fitness journey.",
      route: "/progress"
    },
    {
      title: "💪 Personal Record",
      description: "Track your PRs and milestones.",
      route: "/personal-record"
    },
    {
      title: "⚙️ Settings",
      description: "Adjust your preferences and units.",
      route: null, 
      onClick: () => setIsSettingsOpen(true)
    }
  ];

  return (
    <section className="max-w-7xl mx-auto mt-6 px-4">

      <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hey {user.name.split(" ")[0]} 👋</h1>
          <p className="text-sm text-teal-100">Welcome back! Ready to hit your goals today?</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <img
            src={user.picture}
            alt="User avatar"
            className="w-20 h-20 rounded-full border-2 border-white shadow"
          />
          <div>
            <p className="text-sm">📧 {user.email}</p>
          </div>
        </div>
      </div>


      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-5 rounded-md shadow hover:shadow-lg transition cursor-pointer border dark:border-gray-700"
            onClick={() => item.route ? navigate(item.route) : item.onClick?.()}
          >
            <h3 className="text-teal-600 font-semibold text-lg mb-1">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>


      <div className="mt-10 text-center text-gray-500 text-sm italic">
        “You better be grinding”
      </div>

      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <Settings />
      </Modal>
    </section>
  );
};

export default UserProfile;
