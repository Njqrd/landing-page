import React from 'react';
import PixelCard from '../bits/Components/PixelCard/PixelCard';
import './PixelCardCarousel.css';

const DUMMY_CARDS = [
  { title: 'Feature One', description: 'Description for feature one' },
  { title: 'Feature Two', description: 'Description for feature two' },
  { title: 'Feature Three', description: 'Description for feature three' },
  { title: 'Feature Four', description: 'Description for feature four' },
  { title: 'Feature Five', description: 'Description for feature five' },
];

const PixelCardCarousel: React.FC = () => {
  return (
    <div className="pixel-card-carousel">
      <div className="pixel-card-carousel__track">
        {DUMMY_CARDS.map((card, index) => (
          <PixelCard key={index}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </PixelCard>
        ))}
      </div>
    </div>
  );
};

export default PixelCardCarousel;
