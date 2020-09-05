import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "../config/authConfig";

@Entity("admin")
export default class Admin {
  constructor(name: string, username: string, password: string) {
    this.name = name;
    this.username = username;
    this.password = password;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "varchar", nullable: false })
  username: string;

  @Column({ type: "varchar", nullable: false })
  password_hash?: string;

  password?: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async upPass() {
    this.password_hash = await bcrypt.hash(this.password, 8);
    this.password = null;
  }

  checkPassword(password: String) {
    return bcrypt.compare(password, this.password_hash as string);
  }

  generateToken() {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: authConfig.ttl,
    });
  }
}
