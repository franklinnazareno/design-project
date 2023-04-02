const Report = require('../models/reportModel')

const createReport = async (req, res) => {
    const { Source, Description } = req.body;
    const Image = req.file.buffer;

    try {
        const user_id = req.user._id
        const report = await Report.create({Source, Description, Image, user_id})
        res.status(200).json(report)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { createReport }