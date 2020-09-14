import config from "../config.js"
import fs from 'fs'

/**
 * Singleton managing the storage
 * To use this class you must use the getInstance() function
 * do not use the constructor by yourself
 *
 * @export
 * @class StorageManager
 */
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

    /**
     *
     *
     * @return {Boolean} true if the storage file has been created, false if not 
     * @memberof StorageManager
     */
    is_storage_exist() {
        const files = fs.readdirSync('./')
        return files.includes(this.storage_file)
    }

    /**
     * Create the storage file
     *
     * @memberof StorageManager
     */
    create_storage() {
        fs.writeFileSync(`./${this.storage_file}`, '{}')
    }

    /**
     * Read the storage file
     *
     * @return {JSON} return a JSON Object stored in the storage  
     * @memberof StorageManager
     */
    read_storage() {
        return JSON.parse(fs.readFileSync(`./${this.storage_file}`))
    }

    /**
     * Do not use this constructor, use getInstance() instead
     * @memberof StorageManager
     */
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
    
    /**
     * Save the JSON Object into his file storage
     *
     * @memberof StorageManager
     */
    save_to_storage() {
        fs.writeFileSync(`./${this.storage_file}`, JSON.stringify(this.json_data))
    }

    /**
     * Get info about server's stored inforamtion
     *
     * @param {String} serverId server key
     * @return {JSON} JSON representation of the server
     * @memberof StorageManager
     */
    get_server_info(serverId) {
        if (serverId in this.json_data) {
            return this.json_data[serverId]
        } else return false
    }

    /**
     * Set a JSON Object for the server
     *
     * @param {String} serverId server key
     * @param {JSON} serverObject server json value
     * @memberof StorageManager
     */
    set_server_info(serverId, serverObject) {
        this.json_data[serverId] = serverObject
        this.save_to_storage()
    }

    /**
     * Update or set a value in the stored information about a server
     *
     * @param {*} serverId server key
     * @param {*} key attribute's name
     * @param {*} value attribute's value
     * @memberof StorageManager
     */
    update_server_info(serverId, key, value) {
        if (!(serverId in this.json_data)) {
            console.log('Server id not in the log')
            this.json_data[serverId] = {}
        }

        this.json_data[serverId][key] = value
        this.save_to_storage()
    }

}