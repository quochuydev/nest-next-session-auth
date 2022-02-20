import "dotenv/config";

const getEnv = (key: string) => {
  return process.env[key];
};

export const environment = {
  db: {
    port: getEnv("DB_PORT") || 5432,
  },
};
