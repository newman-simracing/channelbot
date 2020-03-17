const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.TOKEN;
require('./functions');
adminuser = '161125958881902592';
client.login(token);

//Standard Channelnamen
const channellist = [
    {
        id: 494579950116929547,
        name: "Teamleitung"
    },
    {
        id: 423184432665591822,
        name: "Public"
    },
    {
        id: 590824653564411904,
        name: "Public"
    },
    {
        id: 521882053504008192,
        name: "Public"
    },
    {
        id: 590824785076813834,
        name: "Public"
    },
    {
        id: 423185199199682560,
        name: "Intern"
    },
    {
        id: 590824856300421136,
        name: "Intern"
    }
];
//const filterUpdate = channellist.filter(array => array.update == true);


function toTitleCase(str) {
    console.log(str);
    if (str === str.toUpperCase()) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    else {
        return str;
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    //Channelname ändern falls jemand streamt
    if (typeof newMember.voiceChannel !== 'undefined') {
        let filterID = channellist.filter(array => array.id == newMember.voiceChannelID);
        if (filterID.length > 0) {
            if (newMember.presence.game != null) {
                if (newMember.presence.game.type == 1) {
                    newMember.voiceChannel.setName("Stream: " + toTitleCase(newMember.presence.game.name)).catch(console.error);
                }
            }
        }
    }
    //Channelnamen auf Standard setzen wenn Channel leer ist
    if (typeof oldMember.voiceChannel !== 'undefined') {
        if (oldMember.voiceChannel.members.size == 0) {
            let filterID = channellist.filter(array => array.id == oldMember.voiceChannelID);
            if (filterID.length > 0) {
                oldMember.voiceChannel.setName(filterID[0].name).catch(console.error);
            }
        }
    }
});


client.on('presenceUpdate', (oldMember, newMember) => {
    //Channelname ändern falls jemand streamt
    if (typeof newMember.voiceChannel !== 'undefined') {
        let filterID = channellist.filter(array => array.id == newMember.voiceChannelID);
        if (filterID.length > 0) {
            if (newMember.presence.game != null) {
                if (newMember.presence.game.type == 1) {
                    newMember.voiceChannel.setName("🔴 " + toTitleCase(newMember.voiceChannel.name)).catch(console.error);
                }
            }
        }
    }
});

client.on('message', msg => {
    //ignore
    /*msg.guild.createRole({
      name: 'Admins',
      permissions: 'ADMINISTRATOR',
    })
      .then(role => console.log(role))
      .catch(console.error)*/

    //Adminrechte vergeben
    if (msg.content === '!give' && msg.member.id == adminuser) {
        msg.member.addRole(msg.guild.roles.get('586124983030513664')).then(msg.delete()).catch(console.error);;
    }
    //Voicechannel umbennen durch #channelname
    if (msg.channel.id == 625974318718910475 && msg.member.voiceChannelID != null){
        let matchVoiceChannel = channellist.filter(array => array.id == msg.member.voiceChannelID);
        if (matchVoiceChannel.length > 0) {
            msg.member.voiceChannel.edit({ name: msg.cleanContent }).then(console.log).catch(console.error);
        }
    }
    //Adminrechte entziehen
    if (msg.content === '!take') {
        msg.member.removeRole(msg.guild.roles.get('586124983030513664')).then(msg.delete()).catch(console.error);;
    }
    //Bot Name ändern
    if (msg.content.startsWith("!nickname ") && msg.member.id == adminuser) {
        console.log("dflhskjdh");
        msg.guild.me.setNickname(msg.content.substring(10));
    }
});
