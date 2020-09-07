import { getRepository } from "typeorm";
import User from "../models/User";
import Address from "../models/Address";
import UpdateUserDTO from "../dtos/UpdateUserDTO";
import AppError from "../errors/AppError";
import removeUselessImage from "../utils/removeUselessImage";
import removeEmptyAddresses from "../utils/removeEmptyAddresses";

import objectFormatter from "../utils/objectFormatter";

class UpdateUserService {
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
      newImage,
      userId,
    },
  }: UpdateUserDTO): Promise<User> {
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const existingAddress = await addressRepository.findOne({
      where: objectFormatter({
        cep,
        state,
        city,
        neighborhood,
        street,
        house_number,
      }),
    });

    if (!existingAddress) {
      const createdAddress = addressRepository.create(
        objectFormatter({
          cep,
          state,
          city,
          neighborhood,
          street,
          house_number,
        })
      );
      user.address = await addressRepository.save(createdAddress);
    }

    user.name = name;
    user.last_name = last_name;
    user.email = email;
    user.phone = phone;

    if (newImage) {
      if (user.image) {
        const oldImage = user.image;

        removeUselessImage(oldImage);
      }

      user.image = newImage;
    }

    const updatedUser = await userRepository.save(user);

    await removeEmptyAddresses();

    return updatedUser;
  }
}

export default new UpdateUserService();
