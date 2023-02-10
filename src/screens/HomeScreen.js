import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DUMMY_DATA from "../data/boards.json";
import NewBoardForm from "../components/NewBoardForm";
import BoardsList from "../components/BoardsList";
import CardsForSelectedBoard from "../components/CardsForSelectedBoard";
import CreateNewCard from "../components/CreateNewCard";

//const kBaseUrl = process.env.REACT_APP_BACKEND_URL;
const kBaseUrl = "http://127.0.0.1:5000/";

const transformCardResponse = (card) => {
  const {
    id,
    message,
    likes_count: likesCount,
    board_id: boardId,
    status,
  } = card;
  return { id, message, likesCount, boardId, status };
};

const INIT_DATA = DUMMY_DATA.map((board) => {
  const reformedCards = board.cards.map((card) => transformCardResponse(card));
  return { ...board, cards: reformedCards };
});

const getAllBoards = () => {
  return axios
    .get(`${kBaseUrl}/boards`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return INIT_DATA; //this will be deleted after connecting with Back-end
    });
};

const getCardsForSelectedBoard = (id) => {
  return axios
    .get(`${kBaseUrl}/boards/${id}/cards`)
    .then((response) => {
      console.log(response.data.map(transformCardResponse));
      return response.data.map(transformCardResponse);
    })
    .catch((error) => {
      console.log(error);
    });
};

const HomeScreen = () => {
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
    });
  };

  // const onUpdateLike = (updatedCard) => {
  //   const cards = cardData.map((card) => {
  //     if (card.id === updatedCard.id) {
  //       return updatedCard;
  //     } else {
  //       return card;
  //     }
  //   });
  //   setCardData(cards);

  const handleUpdatedBoard = (newBoard) => {
    // const requestBody = {
    //   ...newBoard
    // };
    if (!newBoard.title || !newBoard.owner) {
      alert("Please enter a title and owner!");
      return;
    }

    console.log(newBoard);
    axios
      .post(`${kBaseUrl}/boards`, {
        title: newBoard.title,
        owner: newBoard.owner,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    const newBoardsList = [...boardsList];
    newBoardsList.push({ ...newBoard, id: boardsList.length + 1 });
    setBoardList(newBoardsList);
  };

  let selectedBoard;
  for (const board of boardsList) {
    if (board.selected) {
      selectedBoard = board;
    }
  }

  // This is the code for managing likes in state and through the API call
  const onUpdateLike = (updatedCard) => {
    const cards = cardData.map((card) => {
      if (card.id === updatedCard.id) {
        return updatedCard;
      } else {
        return card;
      }
    });
    setCardData(cards);
    return axios
      .patch(
        `${kBaseUrl}/boards/${selectedBoard.id}/cards/like/${updatedCard.id}`
      )
      .then((response) => {
        return transformCardResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // This is Elaine's code managing like via the boardsList
  // const onUpdateLike = (updatedCard) => {
  //   const updatedBoards = boardsList.map(board => {
  //     const updatedCards = board.cards.map((card) => {
  //       if ((card.id === updatedCard.id) && (card.boardId === updatedCard.boardId)){
  //         return updatedCard;
  //       } else {
  //         return card;
  //       }
  //     })
  //     const updatedBoard = {...board, cards:updatedCards}
  //     return updatedBoard;
  //   })
  //   setBoardList(updatedBoards);
  // };

  // This is piece of code adapted from flasky for updating the cardData in state
  // const onUpdateCards = ()
  // setCardData((oldData) => {
  //   return oldData.map((card) => {
  //     if (card.id === id) {
  //       return updatedCard;
  //     }
  //     return card;
  //   })
  // })

  const onRemove = (updatedCard) => {
    const cards = cardData.map((card) => {
      if (card.id === updatedCard.id) {
        return updatedCard;
      } else {
        return card;
      }
    });
    setCardData(cards);
    return axios
      .patch(
        `${kBaseUrl}/boards/${selectedBoard.id}/cards/archive/${updatedCard.id}`
      )
      .then((response) => {
        return transformCardResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const onRemove = (updatedCard) => {
  //   const updatedBoards = boardsList.map(board => {
  //     const cards = board.cards.map((card) => {
  //       if ((card.id === updatedCard.id) && (card.boardId === updatedCard.boardId)) {
  //         return updatedCard;
  //       } else {
  //         return card;
  //       }
  //     });
  //     const updatedBoard = {...board, cards:cards}
  //     return updatedBoard;
  //   })
  // setBoardList(updatedBoards);
  // };

  const HandleSelectedBoard = (id) => {
    const updatedBoards = boardsList.map((board) => {
      const updatedBoard = { ...board };
      if (board.id === id) {
        updatedBoard.selected = true;
        selectedBoard = board;
      } else {
        updatedBoard.selected = false;
      }
      return updatedBoard;
    });
    setBoardList(updatedBoards);
    fetchCards(id);
  };

  const handleUpdatedCard = (newCard) => {
    // console.log(newCard);
    if (!newCard.message) {
      alert("Please enter a message!");
      return;
    }

    if (!selectedBoard) {
      alert("Please select a board!");
      return;
    }

    const requestBody = {
      ...newCard,
      board_id: selectedBoard.id,
      // status: true,
    };

    console.log(requestBody);
    axios
      .post(`${kBaseUrl}/boards/${requestBody.board_id}/cards`, {
        message: requestBody.message,
        board_id: requestBody.board_id,
        status: true,
      })
      .then((response) => {
        console.log(requestBody);
        fetchCards(requestBody.board_id);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <BoardsList boards={boardsList} onSelect={HandleSelectedBoard} />
      <div>
        <h2 className="board-title">
          {!selectedBoard ? "" : `${selectedBoard.title}`}
        </h2>
        {/* <h3>{!selectedBoard?'':`${selectedBoard.title} created by ${selectedBoard.owner}`}</h3> */}
        {selectedBoard ? (
          <CardsForSelectedBoard
            // cardData={selectedBoard ? selectedBoard.cards : []}
            cardData={cardData}
            onUpdateLike={onUpdateLike}
            onRemove={onRemove}
          />
        ) : (
          []
        )}
      </div>
      <NewBoardForm onBoardUpdate={handleUpdatedBoard} />
      <CreateNewCard onCardUpdate={handleUpdatedCard} />
    </div>
  );
};

export default HomeScreen;
