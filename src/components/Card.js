import React from "react";
import PropTypes from "prop-types";
import "./Card.css";
import { Card as CardComp, Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";

const Card = (props) => {
  const onClickUpdateCard = () => {
    const updateCard = {
      ...props,
      likesCount: props.likesCount + 1,
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
    <>
      {props.status ? (
        <CardComp>
          <li key={props.id}>
            <div className="content">
              <p className="message">{props.message}</p>
              <div className="card-btns">
                <Button
                  className="btn"
                  variant="light"
                  onClick={onClickUpdateCard}
                >
                  <p>❤️ {props.likesCount}</p>
                </Button>
                <Button
                  className="btn"
                  variant="light"
                  onClick={onClickRemoveCard}
                >
                  <BsFillTrashFill />
                </Button>
              </div>
            </div>
          </li>
        </CardComp>
      ) : null}
    </>
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
