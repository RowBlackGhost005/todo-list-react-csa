import React from 'react';
import {useState , useEffect} from 'react';

/* 
    Manages the Input of the To-Do app for creation of a Todo
*/
function ToDoInput({handleNewTodo}){

    /* State for the User Input, being the value of the input*/
    const [userInput , setUserInput] = useState("");

    /* Callback function for when the input changes*/
    const handleInput = (event) => {
        setUserInput(event.target.value);
    };

    /* Function to call the callback function of ToDoApp for creating a new task based on user input*/
    const newToDoButton = () => {
        if(userInput.trim() !== ""){
            setUserInput("");
            handleNewTodo(userInput);
        }
    };

    return(
        <div className='py-1'>
            <input type='text' name='createToDo' placeholder='Create ToDo' value={userInput} onChange={handleInput}></input>
            <button onClick={newToDoButton}>Create</button>
        </div>
    );
};

export default ToDoInput;