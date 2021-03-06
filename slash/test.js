const Discord = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports.run = async (bot, interaction) => {
	const row = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					])
		);

	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Some title')
		.setURL('https://discord.js.org/')
		.setDescription('Some description here');

	await interaction.reply({ content: 'Pong!', ephemeral: true, embeds: [embed], components: [row] });
}