import config from "../config.js"
import fs from 'fs'

export default class StorageManager {

    static instance = null

    storage_file = config.storage_file
    json_data = null

    static getInstance() {
        if (StorageManager.instance == null) {
            console.log("Creating the instance for StorageManager")
            StorageManager.instance = new StorageManager()
        }
        return StorageManager.instance
    }

    is_storage_exist() {
        const files = fs.readdirSync('./')
        return files.includes(this.storage_file)
    }

    create_storage() {
        fs.writeFileSync(`./${this.storage_file}`, '{}')
    }

    read_storage() {
        return JSON.parse(fs.readFileSync(`./${this.storage_file}`))
    }

    constructor() {
        // Check on import if it is necessary to create the storage
        if (!this.is_storage_exist()) {
            this.create_storage()
        }

        // Read all the storage if storage has not been read
        if (this.json_data == null) {
            this.json_data = this.read_storage()
        }
    }

    save_to_storage() {
        fs.writeFileSync(`./${this.storage_file}`, JSON.stringify(this.json_data))
    }

    get_server_info(serverId) {
        if (serverId in this.json_data) {
            return this.json_data[serverId]
        } else return false
    }

    set_server_info(serverId, serverObject) {
        this.json_data[serverId] = serverObject
        this.save_to_storage()
    }

    update_server_info(serverId, key, value) {
        if (!(serverId in this.json_data)) {
            console.log('Server id not in the log')
            this.json_data[serverId] = {}
        }

        this.json_data[serverId][key] = value
        this.save_to_storage()
    }

}