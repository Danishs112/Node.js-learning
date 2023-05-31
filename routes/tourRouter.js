const express = require('express');
const {getAllData,createData,getDataById,updateData,deleteData, checkId,checkBody} = require('../controllers/tourController')


const router = express.Router();


router.param('id', checkId)
  
router.route("/").get(getAllData).post(checkBody,createData)

router.route("/:id").get(getDataById).patch(updateData).delete(deleteData);

module.exports = router;