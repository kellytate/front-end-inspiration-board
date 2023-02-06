import React, {useState, useRef} from 'react';
import './NewBoardForm.css'

const defaultBoardData = {
    title:'', 
    creator:''
  }

const NewBoardForm = ({onBoardUpdate}) => {
    const [boardData, setBoardData] = useState(defaultBoardData) 
    const {title, creator} = boardData
    const inputTitle = useRef()

    const onChange = (e) => {
        const {name, value} = e.target;
        setBoardData({
            ...boardData,
            [name]: value
        })
    }


    const boardFormSubmitHandler = (e) => {
        e.preventDefault();
        onBoardUpdate(boardData);
        setBoardData(defaultBoardData);
        inputTitle.current.focus();
    }
    
    return(
        <form className='new-board-form' onSubmit={boardFormSubmitHandler}>
            <h2> CREATE A NEW BOARD</h2>
            <label>title</label>
            <input 
                name='title' 
                placeholder='title' 
                onChange={onChange} 
                value={title}
                ref= {inputTitle}
            />
            <label>creator</label>
            <input 
                name='creator' 
                placeholder='creator' 
                onChange={onChange} 
                value={creator} 
            />
            <p id='preview-label'>preview: 
                <span>{`${title} by ${creator}`}</span>
            </p>
            <button type='submit'>Submit</button>
        </form>
    );



};
export default NewBoardForm;