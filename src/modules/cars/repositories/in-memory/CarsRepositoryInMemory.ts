import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    this.cars.push(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailableCars(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const availableCars = await this.cars.filter((car) => {
      if (
        car.available === true ||
        (category_id && car.category_id === category_id) ||
        (brand && car.brand === brand) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });
    return availableCars;
  }
}

export { CarsRepositoryInMemory };
