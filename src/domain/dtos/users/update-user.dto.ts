export class UpdateUserDto {
  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const obj: { [key: string]: any } = {};
    if (this.name) obj.name = this.name;
    if (this.completedAt) obj.completedAt = this.completedAt;

    return obj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateUserDto?] {
    const { id, name, completedAt } = props;
    let newcompletedAt = completedAt;

    if (!id || isNaN(Number(id))) {
      return ["id must be a valid number"];
    }
    if (!name) return ["name propiety is required"];

    if (completedAt) {
      newcompletedAt = new Date(completedAt);
      if (newcompletedAt.toString() === "Invalid Date") {
        return ["completedAtr must be a valida date"];
      }
    }
    return [undefined, new UpdateUserDto(id, name, completedAt)];
  }
}
