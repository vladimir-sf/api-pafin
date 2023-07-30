interface UserProps {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}

export default class User {
  public id: string | undefined;
  public name: string | undefined;
  public email: string | undefined;
  public password: string | undefined;
  public createdAt: string | undefined;
  public updatedAt: string | undefined;

  public static fromAny(props: UserProps): User {
    const user = new User();

    if (props.id !== undefined) {
      user.id = props.id;
    }

    if (props.name !== undefined) {
      user.name = props.name;
    }

    if (props.email !== undefined) {
      user.email = props.email;
    }

    if (props.password !== undefined) {
      user.password = props.password;
    }

    return user;
  }

  // @todo: add toDb
  // @todo: fromDb
  // @todo: validate
}
