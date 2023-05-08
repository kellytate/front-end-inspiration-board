import Board from "./Board";
import "./BoardList.css";

const BoardsList = ({ boards, onSelect }) => {
  return (
    <section className="div-boardlist">
      <h2> boards </h2>
      <div className="div-boardlist">
        {boards.map((board) => {
          return (
            <Board
              key={board.id}
              id={board.id}
              title={board.title}
              owner={board.owner}
              status={board.status}
              cards={board.cards}
              selected={board.selected}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </section>
  );
};

export default BoardsList;
