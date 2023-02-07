import './App.css';
import { useState } from 'react';
import CreateNewCard from './components/CreateNewCard';
import axios from 'axios';

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

const handleUpdatedCard = (newCard) => {
  console.log(newCard);

  const requestBody = {
    ...newCard,
    likes_count: 0,
    board_id: cardState.id,
    status: true,
  };

  // Need to confirm create card route with backend
  console.log(requestBody);
  return axios
    .post(`${kBaseUrl}/boards/${boardId}/cards`, [requestBody])
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

};

function App() {
  // const [newCardData, setCardData] = useState(
  //   [{
  //     message: '',
  //   }]
  // );

  // const onCardDataReady = (formData) => {

  //   createCard(formData)
  //   // .then((newCard) => {
  //   //   setCardData(newCard);
  //   // })
  //   // .catch((error) => {
  //   //   console.log(error);
  //   // });
  // };

  return (
    <main>
      <section>
        <CreateNewCard onCardUpdate={handleUpdatedCard} />
      </section>
    
    </main>
  );
}

export default App;
