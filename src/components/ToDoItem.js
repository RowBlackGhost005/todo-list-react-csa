import React from 'react';
import {useState , useEffect} from 'react';

/* 
    Component representing a Todo Task.
    This should be children of a ToDoApp for managing its state changes and persist its data consistenly
*/
function ToDoItem({id, task , isCompleted , onToggle , onEdit , onDelete}) {

    /* State for define if the user is actively editing this todo task*/
    const [editing , setEditing] = useState(false);

    /* State for changin the task of this todo*/
    const [newTask , setTask] = useState(task);

    /* Function for changing this todo task based on user input*/
    const handleNewTask = (event) => {
        setTask(event.target.value);
    }

    /* Function for managing the event of trying to edit the task that enables editing*/
    const handleEditTask = (event) => {
        event.preventDefault();

        toggleEdit();
    };

    /* Function for managing when the user cancels the editing, returning all to how it was*/
    const handleCancelEdit = (event) => {
        toggleEdit();
    };

    /* Function for managing the change of this Todo task based on the user input*/
    const handleConfirmEdit = (event) => {
        if(newTask === ""){
            setTask(task);
            toggleEdit();
            return;
        }

        onEdit(id , newTask);
        toggleEdit();
    }

    /* Function to call the callback function of ToDoApp for deletion of this todo*/
    const handleDelete = (event) => {
        onDelete(id);
    }

    /* Function to change the state of editing of this todo, enabling or diseabling the editing inputs*/
    function toggleEdit(){
        setEditing((prevState) => !prevState);
    }

    return (
        <React.Fragment>
            <div className='flex-row task-card'>
                <div className='flex-row flex-justify-start'>
                    <input className='dynamic-check' type='checkbox' checked={isCompleted} onChange={() => onToggle(id)} id={id}></input>
                </div>

                <div className='flex-row flex-align-start my-auto'>
                    {!editing &&  <p className={isCompleted ? 'text-striked' : ''}><a className="text-start anchor-custom" href='blank' onClick={handleEditTask}>{task}</a></p> }
                    {editing && <input  className='' type='text' value={newTask} onChange={handleNewTask}></input>}
                    {editing && <button onClick={handleConfirmEdit}>Confirm</button>}
                    {editing && <button onClick={handleCancelEdit}>Cancel</button>}
                </div>

                <div className='flex-row fflex-align-end'>
                    <button onClick={handleDelete} className='img-btn'>
                        <img src='/trash.png' alt='Trash Can' className='dynamic-img'></img>
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ToDoItem;