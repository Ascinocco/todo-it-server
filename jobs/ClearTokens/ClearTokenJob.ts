import * as schedule from "node-schedule";
import * as mongoose from "mongoose";
let Token = require('../../api/Models/Token');

export class ClearTokenJob
{
    constructor(){}

    public static register(db: any): void
    {
        let rule = new schedule.RecurrenceRule();

        rule.dayOfWeek = [ new schedule.Range(0, 6) ];
        rule.hour = [ new schedule.Range(0, 23) ];
        rule.minute = [ new schedule.Range(0, 59) ];

        let job = schedule.scheduleJob(rule, function() {
            console.log('My name is Jobert Jith');
            console.log('Clearing the old tokens...');

            Token.remove({ valid: false }, function(err, removedTokens){
                if (err) {
                    // probably need a better alert system than this
                    console.error('JOB FAILED. CHECK THE DB.');
                }

                console.log('TOKENS DELETED!!');

            });
        });
    }
}