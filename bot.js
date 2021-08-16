require("dotenv").config();
const fetch = require("node-fetch");
const { Telegraf } = require("telegraf");

// Создать бота с полученным ключом
const bot = new Telegraf(process.env.TELEGRAM_TOKEN_EDU);

// Обработчик начала диалога с ботом
bot.start((ctx) =>
  ctx.reply(
    `Приветствую, ${
       ctx.from.first_name ? ctx.from.first_name : "хороший человек"
    }! Набери /help и увидишь, что я могу.`
  )
);
// Обработчик команды /help
bot.help((ctx) => ctx.reply("Этот бот поддерживает такие команды: /whoami, /photo, /start, /help"));

// Обработчик команды /whoami
bot.command("whoami", (ctx) => {
  const { id, username, first_name, last_name } = ctx.from;
  return ctx.replyWithMarkdown(`Кто ты в телеграмме:
*id* : ${id}
*username* : ${username}
*Имя* : ${first_name}
*Фамилия* : ${last_name}
*chatId* : ${ctx.chat.id}`);
});

// Обработчик простого текста
bot.on("text", (ctx) => {
  return ctx.reply("Ошибка, введите правильную команду, /help");
});


// Запуск бота
bot.launch();