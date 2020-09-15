import chai from 'chai'
import dotenv from 'dotenv'
import { get_default_channel } from '../../src/utils.js'
import give_info from '../../src/bot_command/give_info.js'
import version from '../../src/bot_command/version.js'
import Discord from 'discord.js'
import fs from 'fs'
import set_default_channel from '../../src/bot_command/set_default_channel.js'
import settup from '../../config.js'
import StorageManager from '../../src/storage_manager.js'

let assert = chai.assert
let process = dotenv.config().parsed

let bot = null
let server = null
let channel = null
let admin = null
let simple_member = null

export function get_ready_bot(){
    return new Promise((resolve, reject)=>{
        let bot = new Discord.Client()
        bot.login(process.TOKEN)

        let timeout = setTimeout(()=>{
            reject('timeout')
        }, 10000)

        bot.on('ready', ()=>{
            clearTimeout(timeout)
            resolve(bot)
        })
    })
}

function get_admin_member(bot, serverId){
    return bot.guilds.get(serverId).members.find(member => member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR))
}

function get_nonadmin_member(bot, serverId){
    return bot.guilds.get(serverId).members.find(member => !(member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)))
}

function get_server_default_channel(serverId){
    let instance = StorageManager.getInstance()
    let server_info = instance.get_server_info(serverId)
    return server_info[settup.default_channel_key]
}

describe('Bot command test', ()=>{
    before(async ()=>{
        bot = await get_ready_bot()
        server = bot.guilds.get(bot.guilds.firstKey())
        channel = get_default_channel(bot.guilds.get(bot.guilds.firstKey()))
        admin = get_admin_member(bot, server.id)
        simple_member = get_nonadmin_member(bot, server.id)
    })

    after(()=>{
        bot.destroy()
    })

    it('Give right info', async ()=>{
        let right_message = `To send a message to pipe into discord's server you have to send an HTTP POST request to this URL\n\
    URL : ${process.URL+":"+process.PORT}\n\
    With this HTTP Request you have to send a JSON body\n\
    {\n\
        \t"serverId": "${server.id}",\n\
        \t"channel": <channel-to-pipe-in>(optionnal),\n\
        \t"message": <your-message-here>\n\
    }\n\
    Default channel is ${channel}`
        let generated_message = give_info(server)
        assert(generated_message == right_message, 'Give_info doesnt give the right info')     
    })

    it('pipebot version', ()=>{
        const versionpkg = JSON.parse(fs.readFileSync('./package.json', {
            encoding: 'utf-8'
        })).version
        let generated_message = version()
        let right_message = `pipebot's version is : ${versionpkg}`
        assert(generated_message == right_message, 'pipebot doesnt give the right version')
    })

    it('set_default_channel good', ()=>{
        let channelName = channel.name
        let msg = {
            guild: server,
            member: admin,
            content: `pipebot set_default_channel ${channelName}`
        }

        let return_func = set_default_channel(msg)
        assert(return_func == `Default channel set to ${channelName}`, `Pipebot hasnt setted the right channel, "${return_func}" instead of ${channelName}`)
        assert(get_server_default_channel(server.id) == channelName, `Wrong channel set in the storage file, stored ${get_server_default_channel(server.id)} instead of ${channelName}`)
    })

    it('set_default_channel wrong user', ()=>{
        let msg = {
            guild: server,
            member: simple_member,
            content: `pipebot set_default_channel ${channel.name}`
        }

        let return_func = set_default_channel(msg)
        assert(return_func == 'You need to be an administrator to do this action', `Pipebot has set a channel, "${return_func}" when he shouldnt`)
    })

    it('set_default_channel wrong channel', ()=>{
        let msg = {
            guild: server,
            member: admin,
            content: `pipebot set_default_channel udenufjojfojojojjojoj`
        }

        let return_func = set_default_channel(msg)
        assert(return_func == `This channel doesn\'t exist`, `Pipebot has set an inexisting channel "${return_func}"`)
    })
})