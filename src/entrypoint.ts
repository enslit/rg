import dayjs from "dayjs";
import { createTelegramBot } from "./telegram";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import { DbService, createDbConnection } from "./db";

dayjs.extend(utc);
dayjs.extend(LocalizedFormat);

const main = async () => {
  const db = await createDbConnection();
  const dbService = new DbService(db);

  const bot = createTelegramBot(dbService);

  bot.launch();
  console.log("App was started successfully");
};

main();
