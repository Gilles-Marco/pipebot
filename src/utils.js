import Discord from 'discord.js'
import StorageManager from './storage_manager.js'
import config from '../config.js'

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
 * @param {Discord.GuildMember} user 
 * @return {boolean} true if admin false if not
 */
export function is_admin(member) {
    if (member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)) return true
    else return false
}

/**
 *
 *
 * @export
 * @param {Discord.Guild} server server to fetch the default channel
 * @return {Discord.Channel} default channel
 */
export function get_default_channel(server){
    let default_channel = null
    let server_data = null

    let instance_storage = StorageManager.getInstance()
    if ((server_data = instance_storage.get_server_info(server.id))) {
        if (config.default_channel_key in server_data)
            default_channel = server_data.default_channel
    }

    if (default_channel === null) {
        default_channel = get_first_text_channel(server.channels)
    }

    return default_channel
}