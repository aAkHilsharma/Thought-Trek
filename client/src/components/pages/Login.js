import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [redirect, setRedirect] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function login(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    } else {
      alert('Wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }
  return (
    <form className='login' onSubmit={login}>
      <h1>Login</h1>
      <input
        type='text'
        name='username'
        value={credentials.username}
        onChange={handleChange}
        placeholder='username'
      />
      <input
        type='password'
        name='password'
        value={credentials.password}
        onChange={handleChange}
        placeholder='password'
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
