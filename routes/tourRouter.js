const express = require('express');
const {getAllData,createData,getDataById,updateData,deleteData} = require('../controllers/tourController')


const router = express.Router();
  
router.route("/").get(getAllData).post(createData)

router.route("/:id").get(getDataById).patch(updateData).delete(deleteData);

module.exports = router;