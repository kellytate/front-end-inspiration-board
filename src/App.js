import './App.css';
import NewBoardForm from './components/NewBoardForm';

function App() {
  const handleUpdatedBoard = (newBoard) => {
    // POST 
    console.log(newBoard); 
    return; 

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
