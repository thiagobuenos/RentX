import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { AppDataSource } from "../../../../../dataSource";

async function create() {
  const conection = AppDataSource.initialize();

  const id = uuidV4();
  const password = await hash("admin", 8);
  await (
    await conection
  ).query(`
    INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license )
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
  `);
  await (
    await conection
  ).destroy;
}

create().then(() => console.log("user admin created"));
