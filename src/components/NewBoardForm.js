import React, { useState, useRef } from "react";
import "./NewBoardForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const defaultBoardData = {
  title: "",
  owner: "",
  cards: [],
  status: true,
  selected: false,
};

const NewBoardForm = ({ onBoardUpdate }) => {
  const [boardData, setBoardData] = useState(defaultBoardData);
  const { title, owner } = boardData;
  const inputTitle = useRef();

  const onChange = (e) => {
    const { name, value } = e.target;
    setBoardData({
      ...boardData,
      [name]: value,
    });
  };

  const boardFormSubmitHandler = (e) => {
    e.preventDefault();
    onBoardUpdate(boardData);
    setBoardData(defaultBoardData);
    inputTitle.current.focus();
  };

  return (
    <div className="board-form-div">
      <Form className="new-board-form" onSubmit={boardFormSubmitHandler}>
        <h2> CREATE A NEW BOARD</h2>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            placeholder="Enter board title here"
            onChange={onChange}
            value={title}
            ref={inputTitle}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Owner</Form.Label>
          <Form.Control
            name="owner"
            placeholder="Enter board owner here"
            onChange={onChange}
            value={owner}
          />
        </Form.Group>

        <p id="preview-label">
          preview:
          <span>{`${title} by ${owner}`}</span>
        </p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default NewBoardForm;
