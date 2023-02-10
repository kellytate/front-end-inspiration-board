import { Button } from "react-bootstrap";
import "./Boards.css";

const Board = ({ id, title, owner, status, cards, selected, onSelect }) => {
  const selectBoardHandler = () => {
    onSelect(id);
  };
  return (
    <div className="div-boardlist">
      <Button variant="secondary" onClick={selectBoardHandler}>
        {title}
      </Button>
    </div>
  );
};

export default Board;
