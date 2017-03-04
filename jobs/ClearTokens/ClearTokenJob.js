"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schedule = require("node-schedule");
var Token = require('../../api/Models/Token');
var ClearTokenJob = (function () {
    function ClearTokenJob() {
    }
    ClearTokenJob.register = function (db) {
        var rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [new schedule.Range(0, 6)];
        rule.hour = 3;
        rule.minute = 30;
        var job = schedule.scheduleJob(rule, function () {
            console.log('Clearing the old tokens...');
            Token.remove({ valid: false }, function (err, removedTokens) {
                if (err) {
                    console.error('JOB FAILED. CHECK THE DB.');
                }
                console.log('Tokens removed successfully!');
            });
        });
    };
    return ClearTokenJob;
}());
exports.ClearTokenJob = ClearTokenJob;
//# sourceMappingURL=ClearTokenJob.js.map