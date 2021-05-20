import { ICreateUserDTO } from "../dtos/ICreateUsrDTO";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
