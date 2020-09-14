import give_info from './give_info.js'
import version from './version.js'
import set_default_channel from './set_default_channel.js'

export default (msg) => {
    /**
     * @param {Message} msg - Message from a discord user to respond
     * @returns {String} - Response message to send to user
     */

    let tokens = msg.content.split(' ')
    switch (tokens[1]) {
        case 'giveinfo':
            return give_info(msg.guild)
        case 'version':
            return version()
        case 'set_default_channel':
            return set_default_channel(msg.guild, tokens[2])
        default:
            let explanations = [
                "giveinfo - Give information how to send message to pipebot http server to pipe it into discord's server",
                "version - Give pipebot's version",
                "set_default_channel <channel's name> - Set the default channel output\n\tIf name contains space you have to put it between quotes",
            ]
            return `Here is the list of the commands\n${explanations.join('\n')}`
    }
}