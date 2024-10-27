import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TodoList.css'; 

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [status, setStatus] = useState(false);
    const [deadline, setDeadline] = useState('');
    const [editingId, setEditingId] = useState(null); 

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:3004/getTodoList');
        setTodos(response.data);
    };

    const addTodo = async () => {
        const newTodo = { task, status, deadline: new Date(deadline) }; 
        await axios.post('http://localhost:3004/addTodoList', newTodo);
        fetchTodos();
        resetForm();
    };

    const startEdit = (todo) => {
        setTask(todo.task);
        setStatus(todo.status);
        setDeadline(todo.deadline.split('T')[0]); 
        setEditingId(todo._id);
    };

    const updateTodo = async () => {
        const updatedTodo = { task, status, deadline: new Date(deadline) }; 
        await axios.post(`http://localhost:3004/updateTodoList/${editingId}`, updatedTodo);
        fetchTodos();
        resetForm();
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:3004/deleteTodoList/${id}`);
        fetchTodos();
    };

    const resetForm = () => {
        setTask('');
        setStatus(false);
        setDeadline('');
        setEditingId(null);
    };

    return (
        <div className="todo-container">
            <div className="todo-form">
                <input
                    type="text"
                    placeholder="Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <input
                    type="checkbox"
                    checked={status}
                    onChange={() => setStatus(!status)}
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <button onClick={editingId ? updateTodo : addTodo}>
                    {editingId ? 'Update To-Do' : 'Add To-Do'}
                </button>
            </div>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo._id} className={`todo-item ${todo.status ? 'completed' : ''}`}>
                        <span>{todo.task}</span>
                        <span className="todo-deadline">{new Date(todo.deadline).toLocaleDateString()}</span> 
                        <button onClick={() => startEdit(todo)}>Edit</button>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
