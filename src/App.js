
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import DUMMY_DATA from "../src/data/boards.json"
import NewBoardForm from './components/NewBoardForm';
import BoardsList from "./components/BoardsList";
import CardsForSelectedBoard from "./components/CardsForSelectedBoard";
import CreateNewCard from './components/CreateNewCard';

const kBaseUrl = "http://127.0.0.1:5000";

const transformCardResponse = (card) => {
  const {
    id,
    message,
    likes_count: likesCount,
    board_id: boardId,
    status,
  } = card;
  return { id, message, likesCount, boardId, status };
}

const INIT_DATA = DUMMY_DATA.map(board => {
  const reformedCards = board.cards.map(card=> transformCardResponse(card))
  return {...board, cards:reformedCards}
})

const getAllBoards = () => {
  return axios
    .get(`${kBaseUrl}/boards`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return INIT_DATA //this will be deleted after connecting with Back-end
    });
};

const getCardsForSelectedBoard = (id) => {
  return axios
    .get(`${kBaseUrl}/boards/${id}/cards`)
    .then((response) => {
      return response.data.map(transformCardResponse);
    })
    .catch((error) => {
      console.log(error);
    });
};

function App() {
  const [cardData, setCardData] = useState([]);
  const [boardsList, setBoardList] = useState(INIT_DATA);

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

  const fetchBoards = () => {
    getAllBoards().then((boards) => {
      setBoardList(boards);
    });
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchCards = (id) => {
    getCardsForSelectedBoard(id).then((cards) => {
    setCardData(cards);      
    })
  }
  

  const handleUpdatedBoard = (newBoard) => {
    // POST 

    const requestBody = {
      ...newBoard,
      cards: [],
      status: true,
      selected: false,
    };

    console.log(requestBody);
    axios
      .post(`${kBaseUrl}/boards`,
      {
        title: requestBody.title,
        owner: requestBody.owner,
        status: true,
        selected: false,
        cards: [],
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    const newBoardsList = [...boardsList]
    newBoardsList.push({...newBoard, id:boardsList.length + 1})
    setBoardList(newBoardsList);
  }
  
  const onUpdateLike = (updatedCard) => {
    const updatedBoards = boardsList.map(board => {
        const updatedCards = board.cards.map((card) => {
          if ((card.id === updatedCard.id) && (card.boardId === updatedCard.boardId)){
            return updatedCard;
          } else {
            return card;
          }
        })
        const updatedBoard = {...board, cards:updatedCards}
        return updatedBoard;
      })
    setBoardList(updatedBoards);
  };

  const onRemove = (updatedCard) => {
    const updatedBoards = boardsList.map(board => {
      const cards = board.cards.map((card) => {
        if ((card.id === updatedCard.id) && (card.boardId === updatedCard.boardId)) {
          return updatedCard;
        } else {
          return card;
        }
      });
      const updatedBoard = {...board, cards:cards}
      return updatedBoard;
    })
  setBoardList(updatedBoards);
  };

  let selectedBoard;
  
  const HandleSelectedBoard = (id) => {
    const updatedBoards = boardsList.map((board)=> { 
      const updatedBoard = {...board}
      if (board.id === id) {
        updatedBoard.selected = true;
        selectedBoard = board;
      } else {
        updatedBoard.selected = false;
      }
      return updatedBoard;
    })
    setBoardList(updatedBoards);
    fetchCards(id);
  }
    
  for(const board of boardsList){ 
    if (board.selected) {
      selectedBoard = board;
    }
  }

  const handleUpdatedCard = (newCard) => {
    console.log(newCard);
    
    if (!selectedBoard) {
      console.log('No board selected');
      return;
    }
    
    const requestBody = {
      ...newCard,
      board_id: selectedBoard.id,
      status: true,
    };
  
    console.log(requestBody);
    axios
      .post(`${kBaseUrl}/boards/${requestBody.board_id}/cards`,
      {
        message: requestBody.message,
        board_id: requestBody.board_id,
        status: true,
      })
      .then((response) => {
        console.log(requestBody);
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
              cardData={selectedBoard? selectedBoard.cards:[]}
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
