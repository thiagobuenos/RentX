import { hash } from "bcrypt";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { AppDataSource } from "../../../../../dataSource";
import { app } from "../../../../shared/infra/http/app";

jest.setTimeout(50000);
let conection: DataSource;
describe("List CategoryController", () => {
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

  afterAll(async () => {
    await conection.dropDatabase();
    await conection.destroy();
  });

  it("should be able to list all Category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });
    const { refresh_token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(app).get("/categories");
    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
  });
});
