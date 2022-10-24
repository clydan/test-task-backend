const mongoose = require('mongoose');

const TableSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        is_occupied: {
            type: Boolean,
            required: true,
            default: false
        },
    }
);


module.exports = mongoose.model('Tables', TableSchema);