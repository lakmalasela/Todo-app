const express = require('express');
const Todolist = require('../model/Todolist')
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');


//post data
router.post('/', checkAuth, async (req, res) => {
    try {
        const userId = req.user.isuserExist; // Extract user ID from req.user
        const { description } = req.body;

        // Create a new Todolist instance
        const data = new Todolist({
            description,
            userRef: userId,
        });

        const savedTask = await data.save();

        // Send the saved task object back to the client
        res.status(200).json(savedTask);
    } catch (e) {
        // Server error
        console.log("Error", e);
        res.status(500).json({ message: 'Failed to create task' });
    }
});


//pagination
router.get('/', checkAuth, async (req, res) => {
    try {
        const userId = req.user.isuserExist; // Extract user ID from req.user
        const page = parseInt(req.query.page) || 1; // Page number (default is 1)
        const limit = parseInt(req.query.limit) || 10; // Number of tasks per page (default is 10)
        const skip = (page - 1) * limit; // Number of tasks to skip

        // Get paginated tasks for the user
        const tasks = await Todolist.find({ userRef: userId })
            .skip(skip)
            .limit(limit);

        // Get total number of tasks to calculate total pages
        const totalTasks = await Todolist.countDocuments({ userRef: userId });

        // Send paginated tasks along with pagination info
        res.status(200).json({
            tasks,
            totalPages: Math.ceil(totalTasks / limit),
            currentPage: page
        });
    } catch (e) {
        console.log("Error", e);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});


//update method
router.put("/:id", async(req, res) => {


    try {
        const {id} = req.params;
        const {description} = req.body;
    

        await Todolist.updateOne({_id:id},{description,description});
        return  res.sendStatus(200); 



    } catch (error) {
        res.sendStatus(500);
    }
});

//delete method
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Todolist.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).send("Task not found");
        }
        return res.sendStatus(200);
    } catch (error) {
   
        console.error('Error deleting task:', error);
        res.sendStatus(500);
    }
});

module.exports = router;