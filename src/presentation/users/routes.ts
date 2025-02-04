import { Router } from "express";
import { userController } from "./controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const usersController = new userController();

    // Routes
    router.get("/", (req, res) => usersController.getUsers(req, res));
    router.post("/", usersController.createUser);
    router.get("/:id", usersController.getUsersById);
    router.put("/:id", usersController.updateUser);
    router.delete("/:id", usersController.deleteUser);



    return router;
  }
}
