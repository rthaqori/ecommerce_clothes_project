import React, { useRef, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Signup = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);

      const auth = getAuth();
      const user = auth.currentUser;

      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        "last login": new Date(),
      });

      navigate("/admin/products");
    } catch (error) {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="w-96 p-4 md:p-0">
        <h1 className="mb-4 text-4xl font-bold">Signup</h1>
        <form className="mb-2 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex w-full gap-3">
            <input
              className="w-1/2 border-b-2 py-2 text-base transition-all focus:px-3 focus:outline-blue-400"
              ref={firstNameRef}
              type="text"
              placeholder="First Name"
              required
            />
            <input
              className="w-1/2 border-b-2 py-2 text-base transition-all focus:px-3 focus:outline-blue-400"
              ref={lastNameRef}
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
          <input
            className="border-b-2 py-2 text-base transition-all focus:px-3 focus:outline-blue-400"
            ref={emailRef}
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            className="border-b-2 py-2 text-base transition-all focus:px-3 focus:outline-blue-400"
            ref={passwordRef}
            type="password"
            placeholder="Enter your password"
            required
          />
          <input
            className="border-b-2 py-2 text-base transition-all focus:px-3 focus:outline-blue-400"
            ref={passwordConfirmRef}
            type="password"
            placeholder="Confirm your password"
            required
          />
          <button
            className="rounded-md border bg-red-500 px-3 py-2 font-semibold text-white hover:bg-red-400"
            disabled={loading}
            type="submit"
          >
            Signup
          </button>
        </form>
        {error && <p className="my-2 h-6 text-red-600 md:mb-4">{error}</p>}
        <div className="flex w-full md:justify-center">
          <p className="text-base">
            Already have an account?{" "}
            <Link className="text-red-400 hover:text-blue-600" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
