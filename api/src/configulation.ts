import "dotenv/config";

export default {
  db: {
    url: process.env.DB_URL || "postgres://localhost:5432/app",
  },
};
