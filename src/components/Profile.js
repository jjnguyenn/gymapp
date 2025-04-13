import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading profile...</div>;

  return (
    isAuthenticated && (
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 max-w-md mx-auto">
        <div className="flex items-center space-x-4">
          <img
            src={user.picture}
            alt={user.name}
            className="w-16 h-16 rounded-full border-2 border-teal-500"
            loading="lazy"  
          />
          <div>
            <h2 className="text-xl font-bold text-teal-600 dark:text-teal-300">
              {user.name}
            </h2>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
