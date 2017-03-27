import { Todo } from './Todo';

export class TodoList
{
    public list: Array<Todo>;
    public name: string;

    constructor(name: string, list: Array<Todo>)
    {
        this.name = name;
        this.list = list;
    }

    public addTodo(todo): Array<Todo>
    {
        // add todo
        this.list.push(todo);
        return this.list;
    }

    public deleteTodo(todo): Array<Todo>
    {
        // delete todo
        // probably going to need to splice
        return this.list;
    }
}