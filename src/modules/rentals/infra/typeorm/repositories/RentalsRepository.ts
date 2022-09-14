import { IsNull, Repository } from "typeorm";

import { AppDataSource } from "../../../../../../dataSource";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = AppDataSource.getRepository(Rental);
  }

  async findOpenRentalByCar(id: string): Promise<Rental> {
    const openByCar = this.repository.findOneBy({
      id,
      end_date: IsNull(),
    });
    return openByCar;
  }
  async findOpenRentalByUser(id: string): Promise<Rental> {
    const openByUser = this.repository.findOne({
      where: { user_id: id, end_date: IsNull() },
    });
    return openByUser;
  }
  async create({
    car_id,
    expected_return_date,
    user_id,
    end_date,
    total,
    id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = await this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      end_date,
      total,
      id,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOneBy({ id });
    return rental;
  }
}

export { RentalsRepository };
