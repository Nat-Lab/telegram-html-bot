### telegram-html-bot

telegram-html-bot is a [Telegram bot](https://core.telegram.org/bots/) that runs in web browsers. Simply apply a bot TOKEN from [@botfather](https://telegram.me/botfather), fill it in the `TOKEN` box, and click on "Start Polling", then you are all set! Try sending something to bot. 

When a message is received, the `JSON` structure of message will be show on the box above. You can play it with your own code. To do this, write your code in the "Write you own code" block, the code should be written in Javascript. After you finish writing your code, click on "Update Code" to make it active.

A session can be save by clicking "Save Session" button, by clicking it, your code, `token`, `chat_id`, and other options will be save. You can load the session later by clicking "Load Session" button. Remember to click on "Update Code" after you load your session. They won't be load atomically.

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

Here's an example:

    send = true;
    switch(message["text"]) {
	    case "hi": setContent("Hi!"); break;
	    case "/whoami": setContent("You are " + message["chat"]["first_name"]); break;
	    case "fuck": 
	        if(message["chat"]["type"] == "group") {
	            setApi("leaveChat");
	            setPayload("chat_id="+message["chat"]["id"]);
	            sendCustomApi();
	        }
	        break;
	    default: send = false;
    }
    if (send) {
	    setTarget(message["chat"]["id"]);
	    sendMessage();
    }
    
If this bot receive a 'hi', then it will reply 'Hi!'. If a '/whoami' is received, then reply user's first name. If a F word is received from a group, quit it.

telegram-html-bot uses code from these open source projects:
- [marianoguerra/json.human.js](https://github.com/marianoguerra/json.human.js) to format the `JSON` display. (MIT license)
- [egoist/biu](https://github.com/egoist/biu) to send error notification. (MIT license)
- [codemirror/CodeMirror](https://github.com/codemirror/CodeMirror) for syntax highlighting. (MIT license)
