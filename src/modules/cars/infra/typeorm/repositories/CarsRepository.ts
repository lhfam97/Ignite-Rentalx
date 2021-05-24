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
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      description,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }
  // async list(): Promise<Car[]> {
  //   const cars = await this.repository.find();
  //   return cars;
  // }

  // async findByName(name: string): Promise<Car> {
  //   const car = await this.repository.findOne({ name });
  //   return car;
  // }
}

export { CarsRepository };
