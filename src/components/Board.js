import './Board.css'
const Board = ({id, title, owner, status, cards, selected, onSelect}) => {
    const selectBoardHandler = () => {
        onSelect(id);
    }
    return (          
        <button className="board-title" onClick={selectBoardHandler}>{title}</button>
    );
};

export default Board;