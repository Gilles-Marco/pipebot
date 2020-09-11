export function get_channel_by_name(channels, channelName){
    return channels.find(c => c.name == channelName)
}

export function get_first_text_channel(channels){
    let channel_ids = channels.keyArray()
    for(let i=0;i<channel_ids.length;i++){
        let channel = channels.get(channel_ids[i])
        if (channel.type === 'text'){
            return channel
        }
    }
    return false
}

export function is_channel_exist(channels, channelName){
    return (channels.find(c => c.name == channelName)) ? true : false
}