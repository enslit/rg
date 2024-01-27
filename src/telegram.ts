import { Telegraf } from "telegraf";
import { TELEGRAM_BOT_TOKEN } from "./constants";
import { usersGuard } from './middlewares/users.guard';

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
bot.use(Telegraf.log());
bot.use(usersGuard)

export { bot }
