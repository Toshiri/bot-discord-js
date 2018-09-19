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
	member.guild.channels.find("name", "accueil").send(":pizza: " + member.user.username + " a rejoint gangstar");
})

Bot.on("guildMemberRemove", member => {
	member.guild.channels.find("name", "acceuil").send(":disappointed_relieved: " + member.user.username + " a quitté gangstar");
})





Bot.on("message" ,  message => {
	var messageArray = message.content.split(" ");
	var command = messageArray[0];
	var args = messageArray.slice(1);
		if(command === prefixe + "kick"){
			if(!message.member.hasPermission("MANAGE_MESSAGE")){
				return message.channel.sendMessage("Vous n'avez pas la permission d'utiliser cette commande");
			}
			let kickMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
			if(!message.guild.member(Bot.user).hasPermission("KICK_MEMBERS")){
				return message.channel.sendMessage("Je n'ai pas la permission d'expulser des membres");
			}
			kickMember.kick().then(member => {
				message.channel.sendMessage(member + "A été expulsé");
				member.guild.channels.find("name", "staff").sendMessage(member + " a été expulsé par : " + message.author.username);
			});
		
	};
	if(command === prefixe + "ban"){
			if(!message.member.hasPermission("MANAGE_MESSAGE")){
				return message.channel.sendMessage("Vous n'avez pas la permission d'utiliser cette commande");
			}
			let banMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
			if(!message.guild.member(Bot.user).hasPermission("BAN_MEMBERS")){
				return message.channel.sendMessage("Je n'ai pas la permission de bannir des membres");
			}
			banMember.ban().then(member => {
				message.channel.sendMessage(member + "A été banni");
				member.guild.channels.find("name", "staff").sendMessage(member + " a été expulsé par : " + message.author.username);
			});
		
	};
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
		
		if(message.content === "test"){
			message.reply("test");
		}
		if(command == prefixe + "staff"){
			var staff_embed = new Discord.RichEmbed()
				.setColor("#18D731")
				.setTitle("Voici le staff:")
				.addField("Fondateur :", "Toshiri")
				.addField("Co-Fondateur :", "Mrfrifol")
				.addField("Chef-Administrateur :", "Farcox")
				.addField("Administrateur :", "Golden Freedy's")
				.addField("Chef-Moderateur :", "Gaming Studio YT")
				.addField("Moderateur :", "KizerGHD\nAlan Poireau")
			message.channel.sendEmbed(staff_embed)
		}

});





function random(min, max){
	min = Math.ceil(1);
	max = Math.floor(2);
	randnum = Math.floor(Math.random() * (max - min +1 ) + min);

}
