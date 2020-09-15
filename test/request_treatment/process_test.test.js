import chai from 'chai'
import { processing_request } from '../../src/request_treatment/process_request.js'
import { get_ready_bot } from '../bot_command/test_command.test.js'
import {
    get_channel_by_name,
    get_first_text_channel
} from '../../src/utils.js'

const assert = chai.assert
let bot = null
let server = null

describe('Request treatment test', ()=>{
    before(async ()=>{
        bot = await get_ready_bot()
        server = bot.guilds.get(bot.guilds.firstKey())
    })

    after(()=>{
        bot.destroy()
    })

    it('Good request without channelName', ()=>{

    })

    it('Good request with channelName', ()=>{

    })

    it('Bad request without message', ()=>{

    })

    it('Bad request without serverId', ()=>{
        
    })

    it('Bad request with bad channel', ()=>{

    })

    it('Bad request with bad serverId', ()=>{
        
    })

    it('Bad request without channel and serverId', ()=>{

    })

    it("Good request is valid", ()=>{

    })

    it("Bad request is valid without serverId", ()=>{

    })

    it("Bad request is valid without message", ()=>{

    })

    it("Good server exist", ()=>{

    })

    it("Bad server exist", ()=>{

    })

    it("Good get channel output by specifiyng channel", ()=>{

    })

    it("Bad get channel output by wrong specifiyng channel", ()=>{
        
    })

    it("Good get channel output by channel stored in storage", ()=>{

    })

    it("Bad get channel output by channel by wrong channel stored in storage", ()=>{

    })

    it("Good retrieve first text channel", ()=>{

    })
})