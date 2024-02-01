import { Markup, Scenes } from "telegraf";
import { IDbService } from "../db/db.service";
import { MyContext } from '../types';
import dayjs from "dayjs";

export const createEditLogScenes = (dbService: IDbService): (Scenes.BaseScene<MyContext>)[] => {
  const { enter, leave } = Scenes.Stage;

  const chooseLog = new Scenes.BaseScene<MyContext>("edit_log");
  const newTimeScene = new Scenes.BaseScene<MyContext>("edit_log_new_time");

  chooseLog.enter(async (ctx) => {
    ctx.reply("Режим редактирования записи")

    const logs = await dbService.getEmployeeLogsByDate({
      employeeId: ctx.employeeId,
      start: dayjs().add(-10, 'day'),
      end: dayjs(),
    })


    const kb = logs.map(([_, [enter, out]]) => {
      return [enter.DateTime.toLocaleString(), out.DateTime.toLocaleString()]
    })

    ctx.reply("Выбери запись для редактирования", Markup.keyboard([...kb, ['Другая дата'], ['Назад']]))
  });

  chooseLog.hears("Другая дата", (ctx) => {
    ctx.reply("Пока не умеем выбирать произвольную дату")
    leave<MyContext>();
  })
  chooseLog.hears("Назад", leave<MyContext>())
  chooseLog.command("back", leave<MyContext>());

  newTimeScene.command("back", enter<MyContext>("edit_log"));

  return [chooseLog, newTimeScene]
}
