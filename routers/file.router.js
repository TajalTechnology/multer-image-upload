const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
 
const fileWorker = require('../controllers/file.controller');
 
router.post('/api/file/upload', upload.single('file'), fileWorker.uploadFile);
 
router.get('/api/file/info', fileWorker.listAllFiles);
 
router.get('/api/file/:id', fileWorker.found);
 
module.exports = router;