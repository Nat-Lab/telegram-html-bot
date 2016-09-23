var httpSender = new XMLHttpRequest();
var httpReceiver = new XMLHttpRequest();
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

function botApi (http, action, param, callback) {
	url = "https://api.telegram.org/bot" + token + "/" + action;
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send(param);
	http.onreadystatechange = callback;
}

function sendFdToApi (http, action, fd, callback) {
	para_name = action.substring(4).toLowerCase();
	url = "https://api.telegram.org/bot" + token + "/" + action;
	http.open("POST", url, true);
	http.send(fd);
	http.onreadystatechange = callback;
}

function downloadFile() {
	getVar();
	fileid = document.getElementById("fileid").value;
	botApi(httpSender, "getFile", "file_id=" + fileid, function () {
		if(httpSender.readyState == 4 && httpSender.status == 200) {
			res = JSON.parse(httpSender.responseText);
			if(res["ok"]) {
				appendLog(res["result"]);
				filepath = res["result"]["file_path"];
				var urldisp = document.getElementById("linkdisp");
				urldisp.href = "https://api.telegram.org/file/bot" + token + "/" + filepath;
				urldisp.innerHTML = filepath;
			}
		}
	});
}

function sendFile () {
	getVar();
	sendtype = document.getElementById("sendtype").value;
	action = sendtype.substring(4).toLowerCase();
	var fd = new FormData();
	fd.append(action, document.getElementById("tosend").files[0]);
	fd.append("chat_id", document.getElementById("fileto").value);
	sendFdToApi(httpSender, sendtype, fd, function() {
		if(httpSender.readyState == 4 && httpSender.status == 200) {
			res = JSON.parse(httpSender.responseText);
			if(res["ok"]) {
				appendLog(res["result"]);
				addChatList(res["result"]["chat"]);
			}
		}
	});
}

function sendCustomApi () {
	getVar();
	payload   = document.getElementById("payload").value;
	apimethod = document.getElementById("apimethod").value;
	botApi (httpSender, apimethod, payload, function() {
		if(httpSender.readyState == 4 && httpSender.status == 200) {
			appendLog(JSON.parse(httpSender.responseText));
		}
	});
}

function sendMessage() {
	getVar();
	if(prase == "none") prase = "";
	para = "chat_id=" + cid + "&text=" + body + 
               "&parse_mode=" + prase + "&disable_web_page_preview=" +
               nopv + "&disable_notification=" + nopu;
	botApi(httpSender, "sendMessage", para, function() {
		if(httpSender.readyState == 4 && httpSender.status == 200) {
        		res = JSON.parse(httpSender.responseText);
			if(res["ok"]) {
				appendLog(res["result"]);
				addChatList(res["result"]["chat"]);
			}
		}
	});

}

function startPolling () {
	document.getElementById("startPollingButton").disabled = true;
	window.setInterval(polling, 1000);
}

function polling() {
	getVar();
	pollPara = "offset=" + offset;
	botApi(httpReceiver, "getUpdates", pollPara, function() {
		if(httpReceiver.readyState == 4 && httpReceiver.status == 200) {
			pRes = JSON.parse(httpReceiver.responseText);
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
	});

}
