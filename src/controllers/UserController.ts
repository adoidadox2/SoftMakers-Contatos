import { getRepository } from "typeorm";
import { Request, Response } from "express";
import User from "../models/User";

class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return response.json(users);
  }
  async store(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(User);

    return response.json();
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
