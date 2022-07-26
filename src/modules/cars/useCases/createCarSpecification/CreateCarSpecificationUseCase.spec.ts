import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });
  it("should not be able to add a new specifications_cars an a not exists car", async () => {
    const car_id = "12345";
    const specifications_id = ["123456"];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  });
  it("should be able to add a new specifications_cars to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description2",
      daily_rate: 50.0,
      license_plate: "AWE-6587",
      fine_amount: 60.0,
      brand: "Car_brand_test",
      category_id: "1345",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test",
    });
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
