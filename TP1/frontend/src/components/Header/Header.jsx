import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Page d'accueil
      </Link>
      <div>|</div>
      <div className="connect-dropdown">
        <Link className="Link" to="/login">
          Mon Compte
        </Link>
        <div className="dropdown-content">
          <Link className="dropdown-link" to="/login">
            Se connecter
          </Link>
          <Link className="dropdown-link" to="/register">
            Créer un compte
          </Link>
        </div>
      </div>
      <div>|</div>
      <Link className="Link" to="/about">
        A propos du site
      </Link>
    </div>
  );
};

export default Header;
