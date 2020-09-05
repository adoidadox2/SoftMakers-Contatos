import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import User from "./User";

@Entity("address")
export default class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: true })
  cep: string;

  @Column({ type: "varchar", nullable: false })
  state: string;

  @Column({ type: "varchar", nullable: false })
  city: string;

  @Column({ type: "varchar" })
  neighborhood: string;

  @Column({ type: "varchar" })
  street: string;

  @Column({ type: "varchar" })
  house_number: string;

  @OneToMany((type) => User, (resident) => resident.address)
  residents: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
