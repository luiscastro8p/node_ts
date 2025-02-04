import { UserEntity } from "../entities/user.entity";
import { CreateUserDto, UpdateUserDto } from "../dtos";

export abstract class UserDatasource {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;

  //USER: paginacion
  abstract getAll(): Promise<UserEntity[]>;
  abstract findById(id: number): Promise<UserEntity>;
  abstract updateById(updateUserDto: UpdateUserDto): Promise<UserEntity>;
  abstract deleteById(id: number): Promise<UserEntity>;

}
