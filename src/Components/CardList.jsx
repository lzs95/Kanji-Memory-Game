import React, { useState, useEffect } from "react";

const CardList = ({ cards, cardClickHandler }) => {
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    setShowCards(true);
  }, [cards]);

  return(
    <div className="card-display">
      {showCards && cards.map((card, index) => {
        return (
          <ul
            className={`card${card.flipped ? "-front" : "-flipped"}`}
            key={index}
            onClick={() => cardClickHandler(card)}
          >
            {card.name}
          </ul>
        )})
      }
    </div>
  );
};       

export default CardList;
