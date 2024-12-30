const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

const token = 'NHẬP TOKEN BOT Ở ĐÂY'; // Thay thế YOUR_BOT_TOKEN bằng token của bot

const joinTimes = new Map();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    const member = newState.member;

    if (!oldState.channelId && newState.channelId) {
        // User joined a voice channel
        joinTimes.set(member.id, Date.now());
        scheduleMessages(member, newState.channel);
    } else if (oldState.channelId && !newState.channelId) {
        // User left a voice channel
        joinTimes.delete(member.id);
    }
});

function scheduleMessages(member, channel) {
    const intervals = [
        { time: 10 * 1000, message: "**đã treo bot được 10 giây rồi!**" },
        { time: 1 * 60 * 60 * 1000, message: "**đã treo bot được 1 tiếng rồi!**" },
        { time: 1.5 * 60 * 60 * 1000, message: "**đã treo bot được 1 tiếng 30 phút rồi!**" },
        { time: 2 * 60 * 60 * 1000, message: "**đã treo bot được 2 tiếng rồi!**" },
        { time: 3 * 60 * 60 * 1000, message: "**đã treo bot được 3 tiếng rồi!**" },
        { time: 4 * 60 * 60 * 1000, message: "**đã treo bot được 4 tiếng rồi!**" },
        { time: 5 * 60 * 60 * 1000, message: "**đã treo bot được 5 tiếng rồi!**" },
        { time: 6 * 60 * 60 * 1000, message: "**đã treo bot được 6 tiếng rồi!**" },
        { time: 7 * 60 * 60 * 1000, message: "**đã treo bot được 7 tiếng rồi!**" },
        { time: 8 * 60 * 60 * 1000, message: "**đã treo bot được 8 tiếng rồi!**" },
        { time: 9 * 60 * 60 * 1000, message: "**đã treo bot được 9 tiếng rồi!**" },
        { time: 10 * 60 * 60 * 1000, message: "**đã treo bot được 10 tiếng rồi!**" },
        { time: 11 * 60 * 60 * 1000, message: "**đã treo bot được 11 tiếng rồi!**" },
        { time: 12 * 60 * 60 * 1000, message: "**đã treo bot được 12 tiếng rồi!**" },
        { time: 24 * 60 * 60 * 1000, message: "**đã treo bot được 1 ngày rồi!**" },
        { time: 36 * 60 * 60 * 1000, message: "**đã treo bot được 2 ngày rồi!**" },
        { time: 72 * 60 * 60 * 1000, message: "**đã treo bot được 3 ngày rồi!**" }
    ];

    for (let interval of intervals) {
        setTimeout(async () => {
            if (joinTimes.has(member.id)) {
                const elapsed = Date.now() - joinTimes.get(member.id);
                if (elapsed >= interval.time) {
                    const permissions = channel.permissionsFor(client.user);
                    if (permissions.has(PermissionsBitField.Flags.SendMessages)) {
                        channel.send(`<@${member.id}> ${interval.message}`);
                    } else {
                        console.log(`Missing permission to send messages in the channel: ${channel.id}`);
                    }
                }
            }
        }, interval.time);
    }
}

client.login(token);