import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import AdminRepository from "../repositories/AdminRepository";
import AppError from "../errors/AppError";

class SessionController {
  index(request: Request, response: Response) {
    return response.render("../views/session");
  }
  async store(request: Request, response: Response): Promise<Response> {
    const adminRepository = getCustomRepository(AdminRepository);

    const { username, password } = request.body;

    const admin = await adminRepository.findOne({ where: { username } });

    if (!admin) {
      throw new AppError("Admin not found", 404);
    }

    if (!(await admin.checkPassword(password))) {
      throw new AppError("Invalid password", 401);
    }

    delete admin.password_hash;

    return response.json({ admin, token: admin.generateToken() });
  }
}

export default new SessionController();
