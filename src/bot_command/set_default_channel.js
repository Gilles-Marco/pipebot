import StorageManager from '../storage_manager.js'

export default (serverId, channelName) => {
    console.log(StorageManager)
    let storage_instance = StorageManager.getInstance()
    channelName = channelName.replace('"', '').toLowerCase()
    // Todo check if the channel exist
    storage_instance.update_server_info(serverId, 'default_channel', channelName)
    return 'Default channel set to '+channelName
}