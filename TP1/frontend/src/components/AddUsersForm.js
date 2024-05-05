// AddUserForm.js
import React, { useState } from 'react';

function AddUserForm({ onAddUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérification des entrées ici avant d'ajouter l'utilisateur
    if (!name || !email) return;
    const newUser = { name, email };
    onAddUser(newUser);
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUserForm;
