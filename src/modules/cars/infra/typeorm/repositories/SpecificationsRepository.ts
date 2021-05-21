import { getRepository, Repository } from "typeorm";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "@modules/cars/repositories/ISpecificationsRepository";
//DTO => Data transfer object

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  // private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Specification);
  }

  // public static getInstance(): ISpecificationsRepository {
  //   if (!SpecificationsRepository.INSTANCE) {
  //     SpecificationsRepository.INSTANCE = new SpecificationsRepository();
  //   }

  //   return SpecificationsRepository.INSTANCE;
  // }
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
    // const specification = new Specification();

    // Object.assign(specification, {
    //   name,
    //   description,
    //   created_at: new Date(),
    // });
    // this.specifications.push(specification);
  }
  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }
}

export { SpecificationsRepository };
