"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var Todo = (function () {
    function Todo(todo) {
    }
    Todo.prototype.setDueYear = function (year) {
        var currentYear = moment.utc().year();
        try {
            year = parseInt(year);
            if (year >= currentYear && year < 3000) {
                this.dueYear = year;
            }
            else {
                console.log('The year provided is not between the current year and the year 3000');
                console.log('Setting to current year');
                this.dueYear = currentYear;
            }
        }
        catch (err) {
            console.log('Error converting year');
            console.log(err);
            console.log('Setting to current year');
            this.dueYear = currentYear;
        }
    };
    Todo.prototype.getDueYear = function () {
        return this.dueYear;
    };
    Todo.prototype.setDueMonth = function (month) {
        var currentMonth = moment.utc().month();
        try {
            month = parseInt(month);
            if (month >= 0 && month <= 11) {
                this.dueMonth = month;
            }
            else {
                console.log('Invalid month range...');
                console.log('Setting to current month...');
                this.dueMonth = currentMonth;
            }
        }
        catch (err) {
            console.log('Could not parse month');
            console.log(err);
            console.log('Setting to current month');
            this.dueMonth = currentMonth;
        }
    };
    Todo.prototype.getDueMonth = function () {
        return this.dueMonth;
    };
    Todo.prototype.setDueDay = function (day) {
        var currentDay = moment.utc().date();
        try {
            day = parseInt(day);
            if (day >= 1 && day <= 31) {
                this.dueDay = day;
            }
            else {
                console.log('Invalid day number range...');
                console.log('Setting to current day number...');
                this.dueDay = currentDay;
            }
        }
        catch (err) {
            console.log('Could not parse day number');
            console.log(err);
            console.log('Setting to current day number');
            this.dueDay = currentDay;
        }
    };
    Todo.prototype.getDueDay = function () {
        return this.dueDay;
    };
    Todo.prototype.setDueHour = function (hour) {
        var currentHour = moment.utc().hour();
        try {
            hour = parseInt(hour);
            if (hour >= 0 && hour <= 23) {
                this.dueHour = hour;
            }
            else {
                console.log('Invalid hour set');
                console.log('setting to current hour');
                this.dueHour = currentHour;
            }
        }
        catch (err) {
            console.log('Error converting hour');
            console.log(err);
            console.log('setting to current hour');
            this.dueHour = currentHour;
        }
    };
    Todo.prototype.getDueHour = function () {
        return this.dueHour;
    };
    Todo.prototype.setDueMinute = function (minute) {
        var currentMinute = moment.utc().minute();
        try {
            minute = parseInt(minute);
            if (minute >= 0 && minute <= 59) {
                this.dueMinute = minute;
            }
            else {
                console.log('Invalid minute set');
                console.log('setting to current minute');
                this.dueMinute = currentMinute;
            }
        }
        catch (err) {
            console.log('Error converting minute');
            console.log(err);
            console.log('setting to current minute');
            this.dueMinute = currentMinute;
        }
    };
    Todo.prototype.getDueMinute = function () {
        return this.dueMinute;
    };
    Todo.prototype.setDueDate = function () {
        this.dueDate = moment.utc()
            .year(this.getDueYear())
            .month(this.getDueMonth())
            .date(this.getDueDay())
            .hour(this.getDueHour())
            .minute(this.getDueMinute())
            .second(0)
            .millisecond(0);
    };
    Todo.prototype.getDueDate = function () {
        return this.dueDate;
    };
    Todo.prototype.setReminderInterval = function (interval) {
    };
    Todo.prototype.getReminderInterval = function () {
        return this.reminderInterval;
    };
    Todo.prototype.setAlerts = function () {
    };
    Todo.prototype.getAlerts = function () {
        return this.alerts;
    };
    Todo.prototype.setCreatedAt = function () {
    };
    Todo.prototype.getCreatedAt = function () {
        return this.createdAt;
    };
    Todo.prototype.setUpdatedAt = function () {
    };
    Todo.prototype.getUpdatedAt = function () {
        return this.updatedAt;
    };
    return Todo;
}());
exports.Todo = Todo;
//# sourceMappingURL=Todo.js.map