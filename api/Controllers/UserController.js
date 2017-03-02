"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = require('../Models/User');
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.getUser = function (req, res, next) {
        var userId = req.params._id;
        User.findById({ _id: userId }, function (err, user) {
            if (err) {
                return res.status(500).json({ msg: "Could not find you." });
            }
            user = user.toJSON();
            return res.status(200).json({ msg: "here you are!", user: user });
        });
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