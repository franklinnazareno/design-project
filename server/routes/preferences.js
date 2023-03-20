const express = require('express')
const {
    getPreference,
    createPreference,
    updatePreference
} = require('../controllers/preferenceController')

const router = express.Router()

// GET a single preference
router.get('/:id', getPreference)

// POST a new preference
router.post('/', createPreference)

// UPDATE a preference
router.patch('/:id', updatePreference)

module.exports = router