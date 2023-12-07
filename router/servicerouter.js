const express = require('express');
const router = express.Router();
const Admin = require('../middleware/admin')
const {Insert, View, Delete,singleView, Update} = require('../controller/service');

router.post('/insert',Admin, Insert);
router.get('/view',View)
router.get('/sview/:id',singleView)
router.delete('/delete/:id',Delete)
router.put('/update/:id',Update)
module.exports = router;
