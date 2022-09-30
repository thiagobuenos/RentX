import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { DayJsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayJsDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: DayJsDateProvider
  ) {}
  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });
  }
}

export { SendForgotPasswordMailUseCase };
