import { DayJsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/mailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./sendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;
let spy;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    await usersRepositoryInMemory.create({
      driver_license: "517963287",
      email: "bekaz@bojtoc.fr",
      password: "password",
      name: "Bobby Barton",
    });
    spy = spyOn(mailProvider, "sendMail").and.callThrough();

    await sendForgotPasswordMailUseCase.execute("bekaz@bojtoc.fr");

    expect(spy).toBeCalled();
  });

  it("should be not able to send a forgot password mail to user not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("dsadf@sda.cc")
    ).rejects.toEqual(new AppError("User not found"));
  });

  it("should be able to create an users token", async () => {
    const genereteTokenMail = spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "517963287",
      email: "upnese@umilesked.gw",
      password: "password",
      name: "Alberta Lamb",
    });

    await sendForgotPasswordMailUseCase.execute("upnese@umilesked.gw");

    expect(genereteTokenMail).toBeCalled();
  });
});
