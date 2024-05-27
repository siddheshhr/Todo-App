import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//import './TaskForm.css';  // If you need component-specific styles

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [dueDate, setDueDate] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/tasks/${id}`)
                .then(response => response.json())
                .then(data => {
                    setTitle(data.title);
                    setDescription(data.description);
                    setStatus(data.status);
                    setDueDate(data.dueDate);
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = { title, description, status, dueDate };

        const requestOptions = {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        };

        fetch(`http://localhost:8080/tasks${id ? `/${id}` : ''}`, requestOptions)
            .then(() => navigate('/'));
    };

    return (
        <div className="task-form">
            <h1>{id ? 'Edit Task' : 'Add Task'}</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <label>Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <label>Due Date:</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                <button type="submit">{id ? 'Update Task' : 'Add Task'}</button>
            </form>
        </div>
    );
};

export default TaskForm;

