import React, { useState, useEffect } from 'react';
import './Login.css';
import backgroundImage from './ocean-transformed.jpeg';
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
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover', // Taille de l'image automatique
      // backgroundRepeat: 'repeat', // Répéter l'image
      backgroundPosition: 'center',
      minHeight: '100vh',
      color: 'black'
    }}>
      <div className="Users-container">
        <div className="form-section">
          <h1>Se connecter</h1>
          <ConnectUserForm />
        </div>
        <div className="connected-user-section"> 
          <p style={{color: 'black'}}>Pas de compte ? <a href="../Register" className="login-link-text">Inscrivez-vous !</a></p>
        </div>

      </div>
    </div>
  );
}

export default Users;
