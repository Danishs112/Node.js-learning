const express = require("express");
const morgan = require("morgan");




const tourRouter = require('./routes/tourRouter')
const userRouter = require('./routes/userRouter')


const app = express();

// app.use(morgan("short"));


app.use(express.json({ strict: false }))

// app.use((req, res, next) => {
//   // console.log("hello from middleware")
//   next();
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

app.use("/api/v1/tours",tourRouter);
app.use("/api/v1/users",userRouter)


module.exports = app;

