import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="px-6 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700"
    >
      Log In
    </button>
  );
};

export default LoginButton;
