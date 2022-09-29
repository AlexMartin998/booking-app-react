import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { bookingApi } from '../../api';
import { useAuth } from '../../hooks';
import './login.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loading, error, startLogin, loginFail, loginSuccess } = useAuth();

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleLogin = async e => {
    e.preventDefault();
    startLogin();

    try {
      const { data } = await bookingApi.post('/auth/login', credentials);
      localStorage.setItem('token', data.token);

      loginSuccess(data.user);
      navigate('/', { replace: true });
    } catch (error) {
      loginFail(error.response.data);
    }
  };

  const handleInputChange = ({ target }) => {
    setCredentials({
      ...credentials,
      [target.name]: target.value,
    });
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="email"
          name="email"
          id="eamil"
          className="lInput"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="lInput"
          onChange={handleInputChange}
        />

        <button onClick={handleLogin} disabled={loading} className="lButton">
          Login
        </button>

        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};
