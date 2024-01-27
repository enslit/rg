import { Context, MiddlewareFn } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

const mapTelegramUsersToEmployees: Record<number, string> = {
  546865995: 'C7D4F9F6-52B6-4346-A4A2-BFAA8D7DCCCC', // Prosto_Alex -> Юлиана Пономарева
}

export const usersGuard: MiddlewareFn<Context<Update>> = (ctx, next) => {
  if (!ctx.from?.id) {
    ctx.reply("Cannot recognize user")
    return;
  }

  const employeeId = mapTelegramUsersToEmployees[ctx.from.id]

  if (!employeeId) {
    console.log('UNKNOWN USER', ctx)
    ctx.reply("Unknown user");
    return;
  }

  ctx.state.employeeId = employeeId;
  next();
};
