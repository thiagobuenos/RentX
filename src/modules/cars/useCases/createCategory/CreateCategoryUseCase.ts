import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  execute({ name, description }: IRequest): void {
    const categoryAlreadyExits = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExits) {
      throw new Error("Category Already Exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
