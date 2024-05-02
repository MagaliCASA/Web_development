import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';
import { Root } from './components/Root/Root';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import MovieDetail from './pages/MovieDetail/MovieDetail';;

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
        {/* Configurez une route dynamique pour Movie_detail */}
        <Route path="movie_detail/:movieId" element={<MovieDetail />} />
        {/* <Route path="movie_detail" element={<Movie_detail />} /> */}
      </Routes>
    </Root>
  );
}

export default App;
