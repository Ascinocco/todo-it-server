// this will be written in js, as using typescript requires you to have separate
// files, for an interface, schema and model. No thanks...
import * as mongoose from "mongoose";
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
const SALT_WORK_FACTOR: number = 10;

// user schema
let userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    token: {
        value: { type: String, required: true, default: "null" },
        valid: { type: Boolean, required: true, default: true }
    },
    settings: {
        notifications: {
            email: { type: Boolean, required: true, default: false },
            native: { type: Boolean, required: true, default: false }
        },

        time: {
            twelveHour: { type: Boolean, required: true, default: false },
            twentyFourHour: { type: Boolean, required: true, default: true }
        }
    },

    todoLists: [

    ],

    admin: { type: Boolean, required: true, default: false },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

});

userSchema.pre('save', function(next) {
    let user = this;

    // only hash password if it is new or has been modified
    if (!user.isModified('password')) return next();

    // generate salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        //hash the pw with out new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // set hash
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.hashPassword = function(passwordToHash) {
    let user = this;
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) { 
            console.error("ERROR HASHING PASSWORD, COULD NOT GENERATE SALT");
            return false;
         }

        //hash the pw with out new salt
        bcrypt.hash(passwordToHash, salt, function(err, hash) {
            if (err) { 
                console.error("ERROR HASHING PASSWORD, COULD NOT HASH IT");
                return false;
            }
        
            return hash;
        });
    })
}

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
}

userSchema.methods.addToken = function(value) {
    let user = this;
    user.token.value = value;
    user.token.valid = true;
}

userSchema.methods.revokeToken = function() {
    let user = this;
    user.token.value = "null";
    user.token.valid = false;
}

// removes password field
userSchema.methods.toJSON = function() {
    let user  = this.toObject();
    delete user.updated_at;
    delete user.created_at;
    delete user.password;
    delete user.admin;
    delete user.token;
    delete user._id;
    return user;
}

userSchema.methods.isTokenValid = function(token) {
    let user = this;
    if (user.token.value === token && user.token.valid) {
        return true;
    }
    return false;
}

userSchema.statics.findByToken = function(token, callback) {
    return this.findOne({ 'token.value': token }, callback);
}

userSchema.statics.findByEmail = function(email, callback) {
    return this.findOne({ email: email }, callback);
}

// define schema name
let User = mongoose.model('User', userSchema);

module.exports = User;