import "dotenv/config";

const getEnv = (key: string) => {
  return process.env[key];
};

export const environment = {
  db: {
    url:
      getEnv("DB_URL") ||
      "postgresql://postgres:secret@localhost:5432/kproject?schema=public",
  },
};
