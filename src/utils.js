import Discord from 'discord.js'

/**
 *
 *
 * @export
 * @param {Discord.ChannelManager} channels list of discord server's channels
 * @param {String} channelName channel to get by name
 * @return {Channel} channel with the adequate name 
 */
export function get_channel_by_name(channels, channelName) {
    return channels.find(c => c.name == channelName)
}

/**
 *
 *
 * @export
 * @param {Discord.GuildChannelManager} channels list of discord server's channels
 * @return {Discord.Channel} first discord server's text channel
 */
export function get_first_text_channel(channels) {
    let channel_ids = channels.keyArray()
    for (let i = 0; i < channel_ids.length; i++) {
        let channel = channels.get(channel_ids[i])
        if (channel.type === 'text') {
            return channel
        }
    }
    return false
}

/**
 *
 *
 * @export
 * @param {Discord.GuildChannelManager} channels list of discord server's channels
 * @param {String} channelName channel's name to find
 * @return {boolean} true if exist else if not
 */
export function is_channel_exist(channels, channelName) {
    return (channels.find(c => c.name == channelName)) ? true : false
}

/**
 *
 *
 * @export
 * @param {Discord.User} user 
 * @return {boolean} true if admin false if not
 */
export function is_admin(user) {
    return false
}