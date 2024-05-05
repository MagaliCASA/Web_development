import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Page d'accueil
      </Link>
      <div>|</div>
      <Link className="Link" to="/users">
        Me connecter
      </Link>
      <div>|</div>
      <Link className="Link" to="/about">
        A propos du site
      </Link>
    </div>
  );
};

export default Header;
