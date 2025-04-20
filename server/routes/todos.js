const express = require('express');
const router = express.Router();
const { 
  getTodos, 
  createTodo, 
  updateTodo, 
  deleteTodo 
} = require('../controllers/todos');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Routes
router.get('/', auth, getTodos);
router.post('/', auth, upload.single('image'), createTodo);
router.put('/:id', auth, upload.single('image'), updateTodo);
router.delete('/:id', auth, deleteTodo);

module.exports = router;