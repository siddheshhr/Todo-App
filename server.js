const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 8080;

// Middleware to parse JSON bodies
app.use(cors());
app.use(bodyParser.json());

// In-memory data storage for tasks
let tasks = [];

// Default route to confirm server is running
app.get("/", (req, res) => {
    res.send('Hello');
});

// Route to get all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Route to create a new task
app.post("/tasks", (req, res) => {
    const { title, description, status, dueDate } = req.body;
    const newTask = {
        id: uuidv4(), // Generate a unique ID for the task
        title,
        description,
        status,
        dueDate
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Route to get a specific task by ID
app.get("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Route to update a task by ID
app.put('/tasks/:id', (req, res) => {
    const { title, description, status, dueDate } = req.body;
    const task = tasks.find(t => t.id === req.params.id);
    if (task) {
        task.title = title;
        task.description = description;
        task.status = status;
        task.dueDate = dueDate;
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== req.params.id);
    res.status(204).send();
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
