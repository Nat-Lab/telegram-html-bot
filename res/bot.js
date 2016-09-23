var botPoll = new XMLHttpRequest();
var offset = 0;
var chatList = [];

function getVar () {
	token = document.getElementById("token").value;
	cid   = document.getElementById("cid").value;
	prase = document.getElementById("prase").value;
	nopv  = document.getElementById("nopreview").value;
	nopu  = document.getElementById("nopush").value;
	body  = document.getElementById("text").value;
}

function addChatList (chat) {
	switch(chat["type"]) {
		case "private":
			name = chat["first_name"] + " " + chat["last_name"];
			break;
		case "group":
		case "supergroup":
		case "channel":
			name = chat["title"];
	}
	chatList.pushArrayIfNotExist([name, chat["id"]]);
	updateChatList(chatList);
}

function sendMessage() {
	getVar();
	url = "https://api.telegram.org/bot" + token + "/sendMessage";

	var botReq = new XMLHttpRequest();
	botReq.open("POST", url, true);
	botReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	if(prase == "none") prase = "";
	para = "chat_id=" + cid + "&text=" + body + 
               "&parse_mode=" + prase + "&disable_web_page_preview=" +
               nopv + "&disable_notification=" + nopu;
	botReq.send(para);

	botReq.onreadystatechange = function() {
		if(botReq.readyState == 4 && botReq.status == 200) {
        		res = JSON.parse(botReq.responseText);
			if(res["ok"]) {
				appendLog(res["result"]);
				addChatList(res["result"]["chat"]);
			}
		}
	}

}

function startPolling () {
	document.getElementById("startPollingButton").disabled = true;
	window.setInterval(polling, 1000);
}

function polling() {
	getVar();
	pollUrl = "https://api.telegram.org/bot" + token + "/getUpdates";
	botPoll.open("POST", pollUrl, true);
	botPoll.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	pollPara = "offset=" + offset + "&limit=1";
	botPoll.send(pollPara);
	botPoll.onreadystatechange = function() {
		if(botPoll.readyState == 4 && botPoll.status == 200) {
			pRes = JSON.parse(botPoll.responseText);
			if(pRes["ok"]) {
				pRes["result"].forEach(function(result) {
					appendLog(result["message"])
					offset = result["update_id"];
					addChatList(result["message"]["chat"]);
					try {
						userCode(result["message"]);
					} catch (error) {
						console.error(error);
					}
				});
				offset++;
			}
		}
	}

}
