import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { CarsImagesRepository } from "../../infra/typeorm/repositories/CarsImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: CarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
