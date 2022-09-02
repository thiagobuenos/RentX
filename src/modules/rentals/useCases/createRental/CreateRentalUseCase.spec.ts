import dayjs from "dayjs";

import { DayJsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayJsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

describe("Create Rental", () => {
  const dayAdd24h = dayjs().add(25, "hours").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider
    );
  });
  it("should be able to create a new Rental ", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12344",
      expected_return_date: dayAdd24h,
    });

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
});
