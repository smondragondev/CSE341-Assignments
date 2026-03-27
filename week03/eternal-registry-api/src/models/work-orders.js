const { Schema } = require("mongoose");

const workOrdersSchema = new Schema({    
    type: {
        type: String,
        required: true
    },
    scheduledDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        required: true,
    }
});

module.exports = (mongoose) => {
    const WorkOrder = mongoose.model(
        'workOrders',
        workOrdersSchema,
    )
    return WorkOrder;
};