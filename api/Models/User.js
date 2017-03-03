"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return callback(err);
        callback(null, isMatch);
    });
};
userSchema.methods.toJSON = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};
var User = mongoose.model('User', userSchema);
module.exports = User;
//# sourceMappingURL=User.js.map