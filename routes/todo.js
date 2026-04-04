const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 전체 조회 GET /api/todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: err.message });
  }
});

// 단건 조회 GET /api/todos/:id
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: '해당 할일을 찾을 수 없습니다.' });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: err.message });
  }
});

// 생성 POST /api/todos
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const todo = new Todo({ title, description, priority, dueDate });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: '입력값이 올바르지 않습니다.', error: err.message });
    }
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: err.message });
  }
});

// 수정 PUT /api/todos/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, priority, dueDate },
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res.status(404).json({ message: '해당 할일을 찾을 수 없습니다.' });
    }
    res.json(todo);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: '입력값이 올바르지 않습니다.', error: err.message });
    }
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: err.message });
  }
});

// 삭제 DELETE /api/todos/:id
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: '해당 할일을 찾을 수 없습니다.' });
    }
    res.json({ message: '할일이 삭제되었습니다.', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: err.message });
  }
});

module.exports = router;
