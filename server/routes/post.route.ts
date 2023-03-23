import { Application, Request, Response } from 'express';
import { authValidator } from '../config/tokenValidator';
import { TodoController } from '../controllers/userController/todoController/todo.controller';

export class PostRoutes {

    private todo: TodoController = new TodoController();

    public route(api:string, app: Application) {

        // to create todo
        app.post(api + '/', authValidator, (req: Request, res: Response) => {
            this.todo.createTodo(req, res);
        });

        // to get all todo
        app.get(api + '/', authValidator, (req: Request, res: Response) => {
            this.todo.getAllTodo(req, res);
        });

        // to get todo by id
        app.get(api + '/self', authValidator, (req: Request, res: Response) => {
            this.todo.getTodoByID(req, res);
        });

        // to update todo
        app.put(api + '/:id', authValidator, (req: Request, res: Response) => {
            this.todo.updateTodo(req, res);
        });

        // to delete todo
        app.delete(api + '/:id', authValidator, (req: Request, res: Response) => {
            this.todo.deleteTodo(req, res);
        });

    }
}