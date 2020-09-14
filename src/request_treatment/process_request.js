import StorageManager from '../storage_manager.js'
import config from '../../config.js'
import {
    get_channel_by_name,
    get_first_text_channel
} from '../utils.js'
import Discord from 'discord.js'

/**
 *
 *
 * @export
 * @param {String} request string to transform to JSON representing POST request body
 * @param {Discord.Client} discord_client discord client who manage the bot
 * @return {Object} return information to write off in the request response
 */
export function processing_request(request, discord_client) {
    request = JSON.parse(request)

    let status = 200
    let body = ""

    if (request_is_valid(request)) {
        if (is_server_existing(discord_client, request.serverId)) {
            // Get channel to output the message
            let output_channel = get_channel_output(discord_client, request)
            output_channel.send(request.message)
            body = `the message was sent successfully to channel ${output_channel.name}`
        } else {
            status = 400
            body = "This server does not exist or has not installed this instance of pipebot"
        }
    } else {
        status = 400
        body = "This request is not valid, it need to be in JSON format with serverId and message keys at minimum"
    }

    return {
        "status": status,
        "options": {
            'Content-Type': 'text/html'
        },
        "body": body
    }
}

/**
 * Validate if the POST Request is valid
 * by checking if it has all required attribute
 *
 * @param {Object} request
 * @return {Boolean} 
 */
function request_is_valid(request) {
    if ('serverId' in request && 'message' in request)
        return true
    else
        return false
}

/**
 * Check if the server has installed the bot
 *
 * @param {Discord.Client} discord_client
 * @param {String} serverId server key
 * @return {Boolean} 
 */
function is_server_existing(discord_client, serverId) {
    let guilds_ids = discord_client.guilds.keyArray()
    return guilds_ids.includes(serverId)
}

/**
 * Get the default channel for the specified server in the request
 *
 * @param {Discord.Client} discord_client
 * @param {Object} request
 * @return {Discord.Channel} 
 */
function get_channel_output(discord_client, request) {
    let storage_instance = StorageManager.getInstance()
    let server_info = storage_instance.get_server_info(request.serverId)
    // Priority for channel in the request
    if ('channel' in request) {
        return get_channel_by_name(discord_client.guilds.get(request.serverId).channels, request.channel)
    }

    // Second highest priority is the channel in storage
    if (server_info) {
        if (config.default_channel_key in server_info)
            return get_channel_by_name(discord_client.guilds.get(request.serverId).channels, server_info[config.default_channel_key])
    }

    // lastest priority is the first text channel to ouput
    return get_first_text_channel(discord_client.guilds.get(request.serverId).channels)
}