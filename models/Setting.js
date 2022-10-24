const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
    table_count: {
        required: true,
        type: Number,
    },
    chair_count: {
        required: true,
        type: Number,
    },
    chairs_taken: {
        required: true,
        type: Number,
        default: 0
    },
    max_chairs_on_table: {
        require: true,
        type: Number
    },
    passcode: {
        type: String,
        default: 'password'
    }
});

module.exports = mongoose.model('settings', settingsSchema);