import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <h1 className="about-title">À Propos</h1>
      <p>Site créé par Magali CASAMAYOU, Laura MONTAGNIER, Cyprien GAUTHIER et Vincent CHEREL.</p>
      <p>Projet réalisé pendant le cours IN211 à l'ENSTA Paris en 2024.</p>
      <p>Ce site présente des recommendations de films sur le thème des poissons : il recense quelques films ayant ce thème et les détaille si l'on clique dessus. Les fonctionnalités de tri et de recherche ont été implémentées ainsi que celles de connexion qui permettent de donner un avis et de mettre une note à un film.</p>
    </div>
  );
}

export default About;
