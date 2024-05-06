import { useState } from 'react';
import axios from 'axios';
import './ConnectUserForm.css';

const DEFAULT_FORM_VALUES = {
  email: '',
  password: '',
};

const useConnectUser = () => {
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);

  const connectUser = (event, formValues, setFormValues) => {
    event.preventDefault();

    setLoginError(null);
    if (formValues.email === '' || formValues.password === '') {
      console.error('Email and password are required fields');
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/users/login`, formValues)
      .then((response) => {
        const token = response.data.token;
        const name = response.data.name;
        console.log("name : ", name);
        localStorage.setItem("user", JSON.stringify({ name, token })); // Stockage du token JWT dans le local storage

        console.log(token);
        setLoginSuccess('User logged in successfully');
        setTimeout(() => {
          setLoginSuccess(null);
        }, 3000);
        setFormValues(DEFAULT_FORM_VALUES);
      })
      .catch((error) => {
        setLoginError('An error occurred while logging in.');
        console.error(error);
      });
  };

  return { connectUser, loginError, loginSuccess };
};

function ConnectUserForm() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const { connectUser, loginError, loginSuccess } = useConnectUser();

  return (
    <div>
      <form
        className="connect-user-form"
        onSubmit={(event) => connectUser(event, formValues, setFormValues)}
      >
        <input
          className="connect-user-input"
          type="email"
          placeholder="Mail"
          value={formValues.email}
          onChange={(event) =>
            setFormValues({ ...formValues, email: event.target.value })
          }
        />
        <input
          className="connect-user-input"
          type="password"
          placeholder="Mot de passe"
          value={formValues.password}
          onChange={(event) =>
            setFormValues({ ...formValues, password: event.target.value })
          }
        />
        <button className="connect-user-button" type="submit">
          Se connecter
        </button>
      </form>
      {loginSuccess !== null && (
        <div className="login-success">{loginSuccess}</div>
      )}
      {loginError !== null && <div className="login-error">{loginError}</div>}
    </div>
  );
}

export default ConnectUserForm;
