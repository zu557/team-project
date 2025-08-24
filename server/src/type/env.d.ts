declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    MONGO_URL: string;
    PORT?: string; // optional
    JWT_SECRET: string;
  }
}
