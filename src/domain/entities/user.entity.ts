export class UserEntity {
  constructor(
    public id: number,
    public name: string,
    public completedAt: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, name, completedAt } = object;

    if (!id) throw "Id is required";
    if (!name) throw "text is required";

    let newCompletedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw "completedAt is not a valid date";
      }
    }
    return new UserEntity(id, name, completedAt);
  }
}
