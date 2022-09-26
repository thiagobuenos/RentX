import { hash } from "bcrypt";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { AppDataSource } from "../../../../../dataSource";
import { app } from "../../../../shared/infra/http/app";

jest.setTimeout(50000);
let conection: DataSource;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    conection = await AppDataSource.initialize();
    await conection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);
    await (
      await conection
    ).query(`
    INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license )
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
  `);
  });

  it("should be able to create a new Category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });
    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should be not able to create a Category already exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });
    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await conection.dropDatabase();
    await conection.destroy();
  });
});
