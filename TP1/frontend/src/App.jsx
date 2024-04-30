import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';
import { Root } from './components/Root/Root';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import Movie_detail from './pages/Movie_detail/About';

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
        <Route path="Movie_detail" element={<Movie_detail />} />
      </Routes>
    </Root>
  );
}

export default App;
