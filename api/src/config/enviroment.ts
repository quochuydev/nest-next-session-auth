import "dotenv/config";

const getEnv = (key: string) => {
  return process.env[key];
};

export const environment = {
  app: {
    host: "http://localhost:4000",
  },
  db: {
    url:
      getEnv("DB_URL") ||
      "postgresql://postgres:secret@localhost:5432/kproject?schema=public",
  },
};

export default environment;
