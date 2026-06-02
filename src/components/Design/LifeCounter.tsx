import React from "react";
import { Heart } from "lucide-react";

const LifeCounter: React.FC = () => {
  return (
    <div className="life-counter">
      {[1, 2, 3].map((heartId) => (
        <div
          key={heartId}
          className="drop-shadow-[2px_2px_0px_rgba(28,34,89,0.15)]"
        >
          <Heart size={28} fill="#ff7ba4" stroke="#1c2259" strokeWidth={3} />
        </div>
      ))}
    </div>
  );
};

export default LifeCounter;