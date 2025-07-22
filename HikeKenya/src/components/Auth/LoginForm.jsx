import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

  // handle user login inputs and authenticate them.

const LoginForm = () => {
  // Access the login function from the AuthContext to change authentication state.
  const { login } = useContext(AuthContext);

  // State for handling email, password inputs, and error messages.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // form submission to authenticate user.
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    // check user credentials
    try {
      const isValidUser = await verifyCredentials(email, password);
      if (isValidUser) {
        login(); 
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login attempt failed:', error);
      setError('An error occurred during login.');
    }
  };

  // A mock function to simulate a server check for the credentials.
  const verifyCredentials = (inputEmail, inputPassword) => {
    return new Promise((resolve) => {
      // Simulate some delay to mimic a real server call
      setTimeout(() => {
        
        if (inputEmail === 'name@example.com' && inputPassword === 'password') {
          resolve(true);
        } else {
          resolve(false); 
        }
      }, 1000); // Wait for 1 second to mimic server processing time
    });
  };

  // The component returns JSX to render the login form
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Sets email to state on change
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Sets password to state on change
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
