import give_info from './give_info.js'
import version from './version.js'
import Discord from 'discord.js'

export default (msg) => {
    /**
     * @param {Message} msg - Message from a discord user to respond
     * @returns {String} - Response message to send to user
     */

    let tokens = msg.content.split(' ')
    switch(tokens[1]){
        case 'giveinfo':
            let default_channel = undefined
            let channel_ids = msg.guild.channels.keyArray()
            for(let i=0;i<channel_ids.length;i++){
                let channel = msg.guild.channels.get(channel_ids[i])
                if (channel.type === 'text'){
                    default_channel = channel
                    break
                }
            }
            return give_info(msg.guild.id, default_channel)
        case 'version':
            return version()
        default:
            let explanations = [
                "giveinfo - Give information how to send message to pipebot server to pipe it into discord's server",
                "version - Give pipebot's version",
            ]
            return `Here is the list of the commands\n${explanations.join('\n')}`
    }
}