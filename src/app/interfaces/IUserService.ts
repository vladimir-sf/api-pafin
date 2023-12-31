import User from "../models/User";

export default interface IUserService {
  /**
   * Method to list users
   * @returns {Promise<User[]>}
   */
  list(): Promise<User[]>;

  /**
   * Method to get a user by id
   * @param {string} id
   * @returns {Promise<User | null>}
   */
  get(id: string): Promise<User | null>;

  /**
   * Method to create a user
   * @param {User} obj
   * @returns {Promise<User>}
   */
  create(obj: User): Promise<User>;

  /**
   * Method to update a user
   * @param {string} id
   * @param {User} obj
   * @returns {Promise<User>}
   */
  update(id: string, obj: User): Promise<User>;

  /**
   * Method to delete a user by id
   * @param {string} id
   * @returns {Promise<string>}
   */
  delete(id: string): Promise<void>;

  /**
   * Method to get a user by email
   * @param {string} email
   * @returns {Promise<User | undefined>}
   */
  getByEmail(email: string): Promise<User | null>;
}
