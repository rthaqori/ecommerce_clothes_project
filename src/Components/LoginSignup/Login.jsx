import React, { useRef, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/admin/products");
    } catch {
      setError("Enter correct Email and Password.");
    }
    setLoading(false);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="md-p-0 w-96 p-4">
        <h1 className="mb-4 text-4xl font-bold">Login</h1>
        <form className="mb-2 flex flex-col gap-4">
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
          <button
            className="rounded-md border bg-red-500 px-3 py-2 font-semibold text-white hover:bg-red-400"
            disabled={loading}
            onClick={handleSubmit}
            type="submit"
          >
            Login
          </button>
        </form>
        <Link
          className="text-sm text-gray-600 hover:text-red-600"
          to="/resetPassword"
        >
          Forgot Password?
        </Link>
        {error ? <p className="my-2 h-6 text-red-600 md:mb-4">{error}</p> : ""}
        <div className="flex w-full md:justify-center">
          <p className="text-base">
            Need an account?{" "}
            <Link className="text-red-400 hover:text-blue-600" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
