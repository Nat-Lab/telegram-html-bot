var userCodeMirror = CodeMirror.fromTextArea(document.getElementById("code"), { mode:  "javascript", viewportMargin: Infinity, lineNumbers: true });
var respondJsonCodeMirror = CodeMirror.fromTextArea(document.getElementById("lastjson"), { mode:  "javascript", json: true, viewportMargin: Infinity, lineWrapping: true });

updateUserCode();