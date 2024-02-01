import { MiddlewareFn } from 'telegraf';
import { MyContext } from '../types';

const mapTelegramUsersToEmployees: Record<number, string> = {
  546865995: 'C7D4F9F6-52B6-4346-A4A2-BFAA8D7DCCCC', // Prosto_Alex -> Юлиана Пономарева
  357936666: 'C7D4F9F6-52B6-4346-A4A2-BFAA8D7DCCCC', // Curly_Y 
}

export const usersGuard: MiddlewareFn<MyContext> = (ctx, next) => {
  if (!ctx.from?.id) {
    ctx.reply("Cannot recognize user")
    return;
  }

  const employeeId = mapTelegramUsersToEmployees[ctx.from.id]

  if (!employeeId) {
    ctx.reply("Unknown user");
    return;
  }

  ctx.employeeId = employeeId;
  next();
};
