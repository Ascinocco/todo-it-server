"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CORSMiddleware = (function () {
    function CORSMiddleware() {
    }
    CORSMiddleware.allowCORS = function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
        res.header('Access-Control-Expose-Headers', 'Connection,Content-Length,Content-Type,Date,ETag,X-Powered-By,x-access-token,user');
        res.header('Access-Control-Allow-Headers', 'Connection,Content-Length,Content-Type,Date,ETag,X-Powered-By,x-access-token,user');
        next();
    };
    return CORSMiddleware;
}());
exports.CORSMiddleware = CORSMiddleware;
//# sourceMappingURL=CORSMiddleware.js.map