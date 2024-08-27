// import React, { useState } from 'react';
// import { Box, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, TextField, Button } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

// const TodoList = ({ tasks, deleteTask, updateTask }) => {
//   const [editTaskId, setEditTaskId] = useState(null);
//   const [newDescription, setNewDescription] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);


//   const handleEditClick = (taskId, currentDescription) => {
//     console.log("TASK ",taskId, currentDescription);
    
//     setEditTaskId(taskId);
//     setNewDescription(currentDescription);
//   };

//   const handleUpdate = async () => {
//     if (editTaskId && newDescription.trim()) {
    
        
//       setLoading(true);
//       setError(null);

//       try {
//         console.log("EDIT ",editTaskId);
//         await updateTask(editTaskId, newDescription);
//         setEditTaskId(null);
//         setNewDescription('');
//       } catch (err) {
//         console.error('Failed to update task:', err);
//         setError('Failed to update task');
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       setError('Task ID or description is missing');
//     }
//   };

//   const handleDelete = async (taskId) => {
//     try {
//       await deleteTask(taskId);
//     } catch (err) {
//       setError('Failed to delete task');
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 600, mx: 'auto', my: 3 }}>
//       <Typography 
      
//       variant="h6"
//       gutterBottom
//       sx={{
//         fontWeight: 'bold',         
//         color: 'primary.main',      
//         textAlign: 'center',        
//         mb: 3,                      
//         textTransform: 'uppercase', 
//         letterSpacing: 1.5,        
//         bgcolor: 'background.paper',
//         p: 2,                       
//         borderRadius: 2,           
//         boxShadow: 3                
//       }}

//       >
//         Task List
//       </Typography>
//       <List>
//         {tasks.length > 0 ? (
//           tasks.map((task) => (
//             <ListItem key={task._id} divider>
//               <ListItemText primary={task.description} />
//               <ListItemSecondaryAction>
//                 {editTaskId === task._id ? (
//                   <>
//                     <TextField
//                       value={newDescription}
//                       onChange={(e) => setNewDescription(e.target.value)}
//                       variant="outlined"
//                       size="small"
//                       sx={{ mr: 1 }}
//                     />
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={handleUpdate}
//                       disabled={loading}
//                     >
//                       {loading ? 'Saving...' : 'Save'}
//                     </Button>
//                     {error && <Typography color="error">{error}</Typography>}
//                   </>
//                 ) : (
//                   <>
//                     <IconButton edge="end" onClick={() => handleEditClick(task._id, task.description)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton edge="end" onClick={() => handleDelete(task._id)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </>
//                 )}
//               </ListItemSecondaryAction>
//             </ListItem>
//           ))
//         ) : (
//           <Typography variant="body1">No tasks available</Typography>
//         )}
//       </List>
//     </Box>
//   );
// };

// export default TodoList;

import React, { useState } from 'react';
import { Box, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TodoList = ({ tasks, deleteTask, updateTask }) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEditClick = (taskId, currentDescription) => {
    setEditTaskId(taskId);
    setNewDescription(currentDescription);
  };

  const handleUpdate = async () => {
    if (editTaskId && newDescription.trim()) {
      setLoading(true);
      setError(null);

      try {
        await updateTask(editTaskId, newDescription);
        setEditTaskId(null);
        setNewDescription('');
      } catch (err) {
        console.error('Failed to update task:', err);
        setError('Failed to update task');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Task ID or description is missing');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 3 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          textAlign: 'center',
          mb: 3,
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        Task List
      </Typography>
      <List>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <ListItem key={task._id} divider>
              <ListItemText primary={task.description} />
              <ListItemSecondaryAction>
                {editTaskId === task._id ? (
                  <>
                    <TextField
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpdate}
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}
                  </>
                ) : (
                  <>
                    <IconButton edge="end" onClick={() => handleEditClick(task._id, task.description)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(task._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">No tasks available</Typography>
        )}
      </List>
    </Box>
  );
};

export default TodoList;
