import { Telegraf, session, Scenes } from "telegraf";
import { TELEGRAM_BOT_TOKEN } from "./constants";
import { usersGuard } from './middlewares/users.guard';
import { IDbService } from "./db/db.service";
import dayjs from "dayjs";
import { normalizeISODate } from "./utils/normalizeISODate";
import { MyContext } from './types';
import { createEditLogScenes } from "./features/edit-log";

export const createTelegramBot = (dbService: IDbService) => {
  const bot = new Telegraf<MyContext>(TELEGRAM_BOT_TOKEN, { handlerTimeout: 3600 });
  const editLogScenes = createEditLogScenes(dbService);
  const stage = new Scenes.Stage<MyContext>([...editLogScenes], {
    ttl: 3600,
  });

  bot.use(Telegraf.log());
  bot.use(session())
  bot.use(usersGuard)
  bot.use(stage.middleware())

  bot.start(async (ctx) => {
    const user = await dbService.getEmployee({ id: ctx.employeeId });
    ctx.reply(`Привет ${user?.FirstName}!`);
  });

  bot.command("edit_log", ctx => ctx.scene.enter("edit_log"));

  bot.command("view_current_month", async (ctx) => {
    const logs = await dbService.getEmployeeLogsByDate({
      employeeId: ctx.employeeId,
      start: dayjs().startOf("month"),
      end: dayjs().endOf("month"),
    });

    const message = logs.map(([date, [entry, out]]) => {
      const entryTime = normalizeISODate(entry.DateTime).format("HH:mm:ss");
      const outTime = out?.DateTime
        ? normalizeISODate(out.DateTime).format("HH:mm:ss")
        : "выход не зарегистрирован";

      return `${date}\n\t${entryTime} - ${outTime}`;
    });

    ctx.reply(`Результат запроса:\n${message.join("\n\n")}`);
  });

  return bot;
}
