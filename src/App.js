import "./App.css";
import CardsForSelectedBoard from "./components/CardsForSelectedBoard";
import { useState } from "react";
import axios from "axios";

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
  const [cardData, setCardData] = useState([
    {
      id: 1,
      message: "hello",
      likes_count: 0,
      status: true,
    },
    {
      id: 2,
      message: "ocelot",
      likes_count: 0,
      status: true,
    },
    {
      id: 3,
      message: "awesome",
      likes_count: 3,
      status: true,
    },
  ]);

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
      <div>
        <h3>SELECTED BOARD TITLE GOES HERE</h3>
        {/* <h3>{selectedBoard.title} created by {selectedBoard.owner} </h3>*/}
        <CardsForSelectedBoard
          cardData={cardData}
          onUpdateLike={onUpdateLike}
          onRemove={onRemove}
        />
      </div>
    </div>
  );
}

export default App;
