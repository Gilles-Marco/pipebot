import chai from 'chai'
import dotenv from 'dotenv'
import { get_default_channel } from '../../src/utils.js'
import give_info from '../../src/bot_command/give_info.js'
import version from '../../src/bot_command/version.js'
import set_default_channel from '../../src/bot_command/set_default_channel.js'
import Discord from 'discord.js'
import fs from 'fs'

let assert = chai.assert
let process = dotenv.config().parsed

function get_ready_bot(){
    return new Promise((resolve, reject)=>{
        let bot = new Discord.Client()
        bot.login(process.TOKEN)

        let timeout = setTimeout(()=>{
            reject('timeout')
        }, 3000)

        bot.on('ready', ()=>{
            clearTimeout(timeout)
            resolve(bot)
        })
    })
}

describe('Bot command test', ()=>{
    it('Give right info', async ()=>{
        let value = await get_ready_bot().catch((error)=>{
            assert.fail(`Error ${error}`)
        })

        let server = value.guilds.get(value.guilds.firstKey())
        let default_channel = get_default_channel(server)

        let right_message = `To send a message to pipe into discord's server you have to send an HTTP POST request to this URL\n\
    URL : ${process.URL+":"+process.PORT}\n\
    With this HTTP Request you have to send a JSON body\n\
    {\n\
        \t"serverId": "${server.id}",\n\
        \t"channel": <channel-to-pipe-in>(optionnal),\n\
        \t"message": <your-message-here>\n\
    }\n\
    Default channel is ${default_channel}`
        let generated_message = give_info(server)
        value.destroy()
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

    it('set_default_channel wrong_guild', () => {
        
    })

    it('set_default_channel wrong_channel', () => {

    })

    it('set_default_channel not_an_admin_user', () => {

    })

    it('set_default_channel good', () => {

    })
})