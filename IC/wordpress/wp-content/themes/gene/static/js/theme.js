/*! YOOtheme Pro v1.18.7 | https://yootheme.com */
!function(n,s){"use strict";n=n&&n.hasOwnProperty("default")?n.default:n;var o='.tm-header ~ [class*="uk-section"], .tm-header ~ * > [class*="uk-section"]',t={update:[{read:function(t){var e=s.$(o),a=s.attr(e,"tm-header-transparent");if(!a||!e)return!1;t.prevHeight=this.height,t.height=this.$el.offsetHeight;var i=n.getComponent(s.$("[uk-sticky]",this.$el),"sticky");if(i){var r=i.$options.data;"uk-animation-slide-top"!==r.animation&&s.each({top:o,animation:"uk-animation-slide-top",clsInactive:"uk-navbar-transparent uk-"+a},function(t,e){return r[e]=i[e]=i.$props[e]=t}),i.$props.top=e.offsetHeight<=window.innerHeight?o:s.offset(e).top+300}},write:function(t){if(!this.placeholder){var e=s.$(o),a=s.attr(e,"tm-header-transparent");s.addClass(this.$el,"tm-header-transparent"),s.addClass(s.$(".tm-headerbar-top, .tm-headerbar-bottom"),"uk-"+a),this.placeholder=s.hasAttr(e,"tm-header-transparent-placeholder")&&s.before(s.$("[uk-grid]",e),'<div class="tm-header-placeholder uk-margin-remove-adjacent"></div>');var i=s.$("[uk-navbar]",this.$el);"push"===s.attr(i,"dropbar-mode")&&s.attr(i,"dropbar-mode","slide"),s.$("[uk-sticky]",this.$el)||s.addClass(s.$(".uk-navbar-container",this.$el),"uk-navbar-transparent uk-"+a)}this.placeholder&&t.prevHeight!==t.height&&s.css(this.placeholder,{height:t.height})},events:["load","resize"]}]};if(n.component("header",t),s.isRtl){var e={init:function(){this.$props.pos=s.swap(this.$props.pos,"left","right")}};n.mixin(e,"drop"),n.mixin(e,"tooltip")}s.ready(function(){var t=window,e=t.$load,a=void 0===e?[]:e,i=t.$theme;!function t(e,a){e.length&&e.shift()(a,function(){return t(e,a)})}(a,void 0===i?{}:i)})}(UIkit,UIkit.util);
// Demo JavaScript
(function() {

    var util = UIkit.util,
        $ = util.$,
        $$ = util.$$,
        ajax = util.ajax,
        css = util.css,
        attr = util.attr,
        ready = util.ready,
        closest = util.closest,
        matches = util.matches,
        Promise = util.Promise,
        includes = util.includes,
        getImage = util.getImage,
        toggleClass = util.toggleClass;

    var style = getParam('style', window.location.href) || 'default';

    var colorThief = null;

    var ColorUtil = {

        lightOrDarkImage: function (url) {

            if (!colorThief) {
                colorThief = ajax('https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.0.1/color-thief.min.js').then(function (xhr) {
                    document.body.appendChild(document.createRange().createContextualFragment('<script>' + xhr.response + '</script>'));
                });
            }

            return colorThief.then(function () {
                return getImage(url).then(function (img) {
                    return ColorUtil.lightOrDark('rgb(' + (new ColorThief()).getColor(img).join(',') + ')');
                });
            });

        },

        lightOrDark: function (hexcolor) {
            return Promise.resolve(ColorUtil._rgbToHsl.apply(this, ColorUtil._parseColor(hexcolor).slice(0, 3))[2] < 0.5 ? 'dark' : 'light');
        },

        _rgbToHsl: function (r, g, b) {

            r /= 255;
            g /= 255;
            b /= 255;

            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }

            return [h, s, l];
        },

        _parseColor: function (color) {

            var match, quadruplet;

            // match #aabbcc
            if (match = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(color)) {
                quadruplet = [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16), 1];

                // match #abc
            } else if (match = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(color)) {
                quadruplet = [parseInt(match[1], 16) * 17, parseInt(match[2], 16) * 17, parseInt(match[3], 16) * 17, 1];

                // match rgb(n, n, n)
            } else if (match = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) {
                quadruplet = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), 1];

                // match rgba(n,n,n,o)
            } else if (match = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9.]*)\s*\)/.exec(color)) {
                quadruplet = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10), parseFloat(match[4])];

                // No browser returns rgb(n%, n%, n%), so little reason to support this format.
            } else {
                quadruplet = [255, 255, 255, 0];
            }

            return quadruplet;
        }

    };

    ready(function () {

        // Hide ZOO and Shop submenu on modal main menu
        $$('.uk-modal-full .uk-nav.uk-nav-primary li, .uk-offcanvas-bar .uk-nav.uk-nav-primary li').forEach(function (li) {
            if ($('a', li).innerHTML.match(/ZOO|Shop/)) {
                css($$('.uk-nav-sub', li), 'display', 'none');
            }
        });

        if (style !== 'default') {

            setTimeout(function () {

                $$('.uk-navbar-transparent.uk-dark, .uk-navbar-transparent.uk-light').forEach(function (navbar) {

                    var section = $('.tm-header ~ [class*="uk-section"], .tm-header ~ * > [class*="uk-section"]'),
                        bgImage = $('> [style*="background-image"]', section),
                        color;

                    if (!bgImage || css(bgImage, 'background-image').match(/\.jpe?g$|\.webp$/)) {
                        color = ColorUtil.lightOrDark(css(section, 'background-color'));
                    } else if (!includes(['rgba(0, 0, 0, 0)', 'transparent', ''], css(bgImage, 'background-color'))) {
                        color = ColorUtil.lightOrDark(css(bgImage, 'background-color'));
                    } else {
                        color = ColorUtil.lightOrDarkImage(css(bgImage, 'background-image').replace(/(url\(|"|'|\))/g, ''));
                    }

                    color.then(function (color) {

                        if (color === 'dark' && matches(navbar, '.uk-dark') || color === 'light' && matches(navbar, '.uk-light')) {

                            toggleClass(navbar, 'uk-dark uk-light');
                            var sticky = closest(navbar, '.uk-sticky');

                            if (sticky) {
                                var comp = UIkit.getComponent(sticky, 'sticky');
                                comp.clsInactive = comp.$props.clsInactive = comp.clsInactive.replace(/dark|light/, color === 'dark' ? 'light' : 'dark');
                                UIkit.update(sticky);
                            }
                        }
                    });

                });

            }, 0);

            $$('a[href]:not([href*="style="]):not(.uk-navbar-toggle)').forEach(function (a) {
                if (a.hostname === location.hostname || !attr(a, 'href').match(/^#\w/)) {
                    a.search += '&style=' + style;
                }
            });

        }

    });

    function getParam(key, uri) {
        var value = (new RegExp('[?&]'+key+'=([^&#]*)', 'i').exec(uri) || [])[1];
        return value ? decodeURIComponent(value) : value;
    }

})();
