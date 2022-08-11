import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car ", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "description Car",
      daily_rate: 100,
      license_plate: "abc-123",
      fine_amount: 10,
      brand: "brand",
      category_id: "category",
    });
    expect(car).toHaveProperty("id");
  });
  it("should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car1",
        description: "description Car",
        daily_rate: 100,
        license_plate: "abc-123",
        fine_amount: 10,
        brand: "brand",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Name Car2",
        description: "description Car",
        daily_rate: 100,
        license_plate: "abc-123",
        fine_amount: 10,
        brand: "brand",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with available default true", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car1",
      description: "description Car",
      daily_rate: 100,
      license_plate: "abc-123",
      fine_amount: 10,
      brand: "brand",
      category_id: "category",
    });
    expect(car.available).toBe(true);
  });
});
