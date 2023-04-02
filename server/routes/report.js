const express = require('express')
const { createReport } = require('../controllers/reportController')
const requireAuth = require('../middleware/requireAuth')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router()

router.use(requireAuth)

router.post('/', upload.single('Image'), createReport)

module.exports = router