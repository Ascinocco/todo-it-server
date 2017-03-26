"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorHandlerMiddleware = (function () {
    function ErrorHandlerMiddleware() {
    }
    ErrorHandlerMiddleware.handle = function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({ msg: 'Error', status: err.status || 500 });
        console.log(err);
        next(err);
    };
    return ErrorHandlerMiddleware;
}());
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
//# sourceMappingURL=ErrorHandlerMiddleware.js.map