import React from 'react';
import Card from './Card.js';
import PropTypes from "prop-types";

const CardsForSelectedBoard = ({cardData}) => {
  const cardComponents = cardData.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        boardId={card.boardId}
        status={card.status}
        message={card.message}
        likesCount={card.likesCount}
      />
    )
  })
  return (
    <>{cardComponents}</>
  )
}

CardsForSelectedBoard.propTypes = {
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string,
      boardId: PropTypes.number,
      status: PropTypes.bool,
      likesCount: PropTypes.number,
    })
  ).isRequired,
  petCatWithId: PropTypes.func.isRequired,
};

export default CardsForSelectedBoard