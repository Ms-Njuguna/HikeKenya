import React, { useState } from 'react';

// handles user signup functionality.
const SignupForm = () => {
  // State variables to store user inputs.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 

  // Handles the form submission event.
  const handleSubmit = (event) => {
    event.preventDefault(); 

    // Call a function to "register" the user
    registerUser(name, email, password);
  }

  // A function to simulate an API call for registering a user
  const registerUser = (userName, userEmail, userPassword) => {
    // Simulating an API call with a setTimeout
    setTimeout(() => {
      // Assuming any email not already 'name@example.com' is considered new
      if (userEmail !== 'name@example.com') {
        // If registration is successful
        setMessage('Signup successful! You can now log in.');
      } else {
        // If email is already taken (for demonstration)
        setMessage('Email is already taken. Choose another one.');
      }
    }, 1000); // Simulates a delay of 1 second
  }

  // Component renders a form for user signup
  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      {message && <p>{message}</p>} {/* Displays messages to the user */}
      <input 
        type="text" 
        placeholder="Name" 
        value={name}
        onChange={(e) => setName(e.target.value)} // Updates the name state
        required 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Updates the email state
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Updates the password state
        required 
      />
      <button type="submit">Signup</button> {/* Triggers form submission */}
    </form>
  );
}

export default SignupForm;
