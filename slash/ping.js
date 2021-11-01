module.exports.run = async (bot, interaction) => {
    bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: "pong \>:("
            }
        }
    });
}