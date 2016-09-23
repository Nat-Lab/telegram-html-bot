window.options = {
    showArrayIndex: false,
    hyperlinks : {
        enable : true,
        keys: [],
        target : '_blank'
    },

    bool : {
        showText : true,
        text : {
            true : "true",
            false : "false"
        },
        showImage : false
    }
};

function appendLog (json) {
	display = document.getElementById("bot-display");
	content = JsonHuman.format(json, window.options);
	display.appendChild(content);
	display.scrollTop = display.scrollHeight;
}

function clearLog() {
	display = document.getElementById("bot-display");
	display.innerHtml="";
}

//var userCodeMirror = CodeMirror.fromTextArea(document.getElementById("code"), { mode:  "javascript" });
