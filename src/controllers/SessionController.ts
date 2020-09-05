import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import AdminRepository from "../repositories/AdminRepository";

class SessionController {
  index(request: Request, response: Response) {
    return response.render("../views/session");
  }
  async store(request: Request, response: Response): Promise<Response> {
    const adminRepository = getCustomRepository(AdminRepository);

    const { username, password } = request.body;

    const admin = await adminRepository.findOne({ where: { username } });

    if (!admin) {
      return response.status(400).json({ error: "Admin not found" });
    }

    if (!(await admin.checkPassword(password))) {
      return response.status(401).json({ error: "Invalid password" });
    }

    delete admin.password_hash;

    return response.json({ admin, token: admin.generateToken() });
  }
}

export default new SessionController();
