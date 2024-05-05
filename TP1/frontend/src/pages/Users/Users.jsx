// Users.js
import React, { useState } from 'react';
import './Users.css';
import AddUserForm from '../../components/AddUserForm/AddUserForm';
import UsersTable from '../../components/UsersTable/UsersTable';

function Users() {
  const [users, setUsers] = useState([]);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="Users-container">
      <h1>This page displays the users</h1>
      <AddUserForm />
      {/* <UsersTable /> */}
    </div>
  );
}

export default Users;
