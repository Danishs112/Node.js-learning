const express = require("express")
const app = express();
const port = 3000;
const fs = require("fs");


app.use(express.json())

const tours = JSON.parse(fs.readFileSync('./test.json'))

const getAllData = (req,res) =>{
  res.status(200).json({
    status:200,
    results : tours.length,
    data:{
      tours
    }
  })
}

const getDataById = (req,res) =>{
   
  const tour= tours.find(element => element.id == req.params.id)
  if(!tour){
    res.json({
      status : 404,
      message:'Invalid Id'
    })
  }
  console.log(tour)
  res.json({
    status:200,
    results : tour.length,
    data:{
      tour
    }
  })
}

const createData =(req,res) =>{

  const newId = tours[tours.length-1].id + 1;
  const newTour = Object.assign({id:newId},req.body)

  tours.push(newTour)
  fs.writeFile('./test.json',JSON.stringify(tours),err =>{
    res.status(201).json({
      status: 201,
      data:{
        tour:newTour
      }
    })
  }) 
}

const updateData = (req,res) => {
  
  const obj = req.body;


  if(req.params.id * 1 > tours.length){
    return res.status(404).json({
      status: 'fail',
      message:'Invalid Id'
    })
  }

  const tour = tours.find(element => element.id == req.params.id)
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
    status:200,
    data:{
      tour
    }
  })
}

const deleteData = (req,res) =>{

  const tour = tours.findIndex(element => element.id === req.params.id * 1)
  
  tours.splice(tour-1,tour+1)
  

  if(!tour){
    return res.status(404).json({
      status:"failed",
      message:'invalid response'
    })
  }

  res.json({
    status:200,
    results: tours.length,
    data:tours
  })

}


// // app.get("/api/v1/tours",getAllData)
// app.get("/api/v1/tours/:id",getDataById)
// // app.post("/api/v1/tours",createData)
// app.patch("/api/v1/tours/:id",updateData)
// app.delete("/api/v1/tours/:id",deleteData)


app.route("/api/v1/tours").get(getAllData).post(createData)
app.route("/api/v1/tours/:id").get(getDataById).patch(updateData).delete(deleteData)













app.listen(port,() =>{
  console.log(`App running on port ${port}`)
})

