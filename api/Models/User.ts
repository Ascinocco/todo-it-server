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

    admin: { type: Boolean, default: false },

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

// removes password field
userSchema.methods.toJSON = function() {
    let user  = this.toObject();
    delete user.password;
    delete user.admin;
    return user;
}

// define schema name
let User = mongoose.model('User', userSchema);

module.exports = User;