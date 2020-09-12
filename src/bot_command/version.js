import fs from 'fs'
const version = JSON.parse(fs.readFileSync('./package.json', {
    encoding: 'utf-8'
})).version

export default () => {
    /**
     * Return a string describing pipebot's version
     * @returns {String} - Version of pipebot
     */

    return `pipebot's version is : ${version}`
}