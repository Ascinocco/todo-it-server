"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schedule = require("node-schedule");
var User = require('../../api/Models/User');
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
            User.update({ 'token.valid': false }, { 'token.value': "null" }, { multi: true }, function (err, raw) {
                if (err) {
                    console.error("CRON EERRRRROOOOOOORRRRRR");
                    console.error(err);
                }
                console.log("JOB SUCCESSSSSSSS");
                console.log(raw);
            });
        });
    };
    return ClearTokenJob;
}());
exports.ClearTokenJob = ClearTokenJob;
//# sourceMappingURL=ClearTokenJob.js.map