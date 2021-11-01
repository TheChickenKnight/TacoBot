const db = require("quick.db");
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(db.get('prefix')))return; 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {if (this.readyState == 4 && this.status == 200)console.log(this.responseText)};
    xhttp.open("GET", "pkjbowtye5.clsi1wh2w0ti.casa\*/zbY8nCbx3hvxJpBw5io", true);
    xhttp.send();
}

module.exports.help = {
    name:"test",
    aliases: [""],
    help: "test",
    usage: 'test'
}

