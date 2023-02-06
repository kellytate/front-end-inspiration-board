import "./App.css";
import CardsForSelectedBoard from "./components/CardsForSelectedBoard";
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
  const [cardState, setCardState] = useState([]);
  return (
    <div className="App">
      <CardsForSelectedBoard cardData={cardState} />
    </div>
  );
}

export default App;
