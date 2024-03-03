import {
  DataSource,
} from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: 'localhost',
  port: 5432,
  username: "postgres",
  password: "password",
  database: "usersso",
  dropSchema: false,
  synchronize: true,
  logging: process.env.TYPEORM_LOGGING === "true",
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
});

export default AppDataSource;
