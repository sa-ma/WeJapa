import React, { useState } from 'react';
import { useAuth } from '../../context/auth';
import Sidebar from '../../components/Sidebar';
import './Profile.scss';

const Profile = () => {
  const {
    authUser: { info },
  } = useAuth();

  const [values, setValues] = useState({
    name: info.name,
    email: info.email,
    phone: info.phone,
    portfolio: info.github,
    stackoverflow: info.stackoverflow,
    resume: info.resume.replace(/(\r\n|\n|\r)/gm, ''),
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className="profile">
      <Sidebar />
      <div className="profile__content">
        <h1 className="profile__content__title">Your Profile</h1>
        <form className="profile__content__form">
          <input
            type="text"
            name="name"
            value={values.name}
            aria-label="name"
            id="name"
            onChange={handleChange('name')}
            className="profile__content__form__input"
            placeholder="Your name"
            required
            disabled
          />
          <input
            type="email"
            name="email"
            value={values.email}
            aria-label="email"
            id="email"
            onChange={handleChange('email')}
            className="profile__content__form__input"
            placeholder="Your email"
            required
            disabled
          />
          <input
            type="text"
            name="phone"
            value={values.phone}
            aria-label="phone"
            id="phone"
            onChange={handleChange('name')}
            className="profile__content__form__input"
            placeholder="Your phone"
            required
            disabled
          />

          <input
            type="text"
            name="portfolio"
            value={values.portfolio}
            aria-label="portfolio"
            id="portfolio"
            onChange={handleChange('portfolio')}
            className="profile__content__form__input"
            placeholder="Your portfolio/github profile"
            required
            disabled
          />

          <input
            type="text"
            name="stackoverflow"
            value={values.stackoverflow}
            aria-label="stackoverflow"
            id="stackoverflow"
            onChange={handleChange('stackoverflow')}
            className="profile__content__form__input"
            placeholder="Your stackoverflow profile"
            disabled
          />

          <input
            type="text"
            name="resume"
            value={values.resume}
            aria-label="resume"
            id="resume"
            onChange={handleChange('resume')}
            className="profile__content__form__input"
            placeholder="Your resume link"
            required
            disabled
          />
          <button
            type="button"
            className="profile__content__form__submit"
            disabled
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
