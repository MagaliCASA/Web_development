// Users.js
import React, { useState } from 'react';
import './Users.css';
import AddUserForm from '../../components/AddUserForm/AddUserForm';
import ConnectUserForm from '../../components/ConnectUserForm/ConnectUserForm';
import UsersTable from '../../components/UsersTable/UsersTable';
import VerifyToken from '../../components/ConnectUserForm/VerifyToken';


function Users() {
  const {loggedIn, name} = VerifyToken();
  const [users, setUsers] = useState([]);
  console.log("Name :", name);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="Users-container">
      <h1>Créer un compte</h1>
      <AddUserForm />
      <h1>Se connecter</h1>
      <ConnectUserForm />
      <h1>Nom de l'utilisateur connecté :</h1>
      <p>{name}</p>
    </div>
  );
}

export default Users;
