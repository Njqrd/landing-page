import React from 'react';
import './PowerfulFeatures.css';
import FeatureScroll from './FeatureScroll';

const PowerfulFeatures: React.FC = () => {
  return (
    <section className="powerful-features">
      <div className="powerful-features__container">
        <h2 className="powerful-features__title">Powerful Features</h2>
        <p className="powerful-features__tagline">
          Unlock the full potential of your projects with our cutting-edge capabilities.
        </p>
        <FeatureScroll />
      </div>
    </section>
  );
};

export default PowerfulFeatures;
