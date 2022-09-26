import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../../dataSource";
import { ICreateUserDTO } from "../../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
    id,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      id,
      avatar,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });
    return user;
  }
}

export { UsersRepository };
