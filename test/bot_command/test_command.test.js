import expect from 'chai'
import dotenv from 'dotenv'
import { get_first_text_channel } from '../../src/utils.js'
import give_info from '../../src/bot_command/give_info.js'

describe('Give info command', ()=>{
    
    let process = dotenv.config().parsed
    let server = {
        id: 'a88975bhf4567',
        channels: {
            '566a8aafbh6': {
                type: "text",
                name: "Général"
            }
        }
    }
    let default_channel = get_first_text_channel(server.channels)

    let right_message = `To send a message to pipe into discord's server you have to send an HTTP POST request to this URL\n\
    URL : ${process.URL+":"+process.PORT}\n\
    With this HTTP Request you have to send a JSON body\n\
    {\n\
        \t"serverId": "${server.id}",\n\
        \t"channel": <channel-to-pipe-in>(optionnal),\n\
        \t"message": <your-message-here>\n\
    }\n\
    Default channel is ${default_channel}`
    it('Give right info', ()=>{
        expect(give_info(server)).to.equals(right_message)
    })
})