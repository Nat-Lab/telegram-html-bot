### telegram-html-bot
---

telegram-html-bot is a [Telegram bot](https://core.telegram.org/bots/) that runs in web browsers. Simply apply a bot TOKEN from [@botfather](https://telegram.me/botfather), fill it in the `TOKEN` box, and click on "Start Polling", then you are all set! Try send something to bot. 

When a message is received, the `JSON` structure of message will be show on the box above. You can play it with your own code. To do this, write your code in the "Write you own code" block, the code should be written in Javascript. After you finish writing your code, click on "Update Code" to make it active.

### Coding

A `Message` object named message will be pass to your code, you can see it's structure on the box above, or [Telegram bot API document](https://core.telegram.org/bots/api).

Here is a list of methods that are commonly used: 
- `setTarget(int target)`: Set target chat id that message should goes to.
- `setContent(String content)`: Set the content of message. 
- `sendMessage()`: Send the message.

And there are some other methods available:
- `setParseMode(String mode)`: Set how should the message be parse on client side, `HTML`, `Markdown`, or empty for plain text.
- `setUrlPreview(boolean preview)`: Set if client should fetch a preview of URL.
- `setNotification(boolean sendNotify)`: Set if a push notification should be send to target.
 
If you wants to use other APIs, you can do it by:
- `setApi(String apiName)`: Set a API method to use.
- `setPayload(String param)`: Set `POST` parameters.

Here's an example of bot code:

```javascript
send = true;
switch(message["text"]) {
    case "/start": 
		setContent("Hi! I am a bot running in browser!"); 
        break;
    case "/whoami": 
        msg_str = (message["chat"]["type"] == "private") ?
	    	message["chat"]["first_name"] : "in a group!";
        setContent("You are " + msg_str); 
        break;
    case "fuck": 
        if(message["chat"]["type"] != "private") {
            setApi("leaveChat");
            setPayload("chat_id="+message["chat"]["id"]);
            sendCustomApi();
            send = false;
        } else setContent("That's bad.");
        break;
    default: send = false;
}
if (send) {
    setTarget(message["chat"]["id"]);
    sendMessage();
}
```

When bot gets `/start`, it replies with "Hi!". When bot gets `/whoami`, bot replies user's first name if the message are received from private chat, otherwise replies "You are in a group!". When a f-word is received from group, bot will leave that group, or replies "That's bad." if it comes from private chat.

### Misc

There are 9 panels on the page: A bot configuration panel for bot settings, sending message, etc., a code panel for writing bot code, a custom API panel for making custom requests to API, a send/get file panel for sending file and getting file from/to chat, Last request and last respond panel for viewing raw respond json and request parameters, bot session panel for saving a bot in browser’s local storage, as file, or as plain text, and a run code panel for executing code. 

A name can be given when saving a session to browser’s local storage, so you can store multiple codes, or bots in browser. 

### Screenshot

![A running html bot](https://raw.githubusercontent.com/Nat-Lab/telegram-html-bot/doc/img/htmlbot.png)
![A running html bot on small device](https://raw.githubusercontent.com/Nat-Lab/telegram-html-bot/doc/img/htmlbot-mobile.png)

:( Low CSS skill, low Javascript skill. 

### Acknowledgement

telegram-html-bot uses code from these open source projects:
- [marianoguerra/json.human.js](https://github.com/marianoguerra/json.human.js) to format the `JSON` display. (MIT license)
- [egoist/biu](https://github.com/egoist/biu) to send error notification. (MIT license)
- [codemirror/CodeMirror](https://github.com/codemirror/CodeMirror) for syntax highlighting. (MIT license)
