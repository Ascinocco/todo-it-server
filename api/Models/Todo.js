"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Todo = (function () {
    function Todo(todo) {
    }
    Todo.prototype.setDueYear = function (year) {
        var date = new Date();
        var currentYear = date.getUTCFullYear();
        if (year) {
            try {
                year = parseInt(year);
                if (year >= currentYear && year < 3000) {
                    this.dueYear = year;
                }
            }
            catch (err) {
                console.log('Error converting year');
                console.log(err);
                console.log('setting to current year');
                this.dueYear = currentYear.toString();
            }
        }
        else {
            this.dueYear = currentYear.toString();
        }
    };
    Todo.prototype.getDueYear = function () {
        return this.dueYear;
    };
    Todo.prototype.setDueMonth = function (month) {
        var date = new Date();
        var currentMonth = date.getUTCMonth();
        if (month) {
            try {
                month = parseInt(month);
                if (month >= 1 && month <= 12) {
                    this.dueMonth = month;
                }
                else {
                    console.log('Invalid month value...');
                    console.log('Setting to current month');
                    this.dueMonth = currentMonth.toString();
                }
            }
            catch (err) {
                console.log('Error converting month');
                console.log(err);
                console.log('setting to current year');
                this.dueMonth = currentMonth.toString();
            }
        }
        else {
            this.dueMonth = currentMonth.toString();
        }
    };
    Todo.prototype.getDueMonth = function () {
        return this.dueMonth;
    };
    Todo.prototype.setDueDay = function (day) {
        var date = new Date();
        var currentDay = date.getUTCDay();
        if (day) {
            try {
                day = parseInt(day);
                if (day >= 1 && day <= 31) {
                    this.dueDay = day;
                }
                else {
                    console.log('Invalid due DAY');
                    console.log('Setting to the current day number');
                    this.dueDay = currentDay.toString();
                }
            }
            catch (err) {
                console.log('Error converting DAY');
                console.log(err);
                console.log('Settings to todays number');
                this.dueDay = currentDay.toString();
            }
        }
        else {
            this.dueDay = currentDay.toString();
        }
    };
    Todo.prototype.getDueDay = function () {
        return this.dueDay;
    };
    Todo.prototype.setDueHour = function (hour) {
        var date = new Date();
        var currentHour = date.getUTCHours();
        if (hour) {
            try {
                hour = parseInt(hour);
                if (hour >= 0 && hour <= 23) {
                    this.dueHour = hour;
                }
                else {
                    console.log('Invalid hour set');
                    console.log('setting to current hour');
                    this.dueHour = currentHour.toString();
                }
            }
            catch (err) {
                console.log('Error converting hour');
                console.log('setting to current hour');
                this.dueHour = currentHour.toString();
            }
        }
        else {
            this.dueHour = currentHour.toString();
        }
    };
    Todo.prototype.getDueHour = function () {
        return this.dueHour;
    };
    Todo.prototype.setDueMinute = function (minute) {
        var date = new Date();
        var currentMinute = date.getUTCMinutes();
        if (minute) {
            try {
                minute = parseInt(minute);
                if (minute >= 0 && minute <= 59) {
                    this.dueMinute = minute;
                }
                else {
                    console.log('Invalid minute set');
                    console.log('Setting to current minute');
                    this.dueMinute = currentMinute.toString();
                }
            }
            catch (err) {
                console.log('Error converting minute');
                console.log('Setting to curent minute');
                this.dueMinute = currentMinute.toString();
            }
        }
        else {
            this.dueMinute = currentMinute.toString();
        }
    };
    Todo.prototype.getDueMinute = function () {
        return this.dueMinute;
    };
    Todo.prototype.setDueDate = function () {
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