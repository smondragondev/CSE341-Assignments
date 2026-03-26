const { Schema } = require("mongoose");

const deceasedSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: Date,
    dateOfDeath: {type: Date, required: true},
    intermentDate: Date,
});

const locationSchema = new Schema({
    cemeteryName: {type: String, required: true},
    section: {type:String, required: true},
    block: { type: String, required: true},
    lotNumber: String,
    graveNumber: String,
    coordinates: {
        lat: Number,
        lng: Number
    }
});

const burialSchema = new Schema({
    deceased: deceasedSchema,
    location: locationSchema
}, {timestamps: true});


module.exports = (mongoose) => {
    const BurialRecord = mongoose.model(
        'burialRecords',
        burialSchema,
    )
    return BurialRecord;
};