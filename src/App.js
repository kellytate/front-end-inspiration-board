
import { useState } from "react";
import axios from "axios";
import './App.css';
import DUMMY_DATA from "../src/data/boards.json"
import NewBoardForm from './components/NewBoardForm';
import BoardsList from "./components/BoardsList";
import CardsForSelectedBoard from "./components/CardsForSelectedBoard";
import CreateNewCard from './components/CreateNewCard';

const kBaseUrl = "http://127.0.0.1:5000";

const transformResponse = (card) => {
  const {
    id,
    message,
    likes_count: likesCount,
    board_id: boardId,
    status,
  } = card;
  return { id, message, likesCount, boardId, status };
}


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

  const HandleSelectedBoard = (id) => {
    const updatedBoards = boardsList.map((board)=> { 
      const updatedBoard = {...board}
      if (board.id === id) {
        updatedBoard.selected = true
      } else {
        updatedBoard.selected = false
      }
      return updatedBoard;
    })
    setBoardList(updatedBoards);
  }
  
  let selectedBoard;
  for(const board of boardsList){ 
    if (board.selected) {
      selectedBoard = board;
  }}

  const handleUpdatedCard = (newCard) => {
    console.log(newCard);
    
    if (!selectedBoard) {
      console.log('No board selected');
      return;
    }
    
    const requestBody = {
      ...newCard,
      likes_count: 0,
      board_id: selectedBoard.id,
      status: true,
    };
  
    console.log(requestBody);
    return axios
      .post(`${kBaseUrl}/boards/${requestBody.board_id}/cards`,
      {
        message: requestBody.message,
        likes_count: 0,
        board_id: requestBody.board_id,
        status: true,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  
  };
  
  return (
    <div className="App">
      <main>
        <BoardsList boards={boardsList} onSelect={HandleSelectedBoard}/>
          <div>
            <h3>{!selectedBoard?'':`${selectedBoard.title}`}</h3>
            {/* <h3>{!selectedBoard?'':`${selectedBoard.title} created by ${selectedBoard.owner}`}</h3> */}
            <CardsForSelectedBoard
              cardData={cardData}
              onUpdateLike={onUpdateLike}
              onRemove={onRemove}
            />
          </div>
        <NewBoardForm onBoardUpdate={handleUpdatedBoard}/>
        <CreateNewCard onCardUpdate={handleUpdatedCard}/>
        </main>
      </div>
  );
}

export default App;
