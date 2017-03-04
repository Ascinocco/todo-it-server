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
        rule.hour = [new schedule.Range(0, 23)];
        rule.minute = [new schedule.Range(0, 59)];
        var job = schedule.scheduleJob(rule, function () {
            console.log('My name is Jobert Jith');
            console.log('Clearing the old tokens...');
            Token.remove({ valid: false }, function (err, removedTokens) {
                if (err) {
                    console.error('JOB FAILED. CHECK THE DB.');
                }
                console.log('TOKENS DELETED!!');
            });
        });
    };
    return ClearTokenJob;
}());
exports.ClearTokenJob = ClearTokenJob;
//# sourceMappingURL=ClearTokenJob.js.map