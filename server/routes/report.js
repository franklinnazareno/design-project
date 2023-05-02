const express = require('express')
const { getReport, 
    createReport, 
    updateReportExpiry } = require('../controllers/reportController')
const requireAuth = require('../middleware/requireAuth')

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router()

// require auth for the report route
router.use(requireAuth)

// GET report
router.get('/', getReport )

// POST a new report
router.post('/', upload.single('image'), createReport)

// PATCH an expiry of a report
router.patch('/expiry/:id', upload.none(), updateReportExpiry)

module.exports = router