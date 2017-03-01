"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthController = (function () {
    function AuthController() {
    }
    AuthController.prototype.root = function (req, res, next) {
        res.status(200).json({ msg: "hello word!" });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map