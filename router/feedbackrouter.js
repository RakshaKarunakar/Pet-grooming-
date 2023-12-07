const express = require('express');
const router = express.Router();
const {Insert, View, Delete,singleView, Update} = require('../controller/feedback');

router.post('/insert', Insert);
router.get('/view',View)
router.get('/sview/:id',singleView)
router.delete('/delete/:id',Delete)
router.put('/update/:id',Update)

module.exports = router;
