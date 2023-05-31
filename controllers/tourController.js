const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../test.json`));


exports.checkId  = (req,res,next,val) =>{
  const data = tours.find((element) => element.id === req.params.id * 1);
 
  if (!data) {
    return res.status(404).json({
      status: "failed",
      message: "invalid response",
    });
  }
  next()
}


exports.checkBody = (req,res,next) =>{
  if(!req.body.name || !req.body.age){
    return res.status(404).json({
      status:"error",
      message: "please fill the valid data on the request"
    })
  }
  next();
}


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
    res.json({
      status: 200,
      requestTime: req.requestTime,
      results: tour.length,
      data: {
        tour,
      },
    });
  };
 
  const testFunction = () => tours;

exports.createData = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
  
    tours.push(newTour);
    fs.writeFile("./test.json", JSON.stringify(tours), (err) => {
      res.status(201).json({
        status: 201,
        data: {
          tour: newTour,
          data: testFunction(req,res)
        },
      });
    });

  };
  
exports.updateData = (req, res) => {
    const obj = req.body;
    
  
  
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
    res.json({
      status: 200,
      results: tours.length,
      data: tours,
    });
  };
