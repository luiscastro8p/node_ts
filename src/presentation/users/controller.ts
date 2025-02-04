import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateUserDto, UpdateUserDto } from "../../domain/dtos";

export class userController {
  constructor() {}

  public getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
  };

  public getUsersById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      res.status(400).json({ error: "ID argument is not a number" });

    const userById = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (userById) {
      res.json(userById);
    }

    res.status(404).json({ error: `User ${id} not found` });
  };

  public createUser = async (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);

    if (error) res.status(400).json({ error: error });

    const user = await prisma.user.create({
      data: createUserDto!,
    });

    res.json(user);
  };

  public updateUser = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const [error, updateUserDto] = UpdateUserDto.create({ ...req.body, id });
    if (error) res.status(400).json({ error });

    const userById = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!userById) res.status(404).json({ error: `User ${id} not found` });
    const values = updateUserDto!.values
    const completedAt = new Date(values.completedAt).toISOString();
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...values,
        completedAt:completedAt
      },
    });

    res.json(updateUser);
  };
  public deleteUser = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      res.status(400).json({ error: "ID argument is not a number" });

    const userById = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!userById) res.status(404).json({ error: `User ${id} not found` });

    const deleted = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.json(deleted);
  };
}
