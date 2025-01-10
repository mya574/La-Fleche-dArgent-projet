import React from 'react';
import Card from '../components/Card';  
import './Avis.css';

const Avis = () => {
  // Exemple de données d'avis
  const reviews = [
    { firstName: 'Alice', lastName: 'Dupont', comment: 'J’ai eu une expérience incroyable au salon. Le massage était absolument parfait, et l’environnement était tellement relaxant. Je me suis senti complètement détendu après une heure de soin. Je recommande vivement à tous ceux qui cherchent un moment de tranquillité et de bien-être. Bravo à toute l’équipe!' },
    { firstName: 'Bob', lastName: 'Martin', comment: 'Un service exceptionnel. Le massage aux huiles essentielles a été exactement ce dont javais besoin après une longue semaine de travail. L’atmosphère était calme, apaisante et très professionnelle. Je reviendrai certainement pour un autre massage relaxant.' },
    { firstName: 'Charlie', lastName: 'Durand', comment: 'Ce fut une expérience inoubliable. Le personnel était très accueillant, le cadre était magnifique et le massage relaxant était parfait. Je n’ai jamais eu un soin aussi agréable, et j’ai hâte d’y retourner pour découvrir d’autres services. Très satisfait de ma visite!' },
    { firstName: 'David', lastName: 'Lemoine', comment: 'Le massage tonique a été un vrai coup de fouet pour mon corps. Après une semaine stressante, c’était exactement ce dont j’avais besoin. Le personnel était très attentionné, et je me suis senti totalement revitalisé après mon soin. Je recommande vivement ce salon.' },
    { firstName: 'Eva', lastName: 'Bernard', comment: 'Un massage absolument divin! Le cadre est impeccable et l’ambiance est sereine. Le masseur était extrêmement compétent et m’a aidé à dénouer toutes les tensions dans mon dos. Je reviendrai sans hésiter et je conseille vivement cet endroit à tous mes amis!' },
    { firstName: 'Fiona', lastName: 'Lefevre', comment: 'Quelle expérience magnifique! Le massage aux pierres chaudes a été une véritable révélation. La chaleur des pierres et la technique appliquée m’ont permis de me relaxer profondément. L’environnement était tellement apaisant que je n’ai presque pas voulu partir. Un endroit à ne pas manquer!' }
  ];

  return (
    <div className="avis-container">
      {reviews.map((review, index) => (
        <Card 
          key={index}  // utilisation de l'index comme clé
          firstName={review.firstName} 
          lastName={review.lastName} 
          comment={review.comment} 
        />
      ))}
    </div>
  );
};

export default Avis;


