const { Schema } = require('mongoose');
const bcrypt = require("bcryptjs");

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

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try{
        this.password = await bcrypt.hashSync(this.password, 10);
    } catch (err){
        next(err);
    }
});

userSchema.methods.comparePassword = async function (newPassword) {
    return await bcrypt.compare(newPassword, this.password);
}

module.exports = (mongoose) => {
    const User = mongoose.model('User',userSchema);
    return User;
};
