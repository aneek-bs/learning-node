const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//ROUTES
//A more easier way to route things
//Mounting the router

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
