var userCodeMirror = CodeMirror.fromTextArea(document.getElementById("code"), {
	mode: "javascript",
	viewportMargin: Infinity,
	lineNumbers: true,
	extraKeys: {
		"Cmd-S": function () { updateUserCode(); },
		"Ctrl-S": function () { updateUserCode(); }
	}
});
var evalCode = CodeMirror.fromTextArea(document.getElementById("evalCode"), {
	mode: "javascript",
	viewportMargin: Infinity,
	lineNumbers: true,
	extraKeys: {
		"Cmd-Enter": function(me) { eval(me.getValue()); },
		"Ctrl-Enter": function(me) { eval(me.getValue()); }
	}
});
var respondJsonCodeMirror = CodeMirror.fromTextArea(document.getElementById("lastjson"), {
	mode: "javascript",
	json: true,
	viewportMargin: Infinity,
	lineWrapping: true
});

updateUserCode();