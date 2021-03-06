const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId : { type: String, require : true, unique : true, lowercase : true },
    hashedPassword : { type : String, default : null }
});

UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword)
    return result;
};

UserSchema.statics.findByUserId = async function(userId) {
    return this.findOne({ userId });
};

UserSchema.methods.generateToken = function() {
    const token = jwt.sign (
        {
            _id : this._id,
            userId : this.userId
        },
        process.env.JWT_SECRET,
        { expiresIn : '30d' }
    );
    return token;
};

module.exports = mongoose.model("User", UserSchema);