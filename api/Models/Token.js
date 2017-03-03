"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var tokenSchema = new Schema({
    value: { type: String, required: true, unique: true },
    valid: { type: Boolean, required: true, default: true }
}, {
    collection: 'TokenStore'
});
tokenSchema.methods.revoke = function () {
    this.valid = false;
};
tokenSchema.statics.findByToken = function (token, callback) {
    return this.findOne({ value: token }, callback);
};
var Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
//# sourceMappingURL=Token.js.map