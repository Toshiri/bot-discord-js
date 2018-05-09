const Discord = require("discord.js");
const ms = require("ms");



var prefixe = ("/");
var randnum = 0;

var Bot = new Discord.Client();

Bot.on("ready", () => {
	console.log("Bot On");
})


Bot.login(process.env.TOKEN);

Bot.on("guildMemberAdd", member => {
	member.guild.channels.find("name", "general").send(":pizza: " + member.user.username + " a rejoint gangstar");
})

Bot.on("guildMemberRemove", member => {
	member.guild.channels.find("name", "general").send(":disappointed_relieved: " + member.user.username + " a quitté gangstar");
})





Bot.on("message" ,  message => {
	var messageArray = message.content.split(" ");
	var command = messageArray[0];
	var args = messageArray.slice(1);

		if(message.content === prefixe + "help"){
			var help_embed = new Discord.RichEmbed()
				.setColor("#0713BD")
				.addField("Commandes du ToshiBot :", "    /help Pour demander de l'aide\n/pileouface pour faire un Pile Ou face")
				.addField("Commandes de moderation :", "/mute <Mention du joueur> <tempdemute> - Permet de muter quelqu'un")
			message.channel.sendEmbed(help_embed);
		}
		if(message.content === prefixe + "pileouface"){
			random();
			if (randnum == 1){
				message.reply("Pile!");
			}
			if (randnum == 2){
				message.reply("Facee!");
			}
		}
		
		if(command === prefixe + "mute"){
			if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Vous n'avez pas la permission d'utiliser cette commande");

				var toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
				if(!toMute) return message.channel.sendMessage("Vous n'avez pas specifié un utilisateur!");
				
				var mutetime = args[1];
				if(!mutetime) return message.channel.sendMessage("Vous n'avez pas specifié de temp de mute");
				const role = message.guild.roles.find("name", "muted") || message.guild.createRole ({ 
					name: "muted",
					color: "#000000",
					permissions: []
			  	});
			
			try{
				message.guild.channels.forEach(async (channel, id) => {
					await channel.overwritePermissions(role, {
					  SEND_MESSAGES: false,
					  ADD_REACTIONS: false
					});
				  });
			}catch(e){

			}
			 if(toMute.roles.has(role.id)) return message.channel.send("Cette perssonne est deja mute");
			 toMute.addRole(role);
			 message.reply("J'ai muté" + toMute)

			 

			setTimeout(function(){
				toMute.removeRole(role);
				message.channel.send("J'ai unmuté" + toMute);
			}, ms(mutetime));
		}

		if(message.content === "aurevoir"){
				message.reply("aurevoir");
		}
		
		if(command === prefixe + "kick"){
			if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission d'utiliser cette commande");
		
			var toKick = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
			if(!toKick) return message.channel.sendMessage("Vous n'avez pas specifié un utilisateur!");

			var reasonToKick = args[1];
			

			var kick_embed = new Discord.RichEmbed()
				.setColor("#0713BD")
				.addField("Kick :", toKick + " a été kické par " + message.member + " pour " + reasonToKick)
			message.guild.channels.find("name", "staff").sendEmbed(kick_embed);

			toKick.kick(reasonToKick);
		}

		if(command === prefixe + "ban"){
			if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission d'utiliser cette commande");
		
			var toBan = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
			if(!toBan) return message.channel.sendMessage("Vous n'avez pas specifié un utilisateur!");

			var reasonToBan = args[1];
			if(!reasonToBan) return message.channel.sendMessage("Vous n'avez pas specifié une raison!");

			var ban_embed = new Discord.RichEmbed()
				.setColor("#0713BD")
				.addField("Bannisement :", toBan + " a été banni par " + message.member + " pour " + reasonToBan)
			message.guild.channels.find("name", "staff").sendEmbed(ban_embed);
			
			message.guild.member(toBan).ban(reasonToBan);
		}

		if(command == prefixe + "staff"){
			var staff_embed = new Discord.RichEmbed()
				.setColor("#0713BD")
				.setTitle("Voici le staff:")
				.addField("Fondateur :", "Toshiri")
				.addField("Co-Fondateur :", "Mrfrifol")
				.addField("Chef-Administrateur :", "Farcox")
				.addField("Administrateur :", "Golden Freedy's")
				.addField("Chef-Moderateur :", "On recrute")
				.addField("Moderateur :", "Gaming Studio\nKizerGHD\nAlan Poireau")
			message.channel.sendEmbed(staff_embed)
		}

});





function random(min, max){
	min = Math.ceil(1);
	max = Math.floor(2);
	randnum = Math.floor(Math.random() * (max - min +1 ) + min);

}
