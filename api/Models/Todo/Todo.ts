import * as moment from 'moment';
import { ValidAlerts } from './Constants/ValidAlerts';
import { ValidIntervals } from './Constants/ValidIntervals';
/**
 * This is purely for modelling and have some sort of validation
 * This class will be used to ensure that the data stored to a users todoList is valid
 * 
 * NOTE!!!!!!!!!!!: not sure if month goes from 0 - 11 or 1 - 12 
 * 
 * @export
 * @class Todo
 */
export class Todo
{
    private name:       string;
    private desc:       string;

    private todoList:   string;
    private labels:     Array<string>;

    private dueYear:    number;
    private dueMonth:   number;
    private dueDay:     number;
    private dueHour:    number;
    private dueMinute:  number;

    private dueDate:    any;

    private alerts:     Array<{value: number, measure: string}>;
    private interval:   {value: number, measure: string};

    constructor(todo: Object)
    {

    }



    public setDueYear(year: any): void
    {
        let currentYear = moment.utc().year();
        
        try {
            year = parseInt(year);
            if (year >= currentYear && year < 3000) {
                this.dueYear = year;
            } else {
                console.log('The year provided is not between the current year and the year 3000');
                console.log('Setting to current year');
                this.dueYear = currentYear;
            }
        } catch (err) {
            console.log('Error converting year');
            console.log(err);
            console.log('Setting to current year');
            this.dueYear = currentYear;
        }
    }

    public getDueYear(): number
    {
        return this.dueYear;
    }

    public setDueMonth(month: any): void
    {
        let currentMonth = moment.utc().month();

        try {
            month = parseInt(month);
            if (month >= 0 && month <= 11) {
                this.dueMonth = month;
            } else {
                console.log('Invalid month range...');
                console.log('Setting to current month...');
                this.dueMonth = currentMonth;
            }
        } catch (err) {
            console.log('Could not parse month');
            console.log(err);
            console.log('Setting to current month');
            this.dueMonth = currentMonth;
        }
    }

    public getDueMonth(): number
    {
        return this.dueMonth;
    }

    public setDueDay(day: any): void
    {
        let currentDay = moment.utc().date();
        
        try {
            day = parseInt(day);
            if (day >= 1 && day <= 31) {
                this.dueDay = day;
            } else {
                console.log('Invalid day number range...');
                console.log('Setting to current day number...');
                this.dueDay = currentDay;
            }
        } catch (err) {
            console.log('Could not parse day number');
            console.log(err);
            console.log('Setting to current day number');
            this.dueDay = currentDay;
        }
    }

    public getDueDay(): number 
    {
        return this.dueDay;
    }

    public setDueHour(hour: any): void
    {
        let currentHour = moment.utc().hour();

        try {
            hour = parseInt(hour);
            if (hour >= 0 && hour <= 23) {
                this.dueHour = hour;
            } else {
                console.log('Invalid hour set');
                console.log('setting to current hour');
                this.dueHour = currentHour;
            }
        } catch (err) {
            console.log('Error converting hour');
            console.log(err);
            console.log('setting to current hour');
            this.dueHour = currentHour;
        }
    }

    public getDueHour(): number
    {
        return this.dueHour;
    }

    public setDueMinute(minute: any): void
    {
        let currentMinute = moment.utc().minute();

        try {
            minute = parseInt(minute);
            if (minute >= 0 && minute <= 59) {
                this.dueMinute = minute;
            } else {
                console.log('Invalid minute set');
                console.log('setting to current minute');
                this.dueMinute = currentMinute;
            }
        } catch (err) {
            console.log('Error converting minute');
            console.log(err);
            console.log('setting to current minute');
            this.dueMinute = currentMinute;
        }
    }

    public getDueMinute(): number
    {
        return this.dueMinute;
    }

    // creates the actual date to store in the db
    public setDueDate(): void
    {
        // all the validation is done in the setters of the date fields
        // year, month, day hours, minutes
        this.dueDate =  moment.utc()
                        .year(this.getDueYear())
                        .month(this.getDueMonth())
                        .date(this.getDueDay()) // date not day lol, wrong function call will mess up whole date
                        .hour(this.getDueHour())
                        .minute(this.getDueMinute())
                        .second(0) // defaults for second and millisecond
                        .millisecond(0);
    }

    // gets the due date 
    public getDueDate(): any
    {
        return this.dueDate;
    }

    public setReminderInterval(interval: {value: number, measure: string}): void
    {
        if (measure in ValidIntervals.DAY)
        this.interval = interval;
    }

    public getReminderInterval(): {value: number, measure: string}
    {
        return this.interval;
    }


    public addAlert(alert: { value: number, measure: string }): void
    {
        this.alerts.push(alert);
    }

    public getAlerts(): Array<{ value: number, measure: string }>
    {
        return this.alerts;
    }
    
}