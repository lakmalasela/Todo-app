import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';

const Todoform = ({ addTask, updateTask, taskToEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFieldDisabled, setIsFieldDisabled] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setIsEditing(true);
      formik.setFieldValue('task', taskToEdit.description);
      formik.setFieldValue('taskId', taskToEdit.taskId); // ID is set
      setIsFieldDisabled(false); // Ensure field is enabled when loading a task
    } else {
      setIsEditing(false);
      formik.resetForm();
      setIsFieldDisabled(false); // Ensure field is enabled on form reset
    }
  }, [taskToEdit]);

  const validationSchema = Yup.object({
    task: Yup.string()
      .min(3, 'Task description must be at least 3 characters long')
      .required('Task description is required'),
    taskId: Yup.string(), // Add validation for ID if needed
  });

  const formik = useFormik({
    initialValues: { task: '', taskId: '' },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (isEditing) {
        try {
          await updateTask(values.taskId, values.task);
          setIsFieldDisabled(true); // Disable field after successful update
        } catch (error) {
          console.error('Update failed:', error);
        }
      } else {
        await addTask(values.task);
      }
      resetForm();
      setIsEditing(false);
    },
  });

  return (
    <Box
      marginTop={"20px"}
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {isEditing ? "Edit Task" : "New Task"}
      </Typography>
      <TextField
        label="Task Description"
        name="task"
        value={formik.values.task}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.task && Boolean(formik.errors.task)}
        helperText={formik.touched.task && formik.errors.task}
        fullWidth
        disabled={isFieldDisabled} // Use disabled state
        sx={{
          mb: 2,
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color={isEditing ? "secondary" : "primary"}
        fullWidth
        sx={{
          borderRadius: 1,
          fontWeight: 'bold',
          bgcolor: isEditing ? 'secondary.main' : 'primary.main',
          '&:hover': {
            bgcolor: isEditing ? 'secondary.dark' : 'primary.dark',
          },
          mb: 1,
        }}
      >
        {isEditing ? "Update Task" : "Add Task"}
      </Button>
      <Button
        type="button"
        variant="outlined"
        color="error"
        fullWidth
        onClick={() => {
          formik.resetForm();
          setIsEditing(false);
          setIsFieldDisabled(false); // Ensure field is enabled on reset
        }}
        sx={{
          borderRadius: 1,
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default Todoform;
