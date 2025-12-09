const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkID); //Check whether the ID is invalid or not right before hitting the controllers

//Create a checkBody middleware
//Check if bdy contains the name and price property
//If not, send back 400 (bad request)
//Add it to post handler stack

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
