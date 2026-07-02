const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');

router.route('/')
  .get(protect, getTasks)
  .post(protect, [
    body('title').notEmpty().withMessage('Title is required'),
    body('priority').optional().isIn(['High', 'Medium', 'Low']).withMessage('Invalid priority value'),
    body('status').optional().isIn(['Pending', 'In Progress', 'Completed']).withMessage('Invalid status value'),
    body('dueDate').optional().isISO8601().withMessage('Invalid date format')
  ], createTask);

router.route('/:id')
  .get(protect, getTaskById)
  .put(protect, [
    body('priority').optional().isIn(['High', 'Medium', 'Low']).withMessage('Invalid priority value'),
    body('status').optional().isIn(['Pending', 'In Progress', 'Completed']).withMessage('Invalid status value'),
    body('dueDate').optional().isISO8601().withMessage('Invalid date format')
  ], updateTask)
  .delete(protect, deleteTask);

module.exports = router;
