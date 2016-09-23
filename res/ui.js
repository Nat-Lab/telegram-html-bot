function saveSession () {
	getVar();
	localStorage["token"] = token;
	localStorage["cid"] = cid;
	localStorage["prase"] = prase;
	localStorage["nopv"] = nopv;
	localStorage["nopu"] = nopu;
	localStorage["body"] = body;
	localStorage["chatList"] = JSON.stringify(chatList);
	localStorage["usercode"] = document.getElementById("code").value;
}

function loadSession () {
	document.getElementById("token").value = localStorage["token"];
	document.getElementById("cid").value = localStorage["cid"];
	document.getElementById("prase").value = localStorage["prase"];
	document.getElementById("nopreview").value = localStorage["nopv"];
	document.getElementById("nopush").value = localStorage["nopu"];
	document.getElementById("text").value = localStorage["body"];
	document.getElementById("code").value = localStorage["usercode"];
	chatList = JSON.parse(localStorage["chatList"]);
	updateChatList(chatList);
}

function setTarget (target) {
	document.getElementById("cid").value = target;
}

function setContent (content) {
	document.getElementById("text").value = content;
}

function fillChatID () {
	document.getElementById("cid").value = document.getElementById("chatlist").value;
}

function removeOptions(selectbox){
	for(i = selectbox.options.length - 1 ; i >= 0 ; i--) {
        	selectbox.remove(i);
	}
}

function updateChatList (chatList) {
	var chatlist = document.getElementById("chatlist");
	Array.from(chatlist.options).forEach(chatlist.options.remove.bind(chatlist.options));
	chatList.map(([name, value]) => new Option (name + " (" + value + ")", value)).forEach(chatlist.add.bind(chatlist));
}

function updateUserCode () {
	userCode = new Function("message", document.getElementById("code").value);
}
