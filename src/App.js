import { useState } from "react";
import './App.css';
import DUMMY_DATA from "../src/data/boards.json"
import NewBoardForm from './components/NewBoardForm';
import BoardsList from "./components/BoardsList";
import CardsForSelectedBoard from "./components/CardsForSelectedBoard";

const transformResponse = (card) => {
  const {
    id,
    status,
    message,
    likes_count: likesCount,
    board_id: boardId,
  } = card;
  return { id, status, message, likesCount, boardId };
};


function App() {
  const [cardState, setCardState] = useState(DUMMY_DATA[0].cards);
  const [boardsList, setBoardList] = useState(DUMMY_DATA)

  const handleUpdatedBoard = (newBoard) => {
    // POST 
    const newBoardsList = boardsList.push({...newBoard, id:boardsList.length + 1})
    setBoardList(newBoardsList);
  }
  return (

    <div>
      <main>
      <BoardsList boards={boardsList}/>
      <CardsForSelectedBoard cardData={cardState[0].cards} />
      <NewBoardForm onBoardUpdate={handleUpdatedBoard}/>
      
      </main>

    </div>
  );
}

export default App;
