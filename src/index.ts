import AppDataSource from "./config/database";
import { start } from "./server";
import 'dotenv/config';

AppDataSource.initialize();
start();
