require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// চ্যানেলের পোস্টের জন্য লাভ রিঅ্যাক্ট
bot.on('channel_post', async (ctx) => {
    try {
        const chatId = ctx.chat.id;
        const messageId = ctx.message.message_id;
        const reactionEmoji = '❤️';

        await ctx.telegram.setMessageReaction(chatId, messageId, [
            { type: 'emoji', emoji: reactionEmoji }
        ]);
    } catch (error) {
        console.error('Error sending reaction:', error);
    }
});

// গ্রুপের মেসেজের জন্য লাভ রিঅ্যাক্ট
bot.on('message', async (ctx) => {
    if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
        try {
            const chatId = ctx.chat.id;
            const messageId = ctx.message.message_id;
            const reactionEmoji = '❤️';

            await ctx.telegram.setMessageReaction(chatId, messageId, [
                { type: 'emoji', emoji: reactionEmoji }
            ]);
        } catch (error) {
            console.error('Error sending group reaction:', error);
        }
    }
});

bot.launch().then(() => {
    console.log('Bot is running successfully!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));