require('dotenv').config();

const telegraf = require(`telegraf`);
const Markup = telegraf;

const bot = new telegraf(process.env.TOKEN);

bot.catch(console.log);

bot.command('start', ctx => {
  sendStartMessage(ctx);
})

function sendStartMessage(ctx) {
  let startMessage = `🇧🇷 Use este bot para avaliar coletivamente as sugestões feitas no seu grupo.\n
*Como ele funciona*: promova-o como administrador no seu grupo. Qualquer mensagem iniciada com a hashtag #sugestão irá disparar uma enquete para que os membros do grupo avaliem a sugestão dada. Leia o manual completo [aqui](https://telegra.ph/pitacobot-04-20). Se você gostou dele, que tal me pagar um café? Utilize os botões abaixo.\n
🇺🇸 Use this bot to collectively evaluate suggestions made in your group.\n
*How it works*: promote it as an administrator in your group. Any message starting with the hashtag #suggestion will trigger a poll for group members to evaluate the suggestion given. Read the full manual [here](https://telegra.ph/pitacobot-04-20). If you liked it, how about buying me a coffee? Use the buttons below.`;
  bot.telegram.sendMessage(ctx.chat.id, startMessage,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🇧🇷 PicPay", url: 'https://picpay.me/jvlianodorneles' },
            { text: "🇺🇸 PayPal", url: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AUJW6TVC8KVTQ' }
          ]
        ]},
      parse_mode: "markdown",
      disable_web_page_preview: true
    }
  )
}

const regex1 = new RegExp(/^(?:^|\W)(#opinião|#opiniao|#sugestão|#pergunta|#sugestao|#suggestion|#sugestãodepauta|#sugestaodepauta|#sugestãopauta|#sugestaopauta|#enquete|#poll|#vote|#question|#votacao|#votação)(?:$|\W)/i);

const regex2 = new RegExp(/^(?:^|\W)(!opinião|!opiniao|!sugestão|!pergunta|!sugestao|!suggestion|!sugestãodepauta|!sugestaodepauta|!sugestãopauta|!sugestaopauta|!enquete|!poll|!vote|!question|!votacao|!votação)(?:$|\W)/i);

bot.hears(regex1, ctx => {
  let chat_id = ctx.message.chat.id;
  let message_id = ctx.message.message_id;
  let first_name = ctx.message.from.first_name;
  let text = ctx.message.text;
  let message = text.replace(/^(?:^|\W)(#opinião|#opiniao|#sugestão|#pergunta|#sugestao|#suggestion|#sugestãodepauta|#sugestaodepauta|#sugestãopauta|#sugestaopauta|#enquete|#poll|#vote|#question|#votacao|#votação)(?:$|\W)/, "");
  bot.telegram.sendPoll(
    chat_id,
    // 'O usuário ' + first_name + ' sugeriu:\n\n' + message,
    first_name + ' ➡️ ' + ' \"' + message + '\"',
    ['👍', '👎'],
    { is_anonymous: false }
    ).then((m) => { bot.telegram.pinChatMessage(m.chat.id, m.message_id) })
  bot.telegram.deleteMessage(chat_id, message_id)
})

bot.hears(regex2, ctx => {
  let chat_id = ctx.message.chat.id;
  let message_id = ctx.message.message_id;
  let first_name = ctx.message.from.first_name;
  let text = ctx.message.text;
  let message = text.replace(/^(?:^|\W)(!opinião|!opiniao|!sugestão|!pergunta|!sugestao|!suggestion|!sugestãodepauta|!sugestaodepauta|!sugestãopauta|!sugestaopauta|!enquete|!poll|!vote|!question|!votacao|!votação)(?:$|\W)/, "");
  bot.telegram.sendPoll(
    chat_id,
    // 'O usuário ' + first_name + ' sugeriu:\n\n' + message,
    first_name + ' ➡️ ' + ' \"' + message + '\"',
    ['👍', '👎'],
    { is_anonymous: true }
    ).then((m) => { bot.telegram.pinChatMessage(m.chat.id, m.message_id) })

  bot.telegram.deleteMessage(chat_id, message_id)
})

bot.launch();