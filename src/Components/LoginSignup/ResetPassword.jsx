import React, { useRef, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password.");
    }
    setLoading(false);
  }

  return (
    <div className="flex">
      <h1>Password Reset</h1>
      <form>
        <input ref={emailRef} type="email" placeholder="Enter your email" />
        <button disabled={loading} onClick={handleSubmit} type="submit">
          Reset
        </button>
        <Link to="/login">login</Link>
        <p>
          {error}
          {message}
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
