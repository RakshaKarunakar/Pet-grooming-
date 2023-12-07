const express = require('express');
const router = express.Router();
const User = require('../middleware/user')
const {Insert, View,AdminView, Delete,singleView, Update} = require('../controller/appointment');

router.post('/insert',User,Insert)
router.get('/view',User,View)
router.get('/aview',AdminView)
router.get('/sview', User,singleView)
router.delete('/delete/:id',Delete)
router.put('/update/:id',Update)
module.exports = router;