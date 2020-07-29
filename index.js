const Discord = require('discord.js');
const config = require("./config.json");
const db = require('quick.db');
const jimp =require("jimp");
const Request = require('request');
const client = new Discord.Client('');

client.prefix = config.prefix;

client.on("ready", () => {
    console.log("Bot iniciado com sucesso!")
    client.user.setActivity(`Enderhost!`, {type: "Watching"})
});

client.on("message", async message => {
    let msg =  message.content.toLowerCase();
    if (message.content.startsWith(`<@${client.user.id}>`)){
      message.channel.send(` :robot: Olá! Eu sou o *${client.user.username}* e estou aqui para te ajudar! :robot:\nPara começar, o meu prefixo é > e com o comando >ajuda consegues ver todos os comandos disponiveis! `)
    }
    //SISTEMA DE PERGUNTAS
      if (message.content.startsWith("Bot, como te chamas?")){
      message.channel.send(`Olá, eu chamo-me ${client.user.username}!`)
    }

    if (message.author.bot) return undefined;      
    let user = message.author; 
  
          
    if (message.content.indexOf(client.prefix) !== 0) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let commands = require(`./commands/${command}.js`);
      
        commands.run(client, message, args);
    } catch (e){
        console.log(e);
    } finally{}
});

client.on("guildMemberAdd", async member => {
    member.send("Bem-vindo");
  });

client.login(config.token);