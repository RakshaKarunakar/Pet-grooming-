const express = require('express');
const router = express.Router();
const {Insert, View, Delete,singleView, Update,Login,Passwordreset} = require('../controller/userregister');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploaduserphotos')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage });

router.post('/insert',upload.single('photo'), Insert);
router.get('/view',View)
router.get('/sview/:id',singleView)
router.delete('/delete/:id',Delete)
router.put('/update/:id',upload.single('photo'),Update)
router.post('/login',Login)
router.post('/Passwordreset',Passwordreset)

module.exports = router;
