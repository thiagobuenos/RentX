import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 50.0,
      license_plate: "AWE-6583",
      fine_amount: 60.0,
      brand: "Car_brand",
      category_id: "category_id",
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list available cars by name", async () => {
    await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description2",
      daily_rate: 50.0,
      license_plate: "AWE-6585",
      fine_amount: 60.0,
      brand: "Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand",
    });
    console.log(cars);
  });
  it("should be able to list available cars by name", async () => {
    await carsRepositoryInMemory.create({
      name: "Car6",
      description: "Car description2",
      daily_rate: 50.0,
      license_plate: "AWE-6588",
      fine_amount: 60.0,
      brand: "Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car6",
    });
    console.log(cars);
  });
  it("should be able to list available cars by category_id", async () => {
    await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description2",
      daily_rate: 50.0,
      license_plate: "AWE-6587",
      fine_amount: 60.0,
      brand: "Car_brand_test",
      category_id: "1345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "1345",
    });
    console.log(cars);
  });
});
