import give_info from './give_info.js'
import version from './version.js'

export default (msg) => {
    /**
     * @param {Message} msg - Message from a discord user to respond
     * @returns {String} - Response message to send to user
     */

    let tokens = msg.content.split(' ')
    switch(tokens[1]){
        case 'giveinfo':
            return give_info()
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