import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host:
    process.env.NODE_ENV === "test"
      ? process.env.DB_HOST_TEST
      : process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.DB_NAME_TEST
      : process.env.DB_NAME,
  port: 5432,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
