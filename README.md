# Pipebot

## License

Pipebot is under ISC license

## Description

Pipebot is a simple discord bot. His goal is simplify how to send messages into a discord servers' channel.

Pipebot receive message from HTTP POST request and send it into a channel.

Pipebot will give you every informations to send the POST request, server's IP, server's PORT, and message's format

## Installation

To install pipebot

1. Create a bot application on discord developer portal
2. Configure your bot
3. Copy bot's token into your clipboard
4. Invite your bot into your server
5. Simply run this command in your terminal

```
git clone https://github.com/Gilles-Marco/pipebot.gits
cd pipebot
npm install
echo "URL=127.0.0.1\nPORT=55555\nTOKEN=<your-token-here>\n" > .env
npm start
```

## Pipebot's command

Pipebot prefix is pipebot

- pipebot giveinfo - Give information how to send message to pipebot http server to pipe it into discord's server
- pipebot version - Give pipebot's version
- pipebot set_default_channel <your-channel-name> - Set the default channel output

If your channel has space in his name you must put it between quotes. If pipebot can't find it, it will tell you.

If you doesn't set a default channel or a specified channel output pipebot will print the message in the first text channel it founds.

Message's format must be

```json
{
  "serverId": "<your-server-id (pipebot will give it to you with giveinfo command)>",
  "channel": "<your-channel-to-output(this attribute is optionnal and can be forgotten)>",
  "message": "<your-message>"
}
```
