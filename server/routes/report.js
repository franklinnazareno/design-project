const express = require('express')
const { getReport, 
    createReport, 
    updateReportExpiry,
    addExpiry,
    subtractExpiry } = require('../controllers/reportController')
const requireAuth = require('../middleware/requireAuth')

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router()

// require auth for the report route
router.use(requireAuth)

// POST a new report
router.post('/', upload.single('image'), createReport)

// POST a report based on coordsData
router.post('/filter', getReport )

// PATCH an expiry of a report
// router.patch('/expiry/:id', upload.none(), updateReportExpiry)

// PATCH a report by adding expiry
router.patch('/add/:id', upload.none(), addExpiry)

// PATCH a report by subtracting expiry
router.patch('/subtract/:id', upload.none(), subtractExpiry)

module.exports = router