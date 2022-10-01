import { container } from "tsyringe";

import { IDateProvider } from "./dateProvider/IDateProvider";
import { DayJsDateProvider } from "./dateProvider/implementations/DayJsDateProvider";
import { IMailProvider } from "./mailProvider/IMailProvider";
import { EtherealMaiProvider } from "./mailProvider/implementations/EtherealMaiProvider";

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);
container.registerInstance<IMailProvider>(
  "EtherealMaiProvider",
  new EtherealMaiProvider()
);
