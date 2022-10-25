import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMaiProvider } from "./implementations/EtherealMaiProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider = {
  ethereal: container.resolve(EtherealMaiProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER]
);
