const express = require('express');
const router = express.Router();
const {
  getAllTask,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');

router.get('/', getAllTask);
router.post('/', createTask);
router.get('/:id', getSingleTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
