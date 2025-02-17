import { getRepository } from "typeorm";
import { Request, Response } from "express";
import User from "../models/User";
import CreateUserService from "../services/CreateUserService";
import removeEmptyAddresses from "../utils/removeEmptyAddresses";
import removeUselessImage from "../utils/removeUselessImage";
import UpdateUserService from "../services/UpdateUserService";
import AppError from "../errors/AppError";
class UserController {
  newUser(request: Request, response: Response) {
    return response.render("../views/createUser");
  }
  async edit(request: Request, response: Response): Promise<void> {
    const userRepository = getRepository(User);

    const { userId } = request.params;

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["address"],
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }
    return response.render("../views/updateUser", {
      user,
    });
  }

  async index(request: Request, response: Response): Promise<void> {
    const userRepository = getRepository(User);

    const page = request.query?.page as string;

    const users = await userRepository.find({
      order: {
        name: "ASC",
      },
      skip: parseInt(page) - 1 < 0 || undefined ? 0 : (parseInt(page) - 1) * 10,
      take: 10,
      select: ["id", "name", "last_name", "phone", "image"],
    });

    const serializedUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        phone: user.phone,
        image_url: user.image
          ? `http://localhost:${process.env.PORT}/uploads/${user.image}`
          : null,
      };
    });

    return response.render("../views/indexUser", { serializedUsers });
  }
  async store(request: Request, response: Response): Promise<void> {
    const result = await CreateUserService.execute({
      body: { ...request.body, image: request.file?.filename },
    });

    return response.redirect("/user");
  }
  async show(request: Request, response: Response): Promise<void> {
    const userRepository = getRepository(User);

    const { userId } = request.params;

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["address"],
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const serializedUser = {
      ...user,
      image_url: user.image
        ? `http://localhost:${process.env.PORT}/uploads/${user.image}`
        : null,
    };

    return response.render("../views/showUser", { serializedUser });
  }

  async update(request: Request, response: Response): Promise<void> {
    const result = await UpdateUserService.execute({
      body: {
        ...request.body,
        newImage: request.file?.filename,
        userId: request.params.userId,
      },
    });

    return response.redirect(`/user/${result.id}`);
  }
  async delete(request: Request, response: Response): Promise<void> {
    const userRepository = getRepository(User);

    const { userId } = request.params;

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const imageToBeDeleted = user.image;

    await userRepository.remove(user);

    if (imageToBeDeleted) {
      removeUselessImage(imageToBeDeleted);
    }

    await removeEmptyAddresses();

    return response.redirect("/user");
  }
}

export default new UserController();
