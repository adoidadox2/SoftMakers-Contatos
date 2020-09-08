import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import AdminRepository from "../repositories/AdminRepository";
import AppError from "../errors/AppError";

class AdminController {
  index(request: Request, response: Response) {
    return response.render("../views/admin");
  }
  async store(request: Request, response: Response): Promise<void> {
    const adminRepository = getCustomRepository(AdminRepository);

    const { name, username, password } = request.body;

    if (await adminRepository.findOne({ where: { username } })) {
      throw new AppError("Username already exists", 400);
    }

    const admin = adminRepository.createAdmin(name, username, password);

    await adminRepository.save(admin);

    delete admin.password;
    delete admin.password_hash;

    return response.redirect("/session");
  }
}

export default new AdminController();
