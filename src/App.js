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
    display_status: displayStatus,
  } = card;
  return { id, message, likesCount, boardId, displayStatus };
}

const createCard = (messageData) => {

  const requestBody = {
    ...messageData,
    likes_count: 0,
    board_id: '',
    display_status: true,
  };

  console.log(requestBody);
//   return axios
//     .post(`${kBaseUrl}/cards`, [requestBody])
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.log(error);
//     });

};

function App() {
  const [newCardData, setCardData] = useState(
    [{
      message: '',
    }]
  );

  const onCardDataReady = (formData) => {

    createCard(formData)
    // .then((newCard) => {
    //   setCardData(newCard);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  return (
    <main>
      <section>
        <CreateNewCard onCardDataReady={onCardDataReady} />
        
      </section>
    
    </main>
  );
}

export default App;
