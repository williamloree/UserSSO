import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { generateToken } from "../helpers/Generator";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ length: 254, unique: true, nullable: false })
  email!: string;

  @Column({ length: 254, nullable: true })
  password!: string;

  @Column({ length: 254, nullable: true })
  authToken!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  async setTokenStream() {
    this.authToken = generateToken();
  }
}
