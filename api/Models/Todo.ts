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
    private name: string;
    private desc: string;

    private todoList: string;
    private labels: Array<string>;

    private dueYear: string;
    private dueMonth: string;
    private dueDay: string;
    private dueHour: string;
    private dueMinute: string;

    private dueDate: string;

    private alerts: Array<string>;
    private reminderInterval: string;

    private createdAt: string;
    private updatedAt: string;

    constructor(todo: Object)
    {

    }



    public setDueYear(year: any): void
    {
        let date = new Date();
        let currentYear = date.getUTCFullYear();
        if (year) {    
            try {
                year = parseInt(year);
                if (year >= currentYear && year < 3000) {
                    this.dueYear = year;
                }
            } catch (err) {
                console.log('Error converting year');
                console.log(err);
                console.log('setting to current year');
                this.dueYear = currentYear.toString();
            }
            
        } else {
            this.dueYear = currentYear.toString();
        }
    }

    public getDueYear(): string
    {
        return this.dueYear;
    }

    public setDueMonth(month): void
    {
        let date = new Date();
        let currentMonth = date.getUTCMonth();

        if (month) {
            try {
                month = parseInt(month);
                if (month >= 1 && month <= 12) {
                    this.dueMonth = month;
                } else {
                    console.log('Invalid month value...');
                    console.log('Setting to current month');
                    this.dueMonth = currentMonth.toString();
                }
            } catch (err) {
                console.log('Error converting month');
                console.log(err);
                console.log('setting to current year');
                this.dueMonth = currentMonth.toString();
            }
        } else {
            this.dueMonth = currentMonth.toString();
        }
    }

    public getDueMonth(): string
    {
        return this.dueMonth;
    }

    public setDueDay(day): void
    {
        let date = new Date();
        let currentDay = date.getUTCDay();

        if (day) {
            try {
                day = parseInt(day);
                if (day >= 1 && day <= 31) {
                    this.dueDay = day;
                } else {
                    console.log('Invalid due DAY');
                    console.log('Setting to the current day number');
                    this.dueDay = currentDay.toString();
                }
            } catch (err) {
                console.log('Error converting DAY');
                console.log(err);
                console.log('Settings to todays number');
                this.dueDay = currentDay.toString();
            }
        } else {
            this.dueDay = currentDay.toString();
        }
    }

    public getDueDay(): string 
    {
        return this.dueDay;
    }

    public setDueHour(hour): void
    {
        let date = new Date();
        let currentHour = date.getUTCHours();

        if (hour) {
            try {
                hour = parseInt(hour);
                if (hour >= 0 && hour <= 23) {
                    this.dueHour = hour;
                } else {
                    console.log('Invalid hour set');
                    console.log('setting to current hour');
                    this.dueHour = currentHour.toString();
                }
            } catch (err) {
                console.log('Error converting hour');
                console.log('setting to current hour');
                this.dueHour = currentHour.toString();
            }
        } else {
            this.dueHour = currentHour.toString();
        } 
    }

    public getDueHour(): string
    {
        return this.dueHour;
    }

    public setDueMinute(minute): void
    {
        let date = new Date();
        let currentMinute = date.getUTCMinutes();

        if (minute) {
            try {
                minute = parseInt(minute);
                if (minute >= 0 && minute <= 59) {
                    this.dueMinute = minute;
                } else {
                    console.log('Invalid minute set');
                    console.log('Setting to current minute');
                    this.dueMinute = currentMinute.toString();
                }
            } catch (err) {
                console.log('Error converting minute');
                console.log('Setting to curent minute');
                this.dueMinute = currentMinute.toString();
            }
        } else {
            this.dueMinute = currentMinute.toString();
        }
    }

    public getDueMinute(): string
    {
        return this.dueMinute;
    }

    // creates the actual date to store in the db
    public setDueDate(): void
    {
        // use prebuilt variables
    }

    // gets the due date 
    public getDueDate(): string
    {
        return this.dueDate;
    }

    public setReminderInterval(interval): void
    {
        // intervals validation
        // every day
        // every other day
        // every third day
        // every five days

        // every week
        // every other week

        // every month
        // every other month
        // every six months

        // every year
    }

    public getReminderInterval(): string
    {
        return this.reminderInterval;
    }


    public setAlerts(): void
    {
        // alert validation

        // 0 min
        // 10 min
        // 15 min
        // 30 min
        // 45 min

        // 1 hour
        // 2 hours
        // 3 hours
        // 4 hours
        // 5 hours
        // 6 hours

        // 1 day
        // 2 days
        // 3 days
        // 4 days
        // 5 days
        // 6 days
        
        // 1 week
        // 2 weeks
        // 1 month
    }

    public getAlerts(): Array<string>
    {
        return this.alerts;
    }

    public setCreatedAt(): void
    {

    }

    public getCreatedAt(): string
    {
        return this.createdAt;
    }

    public setUpdatedAt(): void
    {

    }

    public getUpdatedAt(): string
    {
        return this.updatedAt;
    }

    
}