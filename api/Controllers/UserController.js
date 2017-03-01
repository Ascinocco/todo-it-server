"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.getUser = function (req, res, next) {
        var user = {
            name: "Anthony Scinocco",
            email: "anthony@mail.com"
        };
        res.status(200)
            .json(user);
    };
    UserController.prototype.update = function (req, res, next) {
        var user = {
            name: "Anthony Mario Scinocco",
            email: "anthony@mail.com"
        };
        res.status(200)
            .json(user);
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map