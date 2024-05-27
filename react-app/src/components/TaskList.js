
import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
//import './TaskList.css';  // If you need component-specific styles

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/tasks')
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    return (
        <div className="task-list">
            <h1 className="header">Task List</h1>
            <button onClick={() => window.location.href = '/add-task'}>Add Task</button>
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
