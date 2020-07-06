function adapt(designWidth, rem2px){
    var d = window.document.createElement('div');
    d.style.width = '1rem';
    d.style.display = "none";
    var head = window.document.getElementsByTagName('head')[0];
    head.appendChild(d);
    var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
    return defaultFontSize
};
!(function(doc, win, designWidth, rem2px) {
    var docEl = doc.documentElement,
        defaultFontSize = adapt(designWidth, rem2px),
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = win.innerWidth
                || doc.documentElement.clientWidth
                || doc.body.clientWidth;

            if (!clientWidth) return;
            if (clientWidth < 750) {
                docEl.style.fontSize = clientWidth / designWidth * rem2px / defaultFontSize * 100 + '%';

            } else {
                docEl.style.fontSize = '625%';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

})(document, window, 750, 100);