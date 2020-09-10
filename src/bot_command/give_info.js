import dotenv from 'dotenv'
import StorageManager from '../storage_manager.js'
const process = dotenv.config().parsed
import config from '../../config.js'

export default (server) => {
/**
 * Send the information to send POST request to the user
 * @returns {String} - Message to send back to user
 */
    let default_channel = null
    let server_data = null

    let instance_storage = StorageManager.getInstance()
    if((server_data = instance_storage.get_server_info(server.id))){
        if(config.default_channel_key in server_data)
            default_channel = server_data.default_channel
    }

    if (default_channel === null){
        let channel_ids = server.channels.keyArray()
        for(let i=0;i<channel_ids.length;i++){
            let channel = server.channels.get(channel_ids[i])
            if (channel.type === 'text'){
                default_channel = channel
                break
            }
        }
    }

    const msg = `To send a message to pipe into discord's server you have to send an HTTP POST request to this URL\n\
    URL : ${process.URL+":"+process.PORT}\n\
    With this HTTP Request you have to send a JSON body\n\
    {\n\
        \t"serverId": "${server.id}",\n\
        \t"channel": <channel-to-pipe-in>(optionnal),\n\
        \t"message": <your-message-here>\n\
    }\n\
    Default channel is ${default_channel}`
    return msg
}