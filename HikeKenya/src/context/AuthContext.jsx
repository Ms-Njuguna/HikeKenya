import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [error, setError] = useState(null);
  const isAuthenticated = !!user;

  const login = async (email, password) => {
    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}`);
      const data = await res.json();

      if (data.length === 0 || data[0].password !== password) {
        setError("Invalid email or password.");
        return;
      }

      setUser(data[0]);
      localStorage.setItem("user", JSON.stringify(data[0])); // ✅ Save user
      setError(null);
    } catch (err) {
      setError("Something went wrong during login.");
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}`);
      const existing = await res.json();

      if (existing.length > 0) {
        setError("Email already registered.");
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name: email.split("@")[0],
        email,
        password,
        joinedTrails: [],
        badges: [],
        points: 0,
        payments: [],
        favorites: [],
      };

      const postRes = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!postRes.ok) throw new Error("Failed to sign up");

      const createdUser = await postRes.json();
      setUser(createdUser);
      localStorage.setItem("user", JSON.stringify(createdUser)); // ✅ Save user
      setError(null);
    } catch (err) {
      setError("Something went wrong during sign up.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // ✅ Clear localStorage on logout
  };

  return (
    <AuthContext.Provider value={{ user, setUser, error, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
