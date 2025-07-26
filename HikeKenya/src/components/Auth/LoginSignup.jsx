import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  User,
  Mail,
  Lock,
  LogIn,
  LogOut,
} from "lucide-react";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user, error, login, signup, logout } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (action === "Sign Up") {
      await signup(email, password);
    } else {
      await login(email, password);
    }
  };

  useEffect(() => {
    if (user) {
      const timeout = setTimeout(() => {
        navigate("/dashboard");
      }, 3000); 
      return () => clearTimeout(timeout);
    }
  }, [user, navigate]);

  const switchTo = (mode) => {
    setAction(mode);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-white to-green-300 px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        
        <div className="flex flex-col items-center mb-6">
          <img src="https://i.pinimg.com/1200x/ea/8a/bd/ea8abd2c74d49f3979003e540c7b5ebd.jpg" alt="logo" className="h-[100px] w-[100px]"></img>
          <h1 className="text-2xl font-bold text-gray-800">{action}</h1>
          <div className="h-1 w-16 bg-green-500 rounded-full mt-2" />
        </div>

        {user ? (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="text-center flex flex-col items-center space-y-4"
  >
    <p className="text-gray-700 text-lg">Welcome, {user.email}!</p>
    
    
    <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    
    <button
      type="button"
      onClick={logout}
      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow"
    >
      <LogOut className="inline w-4 h-4 mr-1" />
      Logout
    </button>
  </motion.div>
) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {action === "Sign Up" && (
              <div className="flex items-center border rounded-xl px-3 py-2 bg-white shadow-sm">
                <User className="text-gray-500 w-4 h-4 mr-2" />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="flex-1 outline-none bg-transparent text-gray-700"
                  required
                />
              </div>
            )}

            <div className="flex items-center border rounded-xl px-3 py-2 bg-white shadow-sm">
              <Mail className="text-gray-500 w-4 h-4 mr-2" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 outline-none bg-transparent text-gray-700"
                required
              />
            </div>

            <div className="flex items-center border rounded-xl px-3 py-2 bg-white shadow-sm">
              <Lock className="text-gray-500 w-4 h-4 mr-2" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="flex-1 outline-none bg-transparent text-gray-700"
                required
              />
            </div>

            {action === "Login" && (
              <button
                type="button"
                className="text-sm text-green-700 hover:underline"
                onClick={() => alert("Redirect to reset password")}
              >
                Forgot Password?
              </button>
            )}

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl shadow transition-all duration-300"
            >
              {action}
            </button>

            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                className={`px-3 py-1 rounded-full text-sm ${
                  action === "Sign Up"
                    ? "bg-green-600 text-white"
                    : "text-gray-600 border border-gray-300"
                }`}
                onClick={() => switchTo("Sign Up")}
              >
                Sign Up Instead
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded-full text-sm ${
                  action === "Login"
                    ? "bg-green-600 text-white"
                    : "text-gray-600 border border-gray-300"
                }`}
                onClick={() => switchTo("Login")}
              >
                Login Instead
              </button>
            </div>

            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-sm text-green-700 hover:underline"
              >
                Continue without signing in
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default LoginSignup;
