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
        required: function() {
            return !this.githubId;
        }
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true
    },
    authProvider: {
        type: String,
        enum: ['local','github'],
        default: 'local',
    }
});

userSchema.pre('save', async function(next) {
    if (!this.password || !this.isModified('password')) return next();

    try{
        this.password = await bcrypt.hash(this.password, 10);
        next();
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
