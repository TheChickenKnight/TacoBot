const Discord = require("discord.js");
const db = require("quick.db");
const data = require("./data.json");
const disbt = require("discord-buttons");
const minesMines = Object.getOwnPropertyNames(data.mines);
const value = minesMines.map(item => item.charAt(0).toUpperCase() + item.slice(1) + " Mines");
var dropMenu = new disbt.MessageMenu()
    .setPlaceholder("Choose!")
    .setMaxValues(1)
    .setMinValues(1)
    .addOption(new disbt.MessageMenuOption()
        .setLabel("Back")
        .setEmoji("⬅️")
        .setValue("back")
        .setDescription("Click here to go back!")
    );
value.forEach((item, i) => {
    dropMenu.addOption(new disbt.MessageMenuOption()
        .setLabel(item)
        .setEmoji("◾")
        .setValue(minesMines[i])
        .setDescription("Click here for more specific info on this mine!")
    );
});


module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return;  
    var embed = new Discord.MessageEmbed().setTitle("Mining INTERFACE ⛏️**                              **").setColor("#808080");
    if (!db.has(`users.${message.author.id}.mine.startTime`))db.set(`users.${message.author.id}.mine.startTime`, null);
    if (!db.has(`users.${message.author.id}.inventory.ores`))db.set(`users.${message.author.id}.inventory.ores`, {});
    if (!db.has(`users.${message.author.id}.mine.location`))db.set(`users.${message.author.id}.mine.location`, "");
    if (!db.has(`users.${message.author.id}.backpack`))db.set(`users.${message.author.id}.backpack`, "");
    embed.fields = [];
    if (args[0])message.channel.send(embed);
    else message.channel.send(embed,  
        new disbt.MessageActionRow().addComponents(
            new disbt.MessageButton()
                .setStyle("grey")
                .setLabel("Mines List")
                .setID(`mine_mines_${message.author.id}_economy`),
            new disbt.MessageButton()
                .setStyle("grey")
                .setLabel("Status")
                .setID(`mine_status_${message.author.id}_economy`),
            new disbt.MessageButton()
                .setStyle("grey")
                .setLabel("Stop Mining!")
                .setID(`mine_stop_${message.author.id}_economy`)
            )
        );
}

module.exports.button = async (bot, button) => {
    if (button.id.split("_")[2] != button.clicker.id)return await button.reply.send("Hey this isn't your interface!", true);
    var embed = new Discord.MessageEmbed().setTitle("Mining INTERFACE ⛏️**                              **").setColor("#808080");
    const fullTime = Date.now() - db.get(`users.${button.clicker.id}.mine.startTime`);
    const time = ms(fullTime);
    const location = db.get(`users.${button.clicker.id}.mine.location`);
    switch(button.id.split("_")[1]) {
        case "start":
            const place = db.get(`users.${button.clicker.id}.mine.location`);
            if (place)embed
                .setColor("#ff0000")
                .setDescription(`You are already mining at the ${place.charAt(0).toUpperCase()}${place.slice(1)} Mines!`)
                .setFooter("try t!mine status for more info on your current venture!");
            else {
                if (db.get(`users.${button.clicker.id}.xp`) / 100 < data.mines[button.id.split("_")[3]].req)embed
                        .setDescription(`You have to be level \`${data.mines[button.id.split("_")[3]].req}\` to enter the ${button.id.split("_")[3].charAt(0).toUpperCase()}${button.id.split("_")[3].slice(1)} Mines!`)
                        .setColor("#ff0000")
                        .setFooter("try t!mine mines for a list of mines!");
                else {
                    db.set(`users.${button.clicker.id}.mine.location`, button.id.split("_")[3].toLowerCase());
                    db.set(`users.${button.clicker.id}.mine.startTime`, Date.now());
                    embed
                        .setDescription("you have started mining at the " + button.id.split("_")[3].charAt(0).toUpperCase() + button.id.split("_")[3].slice(1) + " Mines!")
                        .setColor("#00cc00")
                        .setFooter("try t!mine status for more info on your current venture!");
                }
            }
            button.message.edit(embed);
        break;
        case "status": 
            if (!location)embed
                .setColor("#ff0000")
                .setDescription("You aren't currently mining anywhere!")
                .setFooter("Try t!mine start <location> to start your venture!");
            else embed.setDescription(`You have been mining at the **${location.charAt(0).toUpperCase()}${location.slice(1)} Mines** for \`${time.days}\`d, \`${time.hours}\`h, and \`${time.minutes}\`m`);
            button.message.edit(embed);
        break;
        case "mines":
            embed.setFooter('Click on the menu below!').setTitle("Mining INTERFACE ⛏️**                                                                **");
            button.message.edit({
                embed: embed, 
                components: [new disbt.MessageActionRow().addComponent(dropMenu.setID(`mine_mines_${button.id.split("_")[2]}_economy`))],
            });
        break;
        case "stop":
            if (!location)embed
                .setColor("#ff0000")
                .setDescription("You aren't currently mining anywhere!")
                .setFooter("Try t!mine start <location> to start your venture!");
            else {
                embed
                    .setColor("#00cc00")
                    .setDescription(`You have finished mining at ${location} for ${time.days}d, ${time.hours}h, and ${time.minutes}m!`);
                var limit = 10;
                const backpack = db.get(`users.${button.clicker.id}.backpack`);
                const mine = data.mines[location];
                var ores = Math.floor((fullTime / 6000) / (100 / mine.oreRate) - ((Math.random() * (fullTime / 60000)) / 15));
                if (backpack)limit = data.backpacks[backpack].size;
                if (ores > limit) {
                    embed.setDescription("Your mining session was cut short because your backpack was full!");
                    ores = limit;
                }
                var oreList = [];
                if (ores < 0)ores = 0;
                for (let ore of mine.ores) {
                    let amount = Math.round((ores * (ore.chance / 100))) * ore.vein;
                    if (amount) {
                        if (db.has(`users.${button.clicker.id}.inventory.ores.${ore.name}`))db.add(`users.${button.clicker.id}.inventory.ores.${ore.name}`, amount);
                        else db.set(`users.${button.clicker.id}.inventory.ores.${ore.name}`, amount);
                        oreList.push(`${amount} ${ore.name} ore(s)`);
                    }
                }
                embed.addField("Ores Gained:", oreList);
                db.set(`users.${button.clicker.id}.mine.location`, "");
                db.set(`users.${button.clicker.id}.mine.startTime`, null);
            }
            button.message.edit(embed);
        break;
    }
    await button.reply.defer();
}

