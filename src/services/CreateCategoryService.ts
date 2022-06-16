import { Category } from "../model/category";
import { CategoriesRepository } from "../repositories/CategoryRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}
  execute({ name, description }: IRequest): void {
    const categoryAlreadyExits = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExits) {
      throw new Error("Category Already Exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
