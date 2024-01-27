import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import { DbService, createDbConnection } from "./db";
import { bot } from "./telegram";
import { normalizeISODate } from "./utils/normalizeISODate";

dayjs.extend(utc);
dayjs.extend(LocalizedFormat);

const main = async () => {
  const db = await createDbConnection();

  const dbService = new DbService(db);

  bot.start(async (ctx) => {
    console.log("employee id", ctx.state.employeeId);

    const user = await dbService.getEmployee({ id: ctx.state.employeeId });
    ctx.reply(`Привет ${user?.FirstName}!`);
  });

  bot.command("view_current_month", async (ctx) => {
    const logs = await dbService.getEmployeeLogsByDate({
      employeeId: ctx.state.employeeId,
      start: dayjs().startOf("month"),
      end: dayjs().endOf("month"),
    });

    const message = logs.map(([date, [entry, out]]) => {
      const entryTime = normalizeISODate(entry.DateTime).format("HH:mm:ss");
      const outTime = out?.DateTime
        ? normalizeISODate(out.DateTime).format("HH:mm:ss")
        : "not registered";

      return `${date}\n\t${entryTime} - ${outTime}`;
    });

    ctx.reply(`Result:\n${message.join("\n\n")}`);
  });

  bot.launch();
  console.log("started");
};

main();
