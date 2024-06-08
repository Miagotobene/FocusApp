const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/isLoggedIn')
const dashboardController = require('../controllers/todo-dashboardController');



// TODO APP dashboard routes 
router.get('/dashboard', isLoggedIn, dashboardController.dashboard) // protected route by using isLoggedIn function
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewTask); // route for viewing one task
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateTask); // route for updating the task
router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteTask); // route for deleting a task
router.get('/dashboard/add', isLoggedIn, dashboardController.dashboardAddTask); // route for getting and writing a new task
router.post('/dashboard/add', isLoggedIn, dashboardController.dashboardAddTaskSubmit); // route for posting a new note
router.get('/dashboard/search', isLoggedIn,dashboardController.dashboardSearch); //  find a task with a given word, i.e., 'learn'
router.post('/dashboard/search', isLoggedIn, dashboardController.dashboardSearchSubmit); // submit search after typing in a word

// Access denied is returned when user isn't logged into the app
module.exports = router;
