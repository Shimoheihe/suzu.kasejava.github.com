window.document.onkeydown = function (evt) {
    if ((evt.which == 71 && evt.ctrlKey == true)
        || (evt.which == 70 && evt.ctrlKey == true)
        || (evt.which == 114)
        || (evt.which == 115)
        || (evt.which == 73 && evt.ctrlKey == true && evt.shiftKey == true)
        || (evt.which == 123)
        || (evt.which == 121 && evt.shiftKey == true)
        || (evt.which == 13)
    ) {
        evt.which = null;
        return false;
    }
    document.oncontextmenu = function () { return false; }
}