import React from "react";
import { Heart } from "lucide-react";

const LifeCounter: React.FC = () => {
  return (
    <div className="fixed top-5 left-5 z-[100] flex flex-row gap-1 select-none pointer-events-none">
      {[1, 2, 3].map((heartId) => (
        <div
          key={heartId}
          className="drop-shadow-[2px_2px_0px_rgba(28,34,89,0.15)]"
        >
          <Heart size={30} fill="#ff7ba4" stroke="#1c2259" strokeWidth={3} />
        </div>
      ))}
    </div>
  );
};

export default LifeCounter;
