import React from 'react';
import '../About.css'; // Assurez-vous d'avoir un fichier styles.css dans le même répertoire

function About() {
  return (
    <div className="about">
      <h1>À Propos</h1>
      <p>Site créé par Magali CASAMAYOU, Laura MONTAGNIER, Cyprien GAUTHIER et Vincent CHEREL.</p>
      <p>Projet réalisé pendant le cours IN211 à l'ENSTA Paris en 2024.</p>
      <p>Ce site présente une sorte d'Allo Ciné simplifié sur le thème des poissons : il recense quelques films ayant ce thème et les détaille si l'on clique dessus.</p>
    </div>
  );
}

export default About;
