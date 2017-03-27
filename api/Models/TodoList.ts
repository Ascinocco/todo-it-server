export class TodoList
{
    public list: Array<any>;
    public name: string;

    constructor(name: string, list: Array<any>)
    {
        this.name = name;
        this.list = list;
    }

    public addTodo(todo): Array<any>
    {
        // add todo
        this.list.push(todo);
        return this.list;
    }

    public deleteTodo(todo): Array<any>
    {
        // delete todo
        // probably going to need to splice
        return this.list;
    }
}