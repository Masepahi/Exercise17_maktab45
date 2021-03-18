const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    registrationNumber:  {
        type: Number,
        required: true
    },
    
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Company', CompanySchema);

