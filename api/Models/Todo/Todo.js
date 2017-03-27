"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var ValidAlerts_1 = require("./Constants/ValidAlerts");
var ValidIntervals_1 = require("./Constants/ValidIntervals");
var Todo = (function () {
    function Todo(todo) {
        this.alerts = [];
        this.labels = [];
        if (todo["name"]) {
            this.name = todo["name"];
        }
        else {
            this.name = 'My new todo';
        }
        if (todo["desc"]) {
            this.desc = todo["desc"];
        }
        else {
            this.desc = "";
        }
        if (todo["projectName"]) {
            this.projectName = todo["projectName"];
        }
        else {
            this.projectName = "Default";
        }
        if (todo["labels"]) {
            var tempLabels = todo["labels"];
            for (var x = 0; x < tempLabels.length; x++) {
                this.addLabel(tempLabels[x]);
            }
        }
        if (todo["dueYear"]) {
            this.setDueYear(todo["dueYear"]);
        }
        else {
            this.setDueYear(moment.utc().year());
        }
        if (todo["dueMonth"]) {
            this.setDueMonth(todo["dueMonth"]);
        }
        else {
            this.setDueMonth(moment.utc().month());
        }
        if (todo["dueDay"]) {
            this.setDueDay(todo["dueDay"]);
        }
        else {
            this.setDueDay(moment.utc().date());
        }
        if (todo["dueHour"]) {
            this.setDueHour(todo["dueHour"]);
        }
        else {
            this.setDueHour(moment.utc().hour());
        }
        if (todo["dueMinute"]) {
            this.setDueMinute(todo["dueMinute"]);
        }
        else {
            this.setDueMinute(moment.utc().minute());
        }
        this.createDueDate();
        if (todo["alerts"]) {
            var tempAlerts = todo["alerts"];
            for (var i = 0; i < tempAlerts.length; i++) {
                this.addAlert(tempAlerts[i]);
            }
        }
        if (todo["interval"]) {
            var tempInterval = todo["interval"];
            this.setInterval(tempInterval);
        }
        else {
            this.setInterval({ value: ValidIntervals_1.ValidIntervals.NONE.ZERO, unit: ValidIntervals_1.ValidIntervals.NONE.unit });
        }
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
    Todo.prototype.createDueDate = function () {
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
    Todo.prototype.setInterval = function (interval) {
        var validInterval = false;
        for (var unitKey in ValidIntervals_1.ValidIntervals) {
            if (interval.unit === ValidIntervals_1.ValidIntervals[unitKey].unit) {
                for (var intervalKey in ValidIntervals_1.ValidIntervals[unitKey]) {
                    if (interval.value === ValidIntervals_1.ValidIntervals[unitKey][intervalKey]) {
                        validInterval = true;
                    }
                }
            }
        }
        if (validInterval) {
            this.interval = interval;
        }
        else {
            this.interval = {
                value: ValidIntervals_1.ValidIntervals.NONE.ZERO,
                unit: ValidIntervals_1.ValidIntervals.NONE.unit
            };
        }
    };
    Todo.prototype.getInterval = function () {
        return this.interval;
    };
    Todo.prototype.addAlert = function (alert) {
        for (var unitKey in ValidAlerts_1.ValidAlerts) {
            if (alert.unit === ValidAlerts_1.ValidAlerts[unitKey].unit) {
                for (var alertValue in ValidAlerts_1.ValidAlerts[unitKey]) {
                    if (alert.value === ValidAlerts_1.ValidAlerts[unitKey][alertValue]) {
                        if (!this.isAlertDuplicate(alert)) {
                            this.alerts.push(alert);
                        }
                    }
                }
            }
        }
    };
    Todo.prototype.isAlertDuplicate = function (alert) {
        for (var i = 0; i < this.alerts.length; i++) {
            if (alert.value === this.alerts[i].value && alert.unit === this.alerts[i].unit) {
                console.log('Alert already exsists...');
                console.log('Skipping...');
                return true;
            }
        }
        return false;
    };
    Todo.prototype.removeAlert = function (alert) {
        for (var i = 0; i < this.alerts.length; i++) {
            if (alert.value === this.alerts[i].value && alert.unit === this.alerts[i].unit) {
                this.alerts.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    Todo.prototype.getAlerts = function () {
        return this.alerts;
    };
    Todo.prototype.addLabel = function (label) {
        if (!this.isLabelDuplicate(label)) {
            this.labels.push(label);
        }
    };
    Todo.prototype.isLabelDuplicate = function (label) {
        console.log(label);
        for (var i = 0; i < this.labels.length; i++) {
            if (label.toUpperCase() === this.labels[i].toUpperCase()) {
                console.log('Label' + label + ' already exists...');
                console.log('Skipping...');
                return true;
            }
        }
        return false;
    };
    Todo.prototype.removeLabel = function (label) {
        for (var i = 0; i < this.labels.length; i++) {
            if (label.toUpperCase() === this.labels[i].toUpperCase()) {
                this.labels.splice(i, 1);
            }
        }
    };
    Todo.prototype.getLabels = function () {
        return this.labels;
    };
    return Todo;
}());
exports.Todo = Todo;
//# sourceMappingURL=Todo.js.map