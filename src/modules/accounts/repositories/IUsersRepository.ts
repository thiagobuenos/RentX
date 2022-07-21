import { ICreateUserDTO } from "../dtos/ICreateUsersDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findbyEmail(email: string): Promise<User>;
}

export { IUsersRepository };
