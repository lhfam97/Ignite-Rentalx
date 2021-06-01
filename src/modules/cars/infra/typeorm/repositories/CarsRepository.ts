import { getRepository, Repository } from "typeorm";

import { Car } from "../entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    brand,
    description,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      description,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  async findAvailable(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]> {
    const carsQuery = this.repository.createQueryBuilder("cars");
    // .where("available=:available", { available: true });

    // if (brand) {
    //   carsQuery.andWhere("cars.brand=:brand", { brand });
    // }
    // if (name) {
    //   carsQuery.andWhere("cars.name=:name", { name });
    // }
    // if (category_id) {
    //   carsQuery.andWhere("cars.category_id=:category_id", { category_id });
    // }
    const cars = await carsQuery.getMany();
    return cars;
  }
  // async list(): Promise<Car[]> {
  //   const cars = await this.repository.find();
  //   return cars;
  // }

  // async findByName(name: string): Promise<Car> {
  //   const car = await this.repository.findOne({ name });
  //   return car;
  // }
  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);
    return car;
  }
}

export { CarsRepository };
