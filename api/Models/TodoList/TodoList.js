"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TodoList = (function () {
    function TodoList(name, list) {
        this.name = name;
        this.list = list;
    }
    TodoList.prototype.addTodo = function (todo) {
        this.list.push(todo);
        return this.list;
    };
    TodoList.prototype.deleteTodo = function (todo) {
        return this.list;
    };
    return TodoList;
}());
exports.TodoList = TodoList;
//# sourceMappingURL=TodoList.js.map