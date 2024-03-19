import logo from './logo.svg';
import './Home.css';
import React, { useEffect, useState } from 'react';

function Home() {
  const [movieName, setmovieName] = useState("");

  useEffect(()=>{

  }, [movieName])
  
  return (
    <div className="App">
      <header className="App-header">
        <label>
        Recherche de films : 
          <input type="text" Name="film" value={movieName} onChange={(event) =>
          setmovieName(event.target.value)}/>
        </label>
        <input type="submit" value="Submit" />

        <h3>Résultats de la recherche</h3>
        <p>
          {movieName}
        </p>
        <h1>Recommendations de films</h1>
        <p>
          1. Insaisissables
        </p>
        <p>
          2. Indiana Jones
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
