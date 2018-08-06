function lazyloadX(options) {
    var settings = {
        selector: 'img.lazy',
        container: window,
        threshold: 0,
        failurelimit: 0,
        dataAttribute: "data-original",
        load: null
    };
    if (typeof options == 'object') {
        for (var key in options) {
            settings[key] = options[key] || settings[key];
        }
    }
    var tId = null;
    var imgsArr = Array.prototype.slice.call(document.querySelectorAll(settings.selector));
    function inViewport(elem, threshold) {
        var o = elem.getBoundingClientRect();
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        threshold = threshold || pageHeight / 5;
        return o.left < pageWidth + threshold && o.top < pageHeight + threshold
    }
    function loadImg() {
        clearTimeout(tId);
        tId = setTimeout(function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var src = '';
            var item = null;
            var counter = 0;
            if (imgsArr.length > 0) {
                for (var i = 0; i < imgsArr.length; i++) {
                    item = imgsArr[i];
                    if (inViewport(item)) {
                        src = item.getAttribute(settings.dataAttribute);
                        item.setAttribute('src', src);

                        (function(item){
                            item.addEventListener('load', function () {
                                if (settings.load) {
                                    settings.load(item);
                                }
                            })
                        })(item);
                        
                        imgsArr.splice(i, 1);
                        i--;
                        counter = 0;
                    } else if (++counter > settings.failurelimit) {
                        break;
                    }
                };
            } else {
                settings.container.removeEventListener('scroll', loadImg);
            }
        }, 100);
    }
    loadImg();
    settings.container.addEventListener('scroll', loadImg);
}