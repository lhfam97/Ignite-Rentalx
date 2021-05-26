import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car Description",
      daily_rate: 110,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "Car_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available car by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car Description",
      daily_rate: 110,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available car by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Car Description",
      daily_rate: 110,
      license_plate: "ABC-1235",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car 3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available car by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 4",
      description: "Car Description",
      daily_rate: 110,
      license_plate: "ABC-1236",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
