import "./App.css";
import CardsForSelectedBoard from "./components/CardsForSelectedBoard";
import DUMMY_DATA from "../src/data/boards.json"
import { useState } from "react";

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
  const [cardState, setCardState] = useState(DUMMY_DATA);
  return (
    <div className="App">
      <CardsForSelectedBoard cardData={cardState[0].cards} />
    </div>
  );
}

export default App;
