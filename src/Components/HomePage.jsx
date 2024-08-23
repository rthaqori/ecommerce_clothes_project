import React, { useState } from "react";
import { useAuth } from "./Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const { logout, emailVerification, currentUser } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  function handleVerification() {
    setMessage("");

    if (emailVerification) {
      setMessage("Email is already verified");
      return;
    } else {
      emailVerification()
        .then(() => {
          setMessage("Email verified successfully");
        })
        .catch((error) => {
          setMessage("Error sending verification email");
        });
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <h1>Dashboard</h1>
      <p className="flex flex-col gap-4">
        Logged in as <strong>{currentUser.email}</strong>
        <Link className="border" to="/updateProfile">
          Update Profile
        </Link>
        <div>
          {message && <p>{message}</p>}
          <button className="mb-4 border" onClick={handleVerification}>
            Send Verificaton Email
          </button>
        </div>
      </p>
      <div>
        <button className="mb-4 border" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default HomePage;
