const Report = require('../models/reportModel')

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

        // Parse coordinates into an array of numbers
        const parsedCoordinates = JSON.parse(coordinates);
        const report = await Report.create({ source, coordinates: parsedCoordinates, category, description, image, user_id });

        return res.status(200).json(report);
    } catch (error) {
       return res.status(400).json({ error: error.message });
    }
};


module.exports = { createReport }