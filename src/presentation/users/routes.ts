import { Router } from "express";
import { userController } from "./controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const usersController = new userController();

    // Routes
    router.get("/", (req, res) => usersController.getUsers(req, res));
    router.get("/:id", usersController.getUsersById);
    router.post("/:id", usersController.createUser);
    router.put("/:id", usersController.updateUser);
    router.delete("/:id", usersController.deleteUser);



    return router;
  }
}
