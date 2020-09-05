import { getRepository } from "typeorm";
import User from "../models/User";
import Address from "../models/Address";
import CreateUserDTO from "../dtos/CreateUserDTO";

class CreateUserService {
  async execute({
    body: {
      name,
      last_name,
      phone,
      email,
      cep,
      state,
      city,
      neighborhood,
      street,
      house_number,
      image,
    },
  }: CreateUserDTO): Promise<User> {
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);

    const createdUser = userRepository.create({
      name,
      last_name,
      phone,
      email,
      image,
    });

    const existingAddress = await addressRepository.findOne({
      where: {
        cep,
        state,
        city,
        neighborhood,
        street,
        house_number,
      },
    });

    if (!existingAddress) {
      const createdAddres = addressRepository.create({
        cep,
        state,
        city,
        neighborhood,
        street,
        house_number,
      });

      createdUser.address = await addressRepository.save(createdAddres);
    } else {
      createdUser.address = existingAddress;
    }

    await userRepository.save(createdUser);

    return createdUser;
  }
}

export default new CreateUserService();
