import { MongoMemoryServer } from 'mongodb-memory-server'
import dotenv from "dotenv";

dotenv.config();

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create();
  global.__MONGOINSTANCE = instance;
  process.env.MONGO_DB_URI = instance.getUri();
}