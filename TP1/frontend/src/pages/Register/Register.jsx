import React, { useState, useEffect } from 'react';
import './Register.css';
import AddUserForm from '../../components/AddUserForm/AddUserForm';
import ConnectUserForm from '../../components/ConnectUserForm/ConnectUserForm';
import UsersTable from '../../components/UsersTable/UsersTable';
import VerifyToken from '../../components/ConnectUserForm/VerifyToken';

function Users() {
  const { loggedIn, name } = VerifyToken();
  const [users, setUsers] = useState([]);


  useEffect(() => {
    console.log("Le nom a changé :", name);
  }, [name]); // Ajoutez 'name' dans le tableau de dépendances

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="Users-container">
      <div className="form-section">
        <h1>Créer un compte</h1>
        <AddUserForm />
      </div>
      <div className="login-link">
        <div className="login-link">
          <p>Déjà un compte ? <a href="../login" className="login-link-text">Connectez-vous !</a></p>
        </div>
      </div>

    </div>
  );
}

export default Users;
