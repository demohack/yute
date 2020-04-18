// Make the DIV element draggable:
function dragElement(el) {

    //
    // resizable referenced from:
    // http://jsfiddle.net/3jMQD/
    //

    el.addEventListener('click', function init() {
        el.removeEventListener('click', init, false);

        el.className = el.className + ' resizable';

        var resizer = document.createElement('div');
        resizer.className = 'resizer';
        el.appendChild(resizer);
        resizer.addEventListener('mousedown', initDrag, false);
    }, false);

    var startX = 0,
        startY = 0,
        startWidth = 0,
        startHeight = 0;

    function initDrag(e) {
        startX = e.clientX;
        startY = e.clientY;

        startWidth = parseInt(document.defaultView.getComputedStyle(el).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(el).height, 10);

        document.documentElement.addEventListener('mousemove', doDrag, false);
        document.documentElement.addEventListener('mouseup', stopDrag, false);
    }

    function doDrag(e) {
        el.style.width = (startWidth + e.clientX - startX) + 'px';
        el.style.height = (startHeight + e.clientY - startY) + 'px';
        el.style.fontSize = (startHeight + e.clientY - startY)-20 + 'px';   // addition
    }

    function stopDrag(e) {
        document.documentElement.removeEventListener('mousemove', doDrag, false);
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }

    //
    // draggable referenced from:
    // https://www.w3schools.com/howto/howto_js_draggable.asp
    //

    let d = document.querySelector(`#${el.id} ` + ".mydivheader");
    if (d) {
        // if present, the header is where you move the DIV from:
        d.onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        el.onmousedown = dragMouseDown;
    }

    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

dragElement(document.querySelector("#previewTXT1"));
dragElement(document.querySelector("#previewTXT2"));
//dragElement(document.getElementById("mydiv"));
