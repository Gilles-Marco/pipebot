import StorageManager from '../storage_manager.js'
import config from '../../config.js'
import { is_channel_exist } from '../utils.js'

export default (server, channelName) => {
    let storage_instance = StorageManager.getInstance()
    channelName = channelName.replace('"', '').toLowerCase()

    //Check if channel exist
    if(!is_channel_exist(server.channels, channelName)){
        return 'This channel doesn\'t exist'
    }

    storage_instance.update_server_info(server.id, config.default_channel_key, channelName)
    return 'Default channel set to '+channelName
}