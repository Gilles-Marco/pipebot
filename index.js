import dotenv from 'dotenv'
import Discord from 'discord.js'
import commands_factory from './src/bot_command/commands_factory.js'
import http from 'http'
import { processing_request } from './src/request_treatment/process_request.js'

const process = dotenv.config().parsed
const bot = new Discord.Client()

const TOKEN = process.TOKEN
const base_url = process.URL
const open_port = process.PORT
const complete_URL = base_url+`:${open_port}`

// Connect the bot to discord

bot.login(TOKEN)

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`)
  console.info(`URL is ${complete_URL}`)
})

bot.on('message', msg => {
  // Check how to treat the message
  if(msg.content.startsWith('pipebot')) {
    msg.reply(commands_factory(msg))
  }
})

// Open socket to receive HTTP POST request
// Todo create an https server
const server = http.createServer((request, response)=>{
  if(request.method == 'POST'){
    let body = ""
    request.on('data', (data)=>{
      body += data
    })
    request.on('end', () => {
      // Process the request
      let processing = processing_request(body, bot)
      response.writeHead(processing.status, processing.options)
      response.end(processing.body)
    })
  }
  else{
    // Every other http protocol that we don't care for
    request.on('end', () => {
      response.writeHead(405, {'Content-type': 'text/html'})
      response.end("This HTTP Protocol is ignored")
    })
  }
});

console.log(`Listening on address ${base_url} on port ${open_port} for HTTP POST request`)
server.listen(open_port, base_url)