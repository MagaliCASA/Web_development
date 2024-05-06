import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login'; // Importez la page de connexion
import Register from './pages/Register/Register'; // Importez la page de création de compte
import './App.css';
import { Root } from './components/Root/Root';
import MovieDetail from './pages/MovieDetail/MovieDetail';

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} /> {/* Ajoutez la route vers la page de connexion */}
        <Route path="register" element={<Register />} /> {/* Ajoutez la route vers la page de création de compte */}
        <Route path="movie_detail/:movieId/:movieId2" element={<MovieDetail />} />
      </Routes>
    </Root>
  );
}

export default App;
