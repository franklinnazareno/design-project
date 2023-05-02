const Report = require('../models/reportModel')
const mongoose = require('mongoose')

const toRadians = (degrees) => {
      return degrees * Math.PI / 180
    }

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3
    const phi1 = toRadians(lat1)
    const phi2 = toRadians(lat2)
    const deltaPhi = toRadians(lat2 - lat1)
    const deltaLambda = toRadians(lon2 - lon1)

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

const thresholdDistance = 25

// create new report
const createReport = async (req, res) => {
    const { source, coordinates, category, description } = req.body;
    console.log(coordinates)
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
        let found = false
        const user_id = req.user._id;
        const parsedCoordinates = JSON.parse(coordinates);
        const reports = await Report.find({ category: category })
        for (const a of reports) {
            const aCoords = a.coordinates
            const distance = haversineDistance(parsedCoordinates.latitude, parsedCoordinates.longitude, aCoords.latitude, aCoords.longitude)
            if (distance <= thresholdDistance) {
                if (a.user_id !== user_id) {
                    found = true
                    const expiry = a.expiry 
                    await Report.findOneAndUpdate({_id: a.id}, { expiry: expiry.getTime() + (15 * 60 * 1000) })
                }   
            }
        }
        if (found) {
            const tempReport = { source, coordinates: parsedCoordinates, category, description, image, user_id };
            return res.status(200).json(tempReport)
        }
        const report = await Report.create({ source, coordinates: parsedCoordinates, category, description, image, user_id });
        
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