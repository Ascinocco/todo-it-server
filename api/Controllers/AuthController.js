"use strict";
var AuthController = (function () {
    function AuthController() {
    }
    AuthController.prototype.root = function (req, res, next) {
        console.log('here??');
        res.status(200).json({ msg: "hello word!" });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map