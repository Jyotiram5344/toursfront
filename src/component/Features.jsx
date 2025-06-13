import React from 'react';
import { ShieldCheck, Clock, Heart, Star } from 'lucide-react'; // npm install lucide-react
import './feature.css';

const features = [
  {
    icon: <ShieldCheck size={32} />,
    title: "Secure Booking",
    desc: "Your data and payments are 100% secure"
  },
  {
    icon: <Clock size={32} />,
    title: "24/7 Support",
    desc: "Round-the-clock customer support"
  },
  {
    icon: <Heart size={32} />,
    title: "Personalized Service",
    desc: "Tailored travel experiences just for you"
  },
  {
    icon: <Star size={32} />,
    title: "Best Prices",
    desc: "Competitive rates and special deals"
  }
];

function Features() {
  return (
    <div className="features-container">
      {features.map((f, i) => (
        <div className="feature-card" key={i}>
          <div className="feature-icon">{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default Features;
