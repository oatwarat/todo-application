const Todo = require('../models/Todo');
const fs = require('fs');
const path = require('path');

// @desc    Get all todos for a user
// @route   GET /api/todos
// @access  Private
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Private
exports.createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    const newTodo = new Todo({
      title,
      description,
      status: status || 'Not Started',
      user: req.user.id,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    });

    const todo = await newTodo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
exports.updateTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    // Find todo
    let todo = await Todo.findById(req.params.id);

    // Check if todo exists
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Update fields
    const updateData = {
      title: title || todo.title,
      description: description || todo.description,
      status: status || todo.status
    };

    // Handle image update
    if (req.file) {
      // Remove old image if exists
      if (todo.imageUrl) {
        const oldImagePath = path.join(__dirname, '..', todo.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    // Update todo
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    // Check if todo exists
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Remove image if exists
    if (todo.imageUrl) {
      const imagePath = path.join(__dirname, '..', todo.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await todo.deleteOne();  // Using deleteOne instead of remove which is deprecated
    res.json({ message: 'Todo removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};