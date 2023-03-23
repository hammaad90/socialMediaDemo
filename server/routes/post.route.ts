import { Application, Request, Response } from 'express';
import { authValidator } from '../config/tokenValidator';
import { PostController } from '../controllers/postControler/post.controller';

export class PostRoutes {

    private post: PostController = new PostController();

    public route(api:string, app: Application) {

        // to create todo
        app.post(api + '/', authValidator, (req: Request, res: Response) => {
            this.post.createPost(req, res);
        });

        // to add comment on post
        app.post(api + '/comment/:id', authValidator, (req: Request, res: Response) => {
            this.post.addComment(req, res);
        });

        // to add comment on post
        app.get(api + '/comment/:postId', authValidator, (req: Request, res: Response) => {
            this.post.getCommentOfPost(req, res);
        });

        // to get all todo
        app.get(api + '/', authValidator, (req: Request, res: Response) => {
            this.post.getAllPost(req, res);
        });

        // to get todo by id
        app.get(api + '/self', authValidator, (req: Request, res: Response) => {
            this.post.getPostByID(req, res);
        });

        // to update todo
        app.put(api + '/:id', authValidator, (req: Request, res: Response) => {
            this.post.updatePost(req, res);
        });

        // to delete todo
        app.delete(api + '/:id', authValidator, (req: Request, res: Response) => {
            this.post.deletePost(req, res);
        });

    }
}