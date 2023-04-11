const Report = require('../models/reportModel')

const createReport = async (req, res) => {
    const { Source, Description } = req.body;

    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).json({ error: "No image file was uploaded" });
    }

    // Check if the uploaded file is an image
    if (!req.file.mimetype.startsWith("image/")) {
        return res.status(400).json({ error: "Uploaded file is not a valid image" });
    }

    const Image = req.file.buffer;

    try {
        const user_id = req.user._id;
        const report = await Report.create({ Source, Description, Image, user_id });
        res.status(200).json(report);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { createReport }