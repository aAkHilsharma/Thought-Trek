import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Regsiter = () => {
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

  async function register(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      setRedirect(true);
    } else {
      alert('Registeration Failed');
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />;
  }
  return (
    <form className='register' onSubmit={register}>
      <h1>Register</h1>
      <input
        type='text'
        placeholder='Username'
        name='username'
        value={credentials.username}
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        value={credentials.password}
        onChange={handleChange}
        placeholder='Password'
      />
      <button>Register</button>
    </form>
  );
};

export default Regsiter;
