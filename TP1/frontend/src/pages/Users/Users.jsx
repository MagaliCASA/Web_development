// Users.js
import React, { useState } from 'react';
import './Users.css';
import AddUserForm from '../../components/AddUserForm/AddUserForm';
import ConnectUserForm from '../../components/ConnectUserForm/ConnectUserForm';
import UsersTable from '../../components/UsersTable/UsersTable';

function Users() {
  const [users, setUsers] = useState([]);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="Users-container">
      <h1>Créer un compte</h1>
      <AddUserForm />
      {/* <UsersTable /> */}
      <h1>Se connecter</h1>
      <ConnectUserForm />
    </div>
  );
}

export default Users;
