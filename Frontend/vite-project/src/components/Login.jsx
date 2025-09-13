import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login({ settoken }) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

 const handellogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/user/login', { email, password });
    const token = res?.data?.token;
    if (token) {
      localStorage.setItem('token', token);
      settoken(token);
      alert('Login successful');
      setemail('');
      setpassword('');
      navigate('/');
    } else {
      alert('Login failed: ' + (res?.data || 'Invalid credentials'));
    }
  } catch (err) {
    alert('Login failed: ' + (err.response?.data || err.message));
  }
};


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handellogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
      <div style={{ position: 'relative' }}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setpassword(e.target.value)}
    required
    style={{ paddingRight: '30px' }}
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '14px',
      userSelect: 'none'
    }}
  >
    {showPassword ? '🙈' : '👁️'}
  </span>
  {/* <input type="password" placeholder='password' onChange={(e)=> setpassword(e.target.value)} /> */}
</div>
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
}

export default Login;
