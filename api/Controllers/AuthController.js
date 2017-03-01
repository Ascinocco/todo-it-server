"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthController = (function () {
    function AuthController() {
    }
    AuthController.prototype.login = function (req, res, next) {
        res.status(200).json({ msg: "Login posted" });
    };
    AuthController.prototype.logout = function (req, res, next) {
        res.status(200).json({ msg: "Logout posted" });
    };
    AuthController.prototype.register = function (req, res, next) {
        res.status(200).json({ msg: "Registration posted" });
    };
    AuthController.prototype.deleteAccount = function (req, res, next) {
        res.status(200).json({ msg: "Account deletion delete requested" });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map