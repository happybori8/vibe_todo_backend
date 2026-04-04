const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '제목은 필수입니다.'],
      trim: true,
      maxlength: [100, '제목은 100자 이내여야 합니다.'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, '설명은 500자 이내여야 합니다.'],
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

module.exports = mongoose.model('Todo', todoSchema);
