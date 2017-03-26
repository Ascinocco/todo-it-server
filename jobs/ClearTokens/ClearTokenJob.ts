import * as mongoose from "mongoose";
import * as schedule from "node-schedule";
let Token = require('../../api/Models/Token');

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

            Token.remove({ valid: false }, function(err, removedTokens){
                if (err) {
                    // probably need a better alert system than this
                    console.error('JOB FAILED. CHECK THE DB.');
                }

                console.log('Tokens removed successfully!');
            });
        });
    }
}