import * as express from "express";
import * as bodyParser from "body-parser";
import dBConnect from './config/databaseConnection';
import { createAdmin } from './utils/common';
import { IndexRoutes } from "./routes/index.route";

class App {

   public app: express.Application;
   // private userRoutes: UserRoutes = new UserRoutes();
   private indexRoutes: IndexRoutes = new IndexRoutes();


   constructor() {
      this.app = express();
      this.config();
      this.connectDb();
      this.indexRoutes.route('/api', this.app);
      createAdmin()
   }

   private config(): void {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));
   }

   // connect to DB
   private connectDb(): void {
      dBConnect();
   }

}
export default new App().app;