import React, { useRef, useState } from "react";
import { useAuth } from "./Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { updateEmail, updatePassword, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex flex-col gap-3 justify-center">
      <h1>UpdateProfile</h1>
      <form className="flex flex-col gap-2 w-96">
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter your email"
          defaultValue={currentUser.email}
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter your new password"
        />
        <input
          ref={passwordConfirmRef}
          type="password"
          placeholder="Confirm your password"
        />
        <button disabled={loading} onClick={handleSubmit} type="submit">
          update
        </button>
        <p>{error}</p>
      </form>
      <p>
        <Link to="/">cancel</Link>
      </p>
    </div>
  );
};

export default UpdateProfile;
