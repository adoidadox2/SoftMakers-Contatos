import { getRepository } from "typeorm";
import { Request, Response } from "express";
import User from "../models/User";
import CreateUserService from "../services/CreateUserService";

class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return response.json(users);
  }
  async store(request: Request, response: Response): Promise<Response> {
    const result = await CreateUserService.execute({
      body: { ...request.body, image: request.file.filename },
    });

    return response.json(result);
  }
  async show(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return response.json(users);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);

    return response.json();
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return response.json(users);
  }
}

export default new UserController();
