import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigateTo = useNavigate();
  const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } =
    useContext(AuthContext);

  console.log("loginError from login page:", loginError);

  const handleChange = (e) => {
    updateLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(e);
      navigateTo("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white px-20 border py-5">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={loginInfo?.email}
              onChange={handleChange}
            />
            {loginError?.email && (
              <p className="text-red-500 text-xs italic">{loginError.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={loginInfo?.password}
              onChange={handleChange}
            />
            {loginError?.password && (
              <p className="text-red-500 text-xs italic">
                {loginError.password}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoginLoading}
            >
              {isLoginLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-4 grid justify-center items-center">
          {loginError && (
            <p className="text-red-500 mt-2">{loginError.message}</p>
          )}
          <span className="mt-4">
            Dont have an account?{" "}
            <span className="text-blue-500 ml-3">
              <Link to="/register">Register</Link>
            </span>{" "}
          </span>
        </div>
        <div className="bg-gray-100 px-5 py-2">
          <p>Email: mdatif@gmail.com</p>
          <p>Password: Mdatif@12345</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
