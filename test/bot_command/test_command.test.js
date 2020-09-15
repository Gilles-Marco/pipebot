import chai from 'chai'
import dotenv from 'dotenv'
import { get_default_channel } from '../../src/utils.js'
import give_info from '../../src/bot_command/give_info.js'
import Discord from 'discord.js'

let assert = chai.assert
let process = dotenv.config().parsed
let bot = new Discord.Client()
bot.login(process.TOKEN)

describe('Give info command', ()=>{
    it('Give right info', ()=>{
        new Promise((resolve, reject)=>{
            let timeout = setTimeout(()=>{
                reject('timeout')
            }, 3000)

            bot.on('ready', ()=>{
                clearTimeout(timeout)
                resolve(bot)
            })
        }).then((value)=>{
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
            // assert('a' == 'a', 'a is different from a')
        }).catch((error)=>{
            console.error(`Error : ${error}`)
        })
            
    })
})