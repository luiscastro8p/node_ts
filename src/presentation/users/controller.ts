import { Request, Response } from "express";

const users = [
  { id: 1, name: "Luis", createdAt: new Date() },
  { id: 2, name: "Shuy", createdAt: new Date() },
];

export class userController {
  constructor() {}

  public getUsers = (req: Request, res: Response) => {
    res.json(users);
  };

  public getUsersById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      res.status(400).json({ error: "ID argument is not a number" });

    const user = users.find((item) => item.id == id);
    if (user) {
      res.json(user);
    }

    res.status(404).json({ error: `User ${id} not found` });
  };

  public createUser = (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) res.status(400).json({ error: "name property is required" });

    users.push({
      id: users.length + 1,
      name,
      createdAt: new Date(),
    });
    res.json(req.body);
  };

  public updateUser = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      res.status(400).json({ error: "ID argument is not a number" });

    const user = users.find((item) => item.id == id);
    if (!user) res.status(404).json({ error: `User ${id} not found` });

    const { name, createdAt } = req.body;
    if (!name) res.status(400).json({ error: "name property is required" });
    if (user) {
      user.name = name || user.name;
      user.createdAt = createdAt || user.createdAt;
    }

    res.json(user);
  };
  public deleteUser = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      res.status(400).json({ error: "ID argument is not a number" });

    const user = users.find((item) => item.id == id);
    if (!user) res.status(404).json({ error: `User ${id} not found` });
    if (user) {
      users.splice(users.indexOf(user), 1);
      res.json(user);
    }
  };
}
