const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); //A middleware - that can modify incoming request data

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//GET - Fetch all tours by enveloping the result under a field called data
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

//GET - Fetch only the specific tour based on ID
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //Convert the string into a number
  const tour = tours.find((el) => el.id === id); //Find the tour that matches the ID as provided in the parameters

  //Invalid ID handler
  if (!tour) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
});

//POST - Add a new tour to existing data
app.post('/api/v1/tours', (req, res) => {
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
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
