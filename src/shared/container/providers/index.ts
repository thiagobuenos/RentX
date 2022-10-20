import { container } from "tsyringe";

import { IDateProvider } from "./dateProvider/IDateProvider";
import { DayJsDateProvider } from "./dateProvider/implementations/DayJsDateProvider";
import { IMailProvider } from "./mailProvider/IMailProvider";
import { EtherealMaiProvider } from "./mailProvider/implementations/EtherealMaiProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);
container.registerInstance<IMailProvider>(
  "EtherealMaiProvider",
  new EtherealMaiProvider()
);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  S3StorageProvider
);
