import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/register', {
        username,
        email,
        password,
      });
      if(res.data.token){
      alert('Registration successful');
      navigate('/login');}
      else{
        alert('registration failed,may email already existing')
      }
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Create an Account</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default Register;
