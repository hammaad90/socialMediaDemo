import { Application } from 'express';
import { UserRoutes } from './user.routes';
import { TodoRoutes } from './todo.routes';
import { PostRoutes } from './post.route';

export class IndexRoutes {

    private userRoutes: UserRoutes = new UserRoutes();
    private todoRoutes: TodoRoutes = new TodoRoutes();
    private postRoutes: PostRoutes = new PostRoutes();


    public route(api:string , app: Application) {

        this.userRoutes.route(api + '/user', app);
        this.todoRoutes.route(api + '/to-do', app);
        this.postRoutes.route(api + '/post', app);

    }
}