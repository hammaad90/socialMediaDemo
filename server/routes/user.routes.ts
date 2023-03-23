import { Application, Request, Response } from 'express';
import { authValidator } from '../config/tokenValidator';
import { UserController } from '../controllers/userController/user.controller';

export class UserRoutes {

    private user_controller: UserController = new UserController();

    public route(api:string, app: Application) {

        // to register user
        app.post(api + '/', authValidator, (req: Request, res: Response) => {
            this.user_controller.registerUser(req, res);
        });

        // to let user login
        app.post(api + '/login', (req: Request, res: Response) => {
            this.user_controller.login(req, res);
        });

        // to get all user
        app.get(api + '/', authValidator, (req: Request, res: Response) => {
            this.user_controller.getAllUser(req, res);
        });

         // to get user by id
         app.get(api + '/:id', authValidator, (req: Request, res: Response) => {
            this.user_controller.getUserById(req, res);
        });

        // to update a user
        app.put(api + '/:id', authValidator, (req: Request, res: Response) => {
            this.user_controller.updateUser(req, res);
        });

         // to update a user
         app.delete(api + '/:id', authValidator, (req: Request, res: Response) => {
            this.user_controller.deleteUser(req, res);
        })

    }
}