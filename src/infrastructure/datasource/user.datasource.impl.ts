import { prisma } from "../../data/postgres";
import {
  CreateUserDto,
  UpdateUserDto,
  UserDatasource,
  UserEntity,
} from "../../domain";

export class UserDatasourceImpl implements UserDatasource {
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await prisma.user.create({
      data: createUserDto!,
    });

    return UserEntity.fromObject(user);
  }
  async getAll(): Promise<UserEntity[]> {
    const users = await prisma.user.findMany();
    return users.map((user) => UserEntity.fromObject(user));
  }
  async findById(id: number): Promise<UserEntity> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) throw `User with id ${id} not found`;
    return UserEntity.fromObject(user);
  }
  async updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.findById(updateUserDto.id);

    const updateUser = await prisma.user.update({
      where: {
        id: updateUserDto.id,
      },
      data: {
        ...updateUserDto,
        completedAt: updateUserDto.completedAt,
      },
    });

    return UserEntity.fromObject(updateUser);
  }
  async deleteById(id: number): Promise<UserEntity> {
    await this.findById(id);
    const deleted = await prisma.user.delete({
      where: {
        id,
      },
    });

    return UserEntity.fromObject(deleted);
  }
}
