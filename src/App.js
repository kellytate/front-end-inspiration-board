import { useState } from "react";
import './App.css';
import DUMMY_DATA from "../src/data/boards.json"
import NewBoardForm from './components/NewBoardForm';

function App() {
  const [boardsList, setBoardList] = useState(DUMMY_DATA)

  const handleUpdatedBoard = (newBoard) => {
    // POST 
    const newBoardsList = boardsList.push({...newBoard, id:boardsList.length + 1})
    setBoardList(newBoardsList);
  }
  
  return (
    <div>
      <main>
      <NewBoardForm onBoardUpdate={handleUpdatedBoard}/>
      </main>
    </div>
  );
}

export default App;
