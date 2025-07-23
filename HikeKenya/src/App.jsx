import React from "react";
import LoginSignup from "./components/Auth/LoginSignup.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <div>
        <LoginSignup />
      </div>
    </AuthProvider>
  );
}

export default App;

