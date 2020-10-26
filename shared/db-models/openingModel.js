const mongoose = require('mongoose');

const openingSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    technologies: {
        type: Array,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isOpen: {
        type: Boolean,
        required: true
    },
    createdBy: {
        type: String,
        required: true 
    },
    applications: {
        type: Array,
        required: true
    }
});

module.exports = new mongoose.model('opening', openingSchema);