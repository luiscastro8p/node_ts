import { Router } from "express";
import { UserRoutes } from "./users/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Routes
    router.use("/api/users", UserRoutes.routes);

    return router;
  }
}
