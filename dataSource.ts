import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

// const port = process.env.DB_PORT as unknown;

export const ApppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});