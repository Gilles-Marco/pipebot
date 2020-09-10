import StorageManager from '../storage_manager.js'
import config from '../../config.js'

export default (server, channelName) => {
    let storage_instance = StorageManager.getInstance()
    channelName = channelName.replace('"', '').toLowerCase()

    //Check if channel exist
    let channel_ids = server.channels.keyArray()
    let channel_names = []
    for(let i=0;i<channel_ids.length;i++){
        let channel = server.channels.get(channel_ids[i])
        if(channel.type === 'text'){
            channel_names.push(channel.name)
        }
    }

    console.log(channel_names)
    if (!(channel_names.includes(channelName))){
        return 'This channel doesn\'t exist'
    }

    storage_instance.update_server_info(server.id, config.default_channel_key, channelName)
    return 'Default channel set to '+channelName
}