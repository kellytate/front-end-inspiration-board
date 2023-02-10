import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DUMMY_DATA from "../data/boards.json";
import DUMMY_CARDS from "../data/card.json";
import NewBoardForm from "../components/NewBoardForm";
import BoardsList from "../components/BoardsList";
import CardsForSelectedBoard from "../components/CardsForSelectedBoard";
import CreateNewCard from "../components/CreateNewCard";
import SortOption from "../components/SortOption";

const kBaseUrl = process.env.REACT_APP_BACKEND_URL;

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
const INIT_CARDS = DUMMY_CARDS.map((card) => transformCardResponse(card));

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
      return INIT_CARDS.filter((card) => card.boardId === id);
    });
};

const HomeScreen = () => {
  const [cardData, setCardData] = useState([]);
  const [boardsList, setBoardList] = useState(INIT_DATA);

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

  const handleUpdatedBoard = (newBoard) => {
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

    setBoardList((boardsList) => {
      const newBoardsList = [...boardsList];
      newBoardsList.push({ ...newBoard, id: boardsList.length + 1 });
      return newBoardsList;
    });
  };

  const selectBoard = boardsList.filter((board) => {
    return board.selected === true;
  });
  let selectedBoard = selectBoard[0];

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

  const HandleSortCards = (value) => {
    if (value === "id") {
      setCardData((cards) => [...cards].sort((a, b) => a.id - b.id));
    } else if (value === "message") {
      setCardData((cards) =>
        [...cards].sort((a, b) => a.message.localeCompare(b.message))
      );
    } else if (value === "likes") {
      setCardData((cards) =>
        [...cards].sort((a, b) => b.likesCount - a.likesCount)
      );
    } else {
      return cardData;
    }
  };

  return (
    <div>
      <BoardsList boards={boardsList} onSelect={HandleSelectedBoard} />
      <div>
        <h2 className="board-title">
          {!selectedBoard ? "" : `${selectedBoard.title}`}
        </h2>
        {selectedBoard ? (
          <SortOption cardData={cardData} onChange={HandleSortCards} />
        ) : (
          []
        )}
        {selectedBoard ? (
          <CardsForSelectedBoard
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
