const Discord = require("discord.js");
const db = require("quick.db");
const fetch = require("node-fetch");

module.exports.run = async (bot, message) => {
    let pokemon = Math.floor(Math.random() * 898 + 1); let embed = new Discord.MessageEmbed()
    if (Promise.resolve(isRare(pokemon).L) || Promise.resolve(isRare(pokemon).M))pokemon = Math.floor(Math.random() * 898 + 1);
    let ran = "";
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.json())
        .then(res => {
            ran = res.name.charAt(0).toUpperCase() + res.name.slice(1);
            console.log(Promise.resolve(habitat(pokemon)));
            message.channel.send(embed
                .setTitle("A Wild Pokemon Appeared!")
                .setImage(res.sprites.other["official-artwork"].front_default)
                .setFooter(`type t!catch <pokemon>`)
            ).then(async () => {
                message.channel.awaitMessages(
                    response => {
                        if (response.author.bot)return false;
                        if (response.content.slice(0, 6) == db.get("prefix") + "hint") {
                            const rand = Math.floor(Math.random() * res.name.length);
                            const rand2 = Math.floor(Math.random() * res.name.length);
                            let hint = "";
                            for (i = 0; i < res.name.length; i++) {
                                if (i == rand || i == rand2)hint += res.name.charAt(i);
                                else if (res.name.replace("-", " ").charAt(i) == " ")hint += " ";
                                else hint += "\\_ ";
                            }
                            message.channel.send(embed
                                .setTitle("PokeHint")
                                .setDescription(hint)
                                .setImage(undefined)
                                .setFooter("")
                            )
                        }
                        if (response.content.slice(0, 7) !== db.get("prefix") + "catch")return false;
                        if (response.content.slice(8) == res.name.replace("-", " "))return true;
                        else message.channel.send(embed
                            .setDescription("That's not it!")
                            .setImage(undefined)
                        )
                    },
                    {
                        max: 1,
                        time: 30000,
                        errors: ['time']
                    }
                ).then(async collected => {
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor(color)
                        .setDescription(`${collected.first().author} got it right!`)
                    );
                    db.push(`pokemon.${collected.first().author.id}.list`, ran);   
                }).catch(collected => {
                    message.channel.send(embed
                        .setDescription(`\`${ran}\` got away!`)
                        .setTitle("Pokemon")
                        .setFooter("")
                        .setImage(undefined)
                    )
                })
            })
        })
}

async function isRare(pokemon) {
    await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemon)
        .then(res => res.json())
        .then(res => { return {L: res.is_legendary, M: res.is_mythical}; })
        .catch(res => { return {L: "error", M: "error"} })
}

async function habitat(pokemon) {
    await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
        .then(resp => resp.json())
        .then(resp => {
            switch (resp.habitat.name) {
                case "cave":          return "4f4f4f";
                case "forest":        return "006600";
                case "grassland":     return "669900";
                case "rare":          return "ffffff";
                case "rough-terrain": return "734d26";
                case "sea":           return "0066cc";
                case "urban":         return "ababab";
                case "waters-edge":   return "ffcc99";
                default: throw console.error("bro that's wrong lol");
            }
        }).catch(() => {return "ebba34"})
}

module.exports.info = {
    chance: "0",
    name: "pokencounter",
}