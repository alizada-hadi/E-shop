import React from "react";
import { ImStarHalf, ImStarFull, ImStarEmpty } from "react-icons/im";
function Rating({ value, text, color }) {
  return (
    <div className="rating">
      <span style={{ color: color }}>
        {value >= 1 ? (
          <ImStarFull />
        ) : value >= 0.5 ? (
          <ImStarHalf />
        ) : (
          <ImStarEmpty />
        )}
        {value >= 2 ? (
          <ImStarFull />
        ) : value >= 1.5 ? (
          <ImStarHalf />
        ) : (
          <ImStarEmpty />
        )}
        {value >= 3 ? (
          <ImStarFull />
        ) : value >= 2.5 ? (
          <ImStarHalf />
        ) : (
          <ImStarEmpty />
        )}
        {value >= 4 ? (
          <ImStarFull />
        ) : value >= 3.5 ? (
          <ImStarHalf />
        ) : (
          <ImStarEmpty />
        )}
        {value >= 5 ? (
          <ImStarFull />
        ) : value >= 4.5 ? (
          <ImStarHalf />
        ) : (
          <ImStarEmpty />
        )}
      </span>

      <span>{text}</span>
    </div>
  );
}

export default Rating;
