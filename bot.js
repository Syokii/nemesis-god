const Discord = require("discord.js");
const prefix = "!";

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("Ready");
});

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").sendMessage(`**Welcome ${member} to Nemesis Gaming. Enjoy the server!**`);

    member.addRole(member.guild.roles.find("name", "Friends"));
});

//Commands
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice[1];

    if(!command.startsWith(prefix)) return;
    
    if(command === `${prefix}avatar`) {        
        const target = message.mentions.users.first() || message.author;
        message.channel.send(target.displayAvatarURL);
    }

    if(command === `${prefix}roll`) {
        var roll = Math.floor(Math.random() * 6) + 1;
        message.channel.send("You rolled a " + roll);
    }

    if(command === `${prefix}coinflip`) {
        var answers = [
            "**Heads**", "**Tails**","**Middle Of The Coin**"
        ];
        var answers = answers[Math.floor(Math.random() * answers.length)];
        message.channel.send(answers.toString());
    }

    if(command === `${prefix}8ball`) {
        var answers = [
            "**yes**", "**no**"
        ];
        var answers = answers[Math.floor(Math.random() * answers.length)];
        message.channel.send(answers.toString());
    }

    if(command === `${prefix}userinfo`) {
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("This is your user info.")
            .setColor("#9a0000")
            .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
            .addField("ID", message.author.id)
            .addField("User Avatar", message.author.defaultAvatarURL)
            .addField("Created On", message.author.createdAt);
        message.channel.sendEmbed(embed);
    }

    if(command === `${prefix}invite`) {
        message.reply("https://discord.gg/RtStjyN");
    }

    if(command === `${prefix}ping`) {
        message.channel.sendMessage('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    }
    
    if(command === `${prefix}help`) {
        var embedhelpmember = new Discord.RichEmbed()
        .setTitle("**List of Commands**\n")
        .addField("Help", "Displays this message (Correct usage: !help)") 
        .addField("Coinflip", "Flips a coin randomly.") 
        .addField("Roll", "Rolls a dice and you get a random number.") 
        .addField("Invite", "Gives the invite link to the server.") 
        .addField("Ping", "Tests your ping. (Correct usage: !ping)")
        .addField("8ball", "Answers to all of your questions! (Correct usage: !8ball <question>)")
        .addField("Avatar", "Shows your profile picture.") 
        .addField("Userinfo", "Shows information about yourself.") 
        .addField("Adminhelp", "Gives a list of admin commands.")
        .setColor("#02e3fc")
        .setFooter("That's all the commands added so far.");
        message.channel.sendEmbed(embedhelpmember);
    }
});

//Admin Commands
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice[1];

    if(!command.startsWith(prefix)) return;

    if(command === `${prefix}ban`) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Sorry, you don't have permissions to use this!");
        const member = message.mentions.members.first();
        if (!member) return message.reply('Invalid usage, please mention the person in this server!');
        member.ban({
            reason: `Banned by ${message.author.tag}`
        });
        message.reply("The user has been banned from this server. Keep this server awesome!");
        member.guild.channels.find("name", "staff-log").sendMessage(`${member} **has been banned by** ${message.author.tag}`);        
    }

    if(command === `${prefix}kick`) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Sorry, you don't have permissions to use this!");
        const member = message.mentions.members.first();
        if (!member) return message.reply('Invalid usage, please mention the person in this server!');
        member.kick({
            reason: `Kicked by ${message.author.tag}`
        });
        message.reply("The user has been kicked from this server. Keep this server awesome!");
        member.guild.channels.find("name", "staff-log").sendMessage(`${member} **has been kicked by** ${message.author.tag}`);        
    }

    if(command === `${prefix}admin`) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Sorry, you don't have permissions to use this!");
        const member = message.mentions.members.first();
        if (!member) return message.reply('Invalid usage, please mention the person in this server!');
        member.addRole(message.guild.roles.find("name", "Admin"));
        message.reply("That user now has Admin role!");
        member.guild.channels.find("name", "staff-log").sendMessage(`${member} **has been given admin by** ${message.author.tag}`);        
    }

    if(command === `${prefix}mod`) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Sorry, you don't have permissions to use this!");
        const member = message.mentions.members.first();
        if (!member) return message.reply('Invalid usage, please mention the person in this server!');
        member.addRole(message.guild.roles.find("name", "Mod"));
        message.reply("That user now has Mod role!");
        member.guild.channels.find("name", "staff-log").sendMessage(`${member} **has been give Mod role by** ${message.author.tag}`);
        
    }

    if(command === `${prefix}trusted`) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Sorry, you don't have permissions to use this!");
        const member = message.mentions.members.first();
        if (!member) return message.reply('Invalid usage, please mention the person in this server!');
        member.addRole(message.guild.roles.find("name", "Trusted"));
        message.reply("That user now has Trusted role!");
        member.guild.channels.find("name", "staff-log").sendMessage(`${member} **has been give Trusted role by** ${message.author.tag}`);        
    }

    if(command === `${prefix}mute`) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Sorry, you don't have permissions to use this!");
        const member = message.mentions.members.first();
        if (!member) return message.reply('Invalid usage, please mention the person in this server!');
        member.addRole(message.guild.roles.find("name", "Muted"));
        member.removeRole(message.guild.roles.find("name", "Friends"));
        message.reply("The user will now not be able to talk in chat.");
        member.guild.channels.find("name", "staff-log").sendMessage(`${member} **has been muted by** ${message.author.tag}`);
    }

    if(command === `${prefix}unmute`) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Sorry, you don't have permissions to use this!");
        const member = message.mentions.members.first();
        if (!member) return message.reply('Invalid usage, please mention the person in this server!');
        member.removeRole(message.guild.roles.find("name", "Muted"));
        member.addRole(message.guild.roles.find("name", "Friends"));
        message.reply("The user will now be able to talk in chat.");
        member.guild.channels.find("name", "staff-log").sendMessage(`${member} **has been unmuted by** ${message.author.tag}`);
    }

    if(command === `${prefix}adminhelp`) {
        var embedhelpmember = new Discord.RichEmbed()
        .setTitle("**List of Admin Commands**\n")
        .addField("Kick", "Kicks the mentioned user.") 
        .addField("Ban", "Bans the mentioned user.") 
        .addField("Admin", "Gives the mentioned user admin role. Must have Admin or higher role to give.") 
        .addField("Mod", "Gives the mentioned user Mod role. Must have Admin or higher role to give.") 
        .addField("Trusted", "Gives the mentioned user Trusted role. Must have Admin or higher role to give.") 
        .addField("Mute", "The mentioned user will not be able to talk in chat.")
        .addField("Unmute", "The muted user wil be able to talk in chat.")
        .setColor("#02e3fc")
        .setFooter("That's all the admin commands added so far.");
        message.channel.sendEmbed(embedhelpmember);
    }
});

bot.on("ready", () => bot.user.setGame("in Nemesis Gaming"));

bot.login("Mzk1ODA2NDAyNTE1MzA0NDUw.DSYO9Q.0fwlo5bqVjH1dR8nRe9GfkhVKAI");
