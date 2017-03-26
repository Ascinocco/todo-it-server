import * as mongoose from "mongoose";
import * as schedule from "node-schedule";
let User = require('../../api/Models/User');

export class ClearTokenJob
{
    constructor(){}

    public static register(db: any): void
    {
        let rule = new schedule.RecurrenceRule();

        rule.dayOfWeek = [ new schedule.Range(0, 6) ];
        rule.hour = 3;
        rule.minute = 30;

        let job = schedule.scheduleJob(rule, function() {
            console.log('Clearing the old tokens...');

            User.update(
            { 'token.valid': false },
            { 'token.value': "null" },
            { multi: true }, function(err, raw) {
                if (err) {
                    //TODO: hook into slack and send err back to me
                    console.error("CRON EERRRRROOOOOOORRRRRR")
                    console.error(err)
                }
                console.log("JOB SUCCESSSSSSSS")
                console.log(raw);
            });
        });
    }
}