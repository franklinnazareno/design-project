const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const preferenceSchema = new Schema({
    preferences: {
        type: [{
            name: { type: String, required: true },
            value: { type: Number, required: true, default: 5 },
            enabled: { type: Boolean, required: true, default: true }
        }],
        default: [
            { name: 'cameras', value: 5, enabled: true },
            { name: 'street-lightings', value: 5, enabled: true },
            { name: 'landmarks', value: 5, enabled: true },
            { name: 'pwd', value: 5, enabled: true },
            { name: 'major-roads', value: 5, enabled: true }
        ]
    }
});


module.exports = mongoose.model('Preference', preferenceSchema)