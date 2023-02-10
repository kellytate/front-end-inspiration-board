import React, { useState, useRef } from "react";
import "./CreateNewCard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const defaultCardData = {
  message: "",
};

const CreateNewCard = ({ onCardUpdate }) => {
  const [cardData, setCardData] = useState(defaultCardData);
  const { message } = cardData;
  const inputMessage = useRef();

  const onChange = (e) => {
    const { name, value } = e.target;
    setCardData({
      ...cardData,
      [name]: value,
    });
  };

  const cardFormSubmitHandler = (e) => {
    e.preventDefault();
    onCardUpdate(cardData);
    setCardData(defaultCardData);
    inputMessage.current.focus();
  };

  return (
    <div className="card-form-div">
      <Form className="new-card-form" onSubmit={cardFormSubmitHandler}>
        <h2> CREATE A NEW CARD</h2>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            name="message"
            placeholder="Enter message here"
            onChange={onChange}
            value={message}
            ref={inputMessage}
          />
        </Form.Group>
        <p id="preview-label">
          preview:
          <span>{`${message}`}</span>
        </p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default CreateNewCard;
