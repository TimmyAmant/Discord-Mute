const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {

    // Check perms, self, rank, etc
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have Permission to unmute!");
    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("You did not specify a user mention or ID!");
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You can not unmute a member that is equal to or higher than yourself!");

    // Check if the user has the mutedRole
    let mutedRole = message.guild.roles.find(mR => mR.name === "Muted");

    // If the mentioned user or ID does not have the "mutedRole" return a message
    if(!mutedRole || !toMute.roles.has(mutedRole.id)) return message.channel.send("This user is not muted!");

    // Remove the mentioned users role "mutedRole", "muted.json", and notify command sender
    await toMute.removeRole(mutedRole);

    member.removeRole(mutedRole);
    delete bot.muted[toMute.id];

    fs.writeFile("./muted.json", JSON.stringify(bot.muted), err => {
        if(err) throw err;
        message.channel.send(`I have unmuted ${toMute.user.tag}!`);
    });
    
}

module.exports.help = {
    name: "unmute"
}