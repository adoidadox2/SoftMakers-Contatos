import { EntityRepository, Repository } from "typeorm";
import Admin from "../models/Admin";

@EntityRepository(Admin)
export default class AdminRepository extends Repository<Admin> {
  public createAdmin(name: string, username: string, password: string): Admin {
    const admin = new Admin(name, username, password);

    return admin;
  }
}
