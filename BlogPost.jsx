import React from 'react';
import BlogPost from './BlogPost';

function App() {
  const blogProps = {
    title: "Juego de la NBA: Nets vs. Knicks",
    content: "Los Nets se llevaron la victoria en el clásico de Nueva York contra los Knicks en un partido muy reñido.",
    score: {
      team1: "Brooklyn Nets",
      team1Score: 110,
      team2: "New York Knicks",
      team2Score: 105
    },
    imageSrc: "H.jpg" 
  };

  return (
    <div className="App">
      <BlogPost {...blogProps} />
    </div>
  );
}

export default App;
