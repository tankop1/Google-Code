function setupEditor() {
    window.editor = ace.edit("code-input");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/html");
    //editor.setValue(``);
    //editor.getSession().on('change', function () {
    //    update();
    //});
    editor.focus();
    editor.setShowPrintMargin(false);
    editor.setBehavioursEnabled(false);
}