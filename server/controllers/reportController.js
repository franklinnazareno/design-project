const Report = require('../models/reportModel')
const mongoose = require('mongoose')

// create new report
const createReport = async (req, res) => {
    const { source, coordinates, category, description } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: "No image file was uploaded" })
    }

    if (!req.file.mimetype.startsWith("image/")) {
        return res.status(400).json({ error: "Uploaded file is not a valid image" })
    }

    if (req.file.size > 20 * 1024 * 1024) {
        return res.status(400).json({ error: "Uploaded file exceeds the maximum size of 20 MB" });
    }

    const image = req.file.buffer

    try {
        const user_id = req.user._id;

        const report = await Report.create({ source, coordinates, category, description, image, user_id });

        return res.status(200).json(report);
    } catch (error) {
       return res.status(400).json({ error: error.message });
    }
};

// update report expiry
const updateReportExpiry = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such report'})
    }

    const report = await Report.findOneAndUpdate({_id: id}, { expiry: new Date(req.body.expiry) }, {new: true})

    if (!report) {
        return res.status(404).json({error: 'No such report'})
    }

    res.status(200).json(report)
}


module.exports = { createReport, updateReportExpiry }