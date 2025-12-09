const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  //Invalid ID handler
  if (val * 1 > tours.length) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  console.log(req.body);
  if (!req.body['name']) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Please enter a valid name',
    });
  }
  if (!req.body['price']) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Please enter a valid price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  // console.log(req.requestTime);
  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTourById = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //Convert the string into a number
  const tour = tours.find((el) => el.id === id); //Find the tour that matches the ID as provided in the parameters

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
      console.log(`New tour added.`);
    }
  );
};

exports.updateTour = (req, res) => {
  //We wont be sending the actual update - just a skeleton as of now
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  //We wont be deleting stuff now - just a skeleton as of now
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
