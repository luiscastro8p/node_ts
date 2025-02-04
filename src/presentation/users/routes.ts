import { Router } from "express";
import { userController } from "./controller";
import { UserDatasourceImpl } from "../../infrastructure/datasource/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.datasource.impl";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const datasouce = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(datasouce);
    const usersController = new userController(userRepository);

    // Routes
    router.get("/", (req, res) => usersController.getUsers(req, res));
    router.post("/", usersController.createUser);
    router.get("/:id", usersController.getUsersById);
    router.put("/:id", usersController.updateUser);
    router.delete("/:id", usersController.deleteUser);

    return router;
  }
}
