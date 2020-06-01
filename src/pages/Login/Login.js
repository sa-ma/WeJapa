import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import Header from '../../components/Header';
import './Login.scss';

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const history = useHistory();
  const { setAuthUser } = useAuth();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const { status, data: result } = await axios.post(
        'https://wejapabackend.herokuapp.com/api/developer/login',
        values
      );
      if (status === 200) {
        setAuthUser({ info: result.data.developer, token: result.data.token });
        history.replace('/dashboard');
      } else {
        setError('User or password is invalid');
      }
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      setError('User or Password is invalid.');
    }
  };
  return (
    <div className="main">
      <Header />
      <div className="login">
        <h1 className="login__title">Log in to your account</h1>
        <form onSubmit={handleSubmit} className="login__form">
          <input
            type="email"
            name="email"
            aria-label="email"
            id="email"
            onChange={handleChange('email')}
            className="login__form__input"
            placeholder="Your Email"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            aria-label="password"
            onChange={handleChange('password')}
            className="login__form__input"
            placeholder="Your Password"
            required
          />
          <p className="login__form__error">{error && error}</p>
          <button type="submit" className="login__form__submit">
            {isSubmitting ? (
              <Loader type="Oval" color="#ffffff" height={16} width={16} />
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
