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
            return 'Here is the list of the commands\n- giveinfo\n- version'
    }
}