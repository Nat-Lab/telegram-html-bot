function saveSession () {
	session_name = document.getElementById("sessionname").value;
	localStorage["htmlBotStorage"+session_name] = getSaveData();
	biu('Session saved.', {type: 'success'})
}

function loadSession () {
	session_name = document.getElementById("sessionname").value;
	loadSaveData(localStorage["htmlBotStorage"+session_name]);
	biu('Session loaded.', {type: 'success'})
}

function getSaveData () {
	getVar();
	saveData = {};
	saveData["token"] = token;
	saveData["cid"] = cid;
	saveData["prase"] = prase;
	saveData["nopv"] = nopv;
	saveData["nopu"] = nopu;
	saveData["body"] = body;
	saveData["chatList"] = chatList;
	saveData["usercode"] = userCodeMirror.getValue();
	saveData["logdisplay"] = document.getElementById("bot-display").innerHTML;
	return JSON.stringify(saveData);
}

function loadSaveData (saveData) {
	saveData = JSON.parse(saveData);
	document.getElementById("token").value = saveData["token"];
	document.getElementById("cid").value = saveData["cid"];
	document.getElementById("prase").value = saveData["prase"];
	document.getElementById("nopreview").value = saveData["nopv"];
	document.getElementById("nopush").value = saveData["nopu"];
	document.getElementById("text").value = saveData["body"];
	userCodeMirror.setValue(saveData["usercode"]);
	chatList = saveData["chatList"];
	display = document.getElementById("bot-display");
	display.innerHTML = saveData["logdisplay"];
	display.scrollTop = display.scrollHeight;
	updateChatList(chatList);
}

function exportSession () {
	sessionUri = "data:application/octet-stream," + encodeURIComponent(getSaveData());
	window.location.href = sessionUri;
}

function importSession () {
	var reader = new FileReader();
	reader.onload = function(fileData) {
		loadSaveData(fileData.target.result);
	}
	reader.readAsText(document.getElementById("sessionfile").files[0]);
}

function exportSessionPlain() {
	document.getElementById("plainei").value = getSaveData();
}

function loadSessionPlain() {
	loadSaveData(document.getElementById("plainei").value);
}

// Start userCode methods

function setTarget (target) {
	document.getElementById("cid").value = target;
}

function setContent (content) {
	document.getElementById("text").value = content;
}

function setParseMode (mode) {
	document.getElementById("prase").value = mode;
}

function setUrlPreview (pv) {
	document.getElementById("nopreview").value = pv;
}

function setNotification (notify) {
	document.getElementById("nopush").value = !notify;
}

function setApi (apiname) {
	document.getElementById("apimethod").value = apiname;
}

function setPayload (parm) {
	document.getElementById("payload").value = parm;
}

// End userCode methods

function openApiDoc () {
	section = document.getElementById("apimethod").value.toLowerCase();
	window.open("https://core.telegram.org/bots/api#" + section);
}

function fillChatID () {
	document.getElementById("cid").value = document.getElementById("chatlist").value;
}

function updateChatList (chatList) {
	var chatlist = document.getElementById("chatlist");
	Array.from(chatlist.options).forEach(chatlist.options.remove.bind(chatlist.options));
	chatList.map(([name, value]) => new Option (name + " (" + value + ")", value)).forEach(chatlist.add.bind(chatlist));
}

function updateUserCode () {
	userCode = new Function("message", userCodeMirror.getValue());
	biu('Code updated.', {type: 'success'})
}
