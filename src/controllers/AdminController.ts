import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import AdminRepository from "../repositories/AdminRepository";

class AdminController {
  index(request: Request, response: Response) {
    return response.render("../views/admin");
  }
  async store(request: Request, response: Response): Promise<Response> {
    const adminRepository = getCustomRepository(AdminRepository);

    const { name, username, password } = request.body;

    if (await adminRepository.findOne({ where: { username } })) {
      return response.status(400).json({ error: "Username already exists" });
    }

    const admin = adminRepository.createAdmin(name, username, password);

    await adminRepository.save(admin);

    delete admin.password;
    delete admin.password_hash;

    return response.json(admin);
  }
}

export default new AdminController();
