# example

```typescript
  bot.command("persons", async (ctx) => {
    const list = await database();
    const keyboard = [];

    if (list) {
      for (const person of list.recordset) {
        const { FirstName, LastName, _id } = person;
        let command = `${LastName}_${FirstName}_${_id}`;

        keyboard.push(command);
      }
    }

    ctx.reply(
      "Choose person",
      Markup
        .keyboard(keyboard)
        .oneTime()
        .resize(),
    );
  });

  bot.hears(/([а-яА-Я]+)_([а-яА-Я]+)_([A-Z0-9-]+)/, (ctx) => {
    console.log('choosed', ctx.message.text);
    const [lastName, firstName, id] = ctx.message.text.split('_');
    ctx.reply(`Add monitoring for ${lastName} ${firstName}`)
  });
```
