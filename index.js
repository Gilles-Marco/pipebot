import dotenv from 'dotenv'
import Discord from 'discord.js'
import commands_factory from './src/bot_command/commands_factory.js'

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
// Todo
