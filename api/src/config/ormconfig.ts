import { ConnectionOptions } from "typeorm";
import * as path from "path";

export const ORMConfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "secret",
  database: "kproject",
  extra: {
    charset: "utf8mb4_unicode_ci",
  },
  synchronize: false,
  logger: "advanced-console",
  logging: ["query"],
  entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`],
  migrations: [
    `${path.join(__dirname, "../")}${"database/migrations/**/*.ts"}`,
  ],
  migrationsRun: false,
  cli: {
    migrationsDir: "src/database/migrations",
    entitiesDir: "src/database/entities",
  },
} as ConnectionOptions;

export default ORMConfig;
