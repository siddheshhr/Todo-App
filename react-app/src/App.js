
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';  // Import the new CSS file

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<TaskList />} />
        <Route path="/add-task" element={<TaskForm />} />
        <Route path="/edit-task/:id" element={<TaskForm />} />
      </Routes>
    </Router>
  );
};

export default App;

