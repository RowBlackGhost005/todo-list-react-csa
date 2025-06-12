import React from 'react';
import {useState , useEffect} from 'react';

import ToDoInput from './ToDoInput';
import ToDoItem from './ToDoItem';

/* 
    Manages a To-Do List dynamically using LocalStorage for persistance.
*/
function ToDoApp() {

    /* Sets the counter of the task ID based on the last taskId created based on the value stored in the LocalStorage*/
    let [taskId , setTaskId] = useState(() => {
        const saved = localStorage.getItem("todo-task-counter");
        return saved ? JSON.parse(saved) : 1;
    });

    /* Sets the Todos (tasks) state based on the value on the LocalStorage*/
    let [todos , setTodos] = useState(() => {
        const saved = localStorage.getItem("todo-tasks");
        return saved ? JSON.parse(saved) : [];
    });

    /* CallBack function for ToDoInput to call whenever a new task is created*/
    const handleAddTodo = (todoTask) => {
        if(todoTask !== ""){

            let newTodo = {id: taskId , task: todoTask , isCompleted: false};

            setTaskId((taskId) => taskId + 1);

            setTodos([...todos , newTodo]);
        }
    };

    /* Callback function for ToDoItem to call whenever it changes state*/
    const handleToggleTodo = (todoId) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId ? {...todo , isCompleted: !todo.isCompleted} : todo
            )
        );
    }

    /* Callback function for ToDoItem to call whenever it changes its task*/
    const handleEditTodo = (todoId , newTask) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => 
                todo.id === todoId ? {...todo , task: newTask} : todo
            )
        );
    };

    /* Callback function for ToDoItem to call whenever its being deleted*/
    const handleDeleteTodo = (todoId) => {
        setTodos((prevTodos) => 
            prevTodos.filter(todo => todo.id !== todoId)
        );
    };

    /* Effect for refreshing the Todo list in the local storage for persistance*/
    useEffect(() => {
        localStorage.setItem("todo-tasks" , JSON.stringify(todos));
    } , [todos]);

    /* Effect for refreshing the TaskId count in the local storage for persistance*/
    useEffect(() => {
        localStorage.setItem("todo-task-counter" , JSON.stringify(taskId));
    } , [taskId]);

    //Doesnt seem to work, it will always return 0 and empty array, but when doing above inside the state manager, it works
    useEffect(() => {
        const todoSaved = localStorage.getItem("todo-tasks");

        const taskIdCount = localStorage.getItem("todo-task-counter");

        if(todoSaved){
            setTodos(JSON.parse(todoSaved));
        }

        if(taskIdCount){
            setTaskId(JSON.parse(taskIdCount));
        }

        console.log("Saved Tasks:", todoSaved);
        console.log("Task ID Counter:", taskIdCount);
    } , []);

    return(
        <div className='px-3'>
            <ToDoInput handleNewTodo={handleAddTodo}/>
            <div className='flex-column'>
                {todos.map((todo , index) => (
                    <ToDoItem key={todo.id} id={todo.id} task={todo.task} isCompleted={todo.isCompleted} onToggle={handleToggleTodo} onEdit={handleEditTodo} onDelete={handleDeleteTodo}/>
                ))}
            </div>

        </div>
    );
};

export default ToDoApp;