module.exports.menu = async (bot, menu) => {
    if (menu.id.split("_")[2] != menu.clicker.id)return await menu.reply.send("Hey this isn't your interface!", true);
    var embed = new Discord.MessageEmbed().setTitle("Mining INTERFACE ⛏️**                              **").setColor("#808080");
    if (menu.values[0] == "back")
        menu.message.edit(embed,  
            new disbt.MessageActionRow().addComponents(
                new disbt.MessageButton()
                    .setStyle("grey")
                    .setLabel("Mines List")
                    .setID(`mine_mines_${menu.id.split("_")[2]}_economy`),
                new disbt.MessageButton()
                    .setStyle("grey")
                    .setLabel("Status")
                    .setID(`mine_status_${menu.id.split("_")[2]}_economy`),
                new disbt.MessageButton()
                    .setStyle("grey")
                    .setLabel("Stop Mining")
                    .setID(`mine_stop_${menu.id.split("_")[2]}_economy`)
            )
        ); 
    else {
        const mine = data.mines[menu.values[0]];
        var ores = mine.ores.map(item => item.name.charAt(0).toUpperCase() + item.name.slice(1) + " Ore -");
        var veins = mine.ores.map(item => item.vein);
        var descEdit = mine.description.match(/.{1,63}/g);
        if (descEdit.length == 1) {
            var space = "** **";
            for (let i = 0; i < 63 - mine.description.length; i++)space += " ";
            space += "** **";
            embed.setTitle("Mining INTERFACE ⛏️**                                     ** " + space);
        }
        menu.message.edit({
            embed: embed
                .setColor(mine.color)
                .setDescription("__**" + menu.values[0].charAt(0).toUpperCase() + menu.values[0].slice(1) + " Mines**__         Level req.: " + mine.req + "+\n" + descEdit.join("\n"))
                .addFields(
                    { name: "Ore Chance Per Minute", value: 100 / mine.oreRate + "%"},
                    { name: "Ores", value: ores, inline: true},
                    { name: "Vein(Amount in one area)", value: veins, inline: true}
                ),
            components: [
                new disbt.MessageActionRow().addComponents(dropMenu.setPlaceholder(menu.values[0].charAt(0).toUpperCase() + menu.values[0].slice(1) + " Mines (Click here to switch Mines!)")),
                new disbt.MessageActionRow().addComponent(
                    new disbt.MessageButton()
                        .setStyle("grey")
                        .setLabel("Start Mining!")
                        .setID(`mine_start_${menu.id.split("_")[2]}_${menu.values.join("&")}_economy`)
                )
            ],
        });
    }
    await menu.reply.defer();
}

module.exports.help = {
    name:"mine",
    aliases: [""],
    help: `Opens the mining interface!`,
    usage: 'mine <start/status/mines/ores/stop/(none)>'
}