export class CreateUserDto {
  private constructor(public readonly name: string) {}

  static create(props: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name } = props;
    if (!name) return ["name propiety is required", undefined];

    return [undefined, new CreateUserDto(name)];
  }
}
