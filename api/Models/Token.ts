/**
 * For token auth I need a way to invalidate tokens when a user logs out
 * The most straight forward way I can see is to store them in the db
 * Meaning that I'll set a boolean flag telling the app whether or not to accept that token
 * even if it is not expired yet. Additionally I'll need some sort of job to remove
 * invalidated tokens every 24 hours 
 * 
 */

import * as mongoose from "mongoose";
let Schema = mongoose.Schema;

var tokenSchema = new Schema({
    value: { type: String, required: true, unique: true },
    valid: { type: Boolean, required: true, default: true }
}, {
    collection: 'TokenStore'
});

tokenSchema.methods.revoke = function () {
    this.valid = false;
}

tokenSchema.statics.findByToken = function (token, callback) {
    return this.findOne({ value: token }, callback)
}

let Token = mongoose.model('Token', tokenSchema);

module.exports = Token;