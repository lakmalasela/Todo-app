import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Snackbar, Alert, Pagination, Grid } from "@mui/material";
import Todoform from "../components/Todoform";
import TodoList from "../components/TodoList";
import axios from "axios";

const Todoview = () => {
  const [tasks, setTasks] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchTasks(value);
  };

  const fetchTasks = async (page = 1, limit = 5) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:4000/todolist", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit },
      });

      if (response.status === 200) {
        setTasks(response.data.tasks);
        setTotalPages(response.data.totalPages);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (taskDescription) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:4000/todolist",
        { description: taskDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        fetchTasks();
        setSnackbarMessage("Task added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Failed to add task");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Error adding task");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };


  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/todolist/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` } },
      );

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

      fetchTasks();
      setSnackbarMessage("Task deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to delete task");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (taskId, updatedDescription) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:4000/todolist/${taskId}`,
        { description: updatedDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? { ...task, description: updatedDescription }
              : task
          )
        );
        setTaskToEdit(null);
        setSnackbarMessage("Task updated successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Failed to update task");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Error updating task");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: 'secondary.main',
          textAlign: 'center',
          mt: 3,
          mb: 4,
          textTransform: 'uppercase',
          letterSpacing: 2,
          bgcolor: 'background.default',
          p: 3,
          borderRadius: 3,
          boxShadow: 4
        }}
      >
        To-Do List
      </Typography>
      <Paper sx={{ boxShadow: 4, p: 3 }}>
        <Grid container>
          <Grid item xs={6}>
            <Todoform
              addTask={addTask}
              updateTask={updateTask}
              taskToEdit={taskToEdit}
            />
          </Grid>
          <Grid item xs={6}>
            <TodoList
              tasks={tasks}
              deleteTask={deleteTask}
              updateTask={(taskId, description) => {
                setTaskToEdit({ taskId, description });
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 3 }}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Todoview;
