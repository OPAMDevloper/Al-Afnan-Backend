const { default: mongoose } = require("mongoose");

const countrySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    deletedAt: {
        type: Date,
        default: null
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('country', countrySchema);