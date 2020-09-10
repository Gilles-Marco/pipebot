import dotenv from 'dotenv'
const process = dotenv.config().parsed

export default (serverId, default_channel) => {
/**
 * Send the information to send POST request to the user
 * @returns {String} - Message to send back to user
 */
    const msg = `To send a message to pipe into discord's server you have to send an HTTP POST request to this URL\n\
    URL : ${process.URL+":"+process.PORT}\n\
    With this HTTP Request you have to send a JSON body\n\
    {\n\
        \t"serverId": ${serverId},\n\
        \t"channel": <channel-to-pipe-in>(optionnal),\n\
        \t"message": <your-message-here>\n\
    }\n\
    Default channel is ${default_channel}`
    return msg
}