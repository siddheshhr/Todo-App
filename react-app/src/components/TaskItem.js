
import React from 'react';
//import './TaskItem.css';  // If you need component-specific styles

const TaskItem = ({ task }) => {
    const handleDelete = () => {
        fetch(`http://localhost:8080/tasks/${task.id}`, { method: 'DELETE' })
            .then(() => window.location.reload());
    };

    const handleEdit = () => {
        window.location.href = `/edit-task/${task.id}`;
    };

    return (
        <div className="task-item">
            <h2>{task.title}</h2>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.dueDate}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default TaskItem;
