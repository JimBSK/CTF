const express = require('express');
const router = express.Router();
const { restrictTo, checkPermission } = require('../middleware/authMiddleware');

// Только для админов
router.get('/users', restrictTo('admin'), userController.getAllUsers);

// С проверкой конкретного права
router.post(
  '/ban-user',
  checkPermission('manage_users'),
  adminController.banUser
);