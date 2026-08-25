import React from "react";
import "./Card.css";

const defaultCardList = [
  { index: 0, colorCard: "142, 249, 252" },
  { index: 1, colorCard: "142, 252, 204" },
  { index: 2, colorCard: "142, 252, 157" },
  { index: 3, colorCard: "215, 252, 142" },
  { index: 4, colorCard: "252, 252, 142" },
  { index: 5, colorCard: "252, 208, 142" },
  { index: 6, colorCard: "252, 142, 142" },
  { index: 7, colorCard: "252, 142, 239" },
  { index: 8, colorCard: "204, 142, 252" },
  { index: 9, colorCard: "142, 202, 252" },
];

export const Card = ({ cardList = defaultCardList, quantity = 10 }) => {
  return (
    <div className="rotating-card-wrapper">
      <div className="rotating-card-inner" style={{ "--quantity": quantity }}>
        {cardList.map((card, idx) => (
          <div
            key={idx}
            className="rotating-card-item"
            style={{
              "--index": card.index ?? idx,
              "--colorCard": card.colorCard || "142, 249, 252",
            }}
          >
            {card.image ? (
              <img
                src={card.image}
                alt={card.title || "Card"}
                className="rotating-card-img"
              />
            ) : (
              <div className="rotating-card-img" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
