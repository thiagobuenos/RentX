import dayjs from "dayjs";

import { DayJsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayJsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24h = dayjs().add(25, "hours").toDate();
  beforeEach(() => {
    dayJsDateProvider = new DayJsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });
  it("should be able to create a new Rental ", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12344",
      expected_return_date: dayAdd24h,
    });
    await carsRepositoryInMemory.updateAvailable(rental.car_id, false);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("should be not able to create a new Rental where exists a rental open for current user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12344",
        expected_return_date: dayAdd24h,
      });

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12344",
        expected_return_date: dayAdd24h,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to create a new Rental where exists a rental open for current car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12346",
        car_id: "12344",
        expected_return_date: dayAdd24h,
      });

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12344",
        expected_return_date: dayAdd24h,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to create a new Rental with invalid return time ", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12346",
        car_id: "12344",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
