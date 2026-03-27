const { Schema,mongoose } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});
module.exports = (mongoose) => {
    const User = mongoose.model('User',userSchema);
    return User;
};
