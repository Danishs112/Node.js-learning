const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../test.json`));

exports.getAllData = (req, res) => {
    res.status(200).json({
      status: 200,
      results: tours.length,
      data: {
        tours,
      },
    });
  };

exports.getDataById = (req, res) => {
    console.log(req.requestTime);
    const tour = tours.find((element) => element.id == req.params.id);
    if (!tour) {
      res.json({
        status: 404,
        message: "Invalid Id",
      });
    }
    res.json({
      status: 200,
      requestTime: req.requestTime,
      results: tour.length,
      data: {
        tour,
      },
    });
  };
  
exports.createData = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
  
    tours.push(newTour);
    fs.writeFile("./test.json", JSON.stringify(tours), (err) => {
      res.status(201).json({
        status: 201,
        data: {
          tour: newTour,
        },
      });
    });
  };
  
exports.updateData = (req, res) => {
    const obj = req.body;
  
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid Id",
      });
    }
  
    const tour = tours.find((element) => element.id == req.params.id);
    // if(Object.keys(obj) in tour){
    //   const value = Object.values(obj).toString()
    //   tour[Object.keys(obj)] = value;
    // }
  
    if (tour) {
      for (const key in obj) {
        if (tour.hasOwnProperty(key)) {
          const value = obj[key].toString();
          tour[key] = value;
        }
      }
    }
    res.json({
      status: 200,
      data: {
        tour,
      },
    });
  };
  
exports.deleteData = (req, res) => {
    const tour = tours.findIndex((element) => element.id === req.params.id * 1);
    tours.splice(tour - 1, tour + 1);
    if (!tour) {
      return res.status(404).json({
        status: "failed",
        message: "invalid response",
      });
    }
    res.json({
      status: 200,
      results: tours.length,
      data: tours,
    });
  };
