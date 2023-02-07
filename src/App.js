import { useState } from "react";
import axios from "axios";
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

  const [cardData, setCardData] = useState(DUMMY_DATA[0].cards);
  const [boardsList, setBoardList] = useState(DUMMY_DATA);

  // const updateCardData = (id) => {
  //   likeCardWithId(id).then((updatedCard) => {
  //     setCardState((oldData) => {
  //       return oldData.map((card) => {
  //         if (card.id === id) {
  //           return updatedCard;
  //         }
  //         return card;
  //       });
  //     });
  //   });
  // };
  
  
  const handleUpdatedBoard = (newBoard) => {
    // POST 
    const newBoardsList = boardsList.push({...newBoard, id:boardsList.length + 1})
    setBoardList(newBoardsList);
  }

  const onUpdateLike = (updatedCard) => {
    const cards = cardData.map((card) => {
      if (card.id === updatedCard.id) {
        return updatedCard;
      } else {
        return card;
      }
    });
    setCardData(cards);
  };

  const onRemove = (updatedCard) => {
    const cards = cardData.map((card) => {
      if (card.id === updatedCard.id) {
        return updatedCard;
      } else {
        return card;
      }
    });
    setCardData(cards);
  };

  return (
    <div className="App">
      <main>
        <BoardsList boards={boardsList}/>
          <div>
            <h3>SELECTED BOARD TITLE GOES HERE</h3>
            {/* <h3>{selectedBoard.title} created by {selectedBoard.owner} </h3>*/}
            <CardsForSelectedBoard
              cardData={cardData}
              onUpdateLike={onUpdateLike}
              onRemove={onRemove}
            />
          </div>
        <NewBoardForm onBoardUpdate={handleUpdatedBoard}/>
        </main>
      </div>
  );
}

export default App;
