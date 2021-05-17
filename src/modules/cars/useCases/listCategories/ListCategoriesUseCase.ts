import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("categoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
