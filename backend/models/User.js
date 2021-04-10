const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Name must be required"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Email must be required"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password must be required"],
        minlength: [6, "Password must be at least 6 characters"]
    }
}, {timestamps: true})

userSchema.pre('save', function(next){
    let user = this;
    bcrypt.hash(user.password,10,(error, hash)=>{
        if (error) {
            return next(error);
        } else {
            user.password = hash;
            next();
        }
    })
})

module.exports = User = mongoose.model('User',userSchema);