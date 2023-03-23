import * as express from "express";
import * as bodyParser from "body-parser";
import dBConnect from './config/databaseConnection';
import { createAdmin } from './utils/common';
import { IndexRoutes } from "./routes/index.route";
import rateLimit from 'express-rate-limit'

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

   // rate limiter ex:
   private limiter(): void {
      rateLimit({
         windowMs: 60 * 60 * 1000, // 15 minutes
         max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
         standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
         legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      })
   }

   private config(): void {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.app.use(this.limiter)
   }

   // connect to DB
   private connectDb(): void {
      dBConnect();
   }

}
export default new App().app;