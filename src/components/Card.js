import React from "react";
import PropTypes from "prop-types";

const Card = (props) => {
  const onClickUpdateCard = () => {
    const updateCard = {
      ...props,
      likes_count: props.likesCount + 1,
    };
    props.onUpdateLike(updateCard);
  };
  const onClickRemoveCard = () => {
    const updateCard = {
      ...props,
      status: !props.status,
    };
    props.onRemove(updateCard);
  };
  return (
    <div>
      {/* display only if card status is true */}
      {props.status ? (
        <li key={props.id}>
          <div>
            <p>{props.message}</p>
            <span>
              <button onClick={onClickUpdateCard}>❤️</button>
              <p>{props.likesCount}</p>
            </span>
            <button onClick={onClickRemoveCard}>delete</button>
          </div>
        </li>
      ) : null}
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  likesCount: PropTypes.number,
  onUpdateLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Card;
