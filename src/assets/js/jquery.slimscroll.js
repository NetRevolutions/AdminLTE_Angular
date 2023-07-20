!(function (e) {
    e.fn.extend({
        slimScroll: function (i) {
            var o = {
                    width: 'auto',
                    height: '250px',
                    size: '7px',
                    color: '#000',
                    position: 'right',
                    distance: '1px',
                    start: 'top',
                    opacity: 0.4,
                    alwaysVisible: !1,
                    disableFadeOut: !1,
                    railVisible: !1,
                    railColor: '#333',
                    railOpacity: 0.2,
                    railDraggable: !0,
                    railClass: 'slimScrollRail',
                    barClass: 'slimScrollBar',
                    wrapperClass: 'slimScrollDiv',
                    allowPageScroll: !1,
                    wheelStep: 20,
                    touchScrollStep: 200,
                    borderRadius: '7px',
                    railBorderRadius: '7px'
                },
                s = e.extend(o, i);
            return (
                this.each(function () {
                    function o(t) {
                        if (h) {
                            var t = t || window.event,
                                i = 0;
                            t.wheelDelta && (i = -t.wheelDelta / 120),
                                t.detail && (i = t.detail / 3);
                            var o = t.target || t.srcTarget || t.srcElement;
                            e(o)
                                .closest('.' + s.wrapperClass)
                                .is(x.parent()) && r(i, !0),
                                t.preventDefault && !y && t.preventDefault(),
                                y || (t.returnValue = !1);
                        }
                    }
                    function r(e, t, i) {
                        y = !1;
                        var o = e,
                            r = x.outerHeight() - R.outerHeight();
                        if (
                            (t &&
                                ((o =
                                    parseInt(R.css('top')) +
                                    ((e * parseInt(s.wheelStep)) / 100) *
                                        R.outerHeight()),
                                (o = Math.min(Math.max(o, 0), r)),
                                (o = e > 0 ? Math.ceil(o) : Math.floor(o)),
                                R.css({top: o + 'px'})),
                            (v =
                                parseInt(R.css('top')) /
                                (x.outerHeight() - R.outerHeight())),
                            (o = v * (x[0].scrollHeight - x.outerHeight())),
                            i)
                        ) {
                            o = e;
                            var a = (o / x[0].scrollHeight) * x.outerHeight();
                            (a = Math.min(Math.max(a, 0), r)),
                                R.css({top: a + 'px'});
                        }
                        x.scrollTop(o),
                            x.trigger('slimscrolling', ~~o),
                            n(),
                            c();
                    }
                    function a(e) {
                        window.addEventListener
                            ? (e.addEventListener('DOMMouseScroll', o, !1),
                              e.addEventListener('mousewheel', o, !1))
                            : document.attachEvent('onmousewheel', o);
                    }
                    function l() {
                        (f = Math.max(
                            (x.outerHeight() / x[0].scrollHeight) *
                                x.outerHeight(),
                            m
                        )),
                            R.css({height: f + 'px'});
                        var e = f == x.outerHeight() ? 'none' : 'block';
                        R.css({display: e});
                    }
                    function n() {
                        if ((l(), clearTimeout(p), v == ~~v)) {
                            if (((y = s.allowPageScroll), b != v)) {
                                var e = 0 == ~~v ? 'top' : 'bottom';
                                x.trigger('slimscroll', e);
                            }
                        } else y = !1;
                        return (
                            (b = v),
                            f >= x.outerHeight()
                                ? void (y = !0)
                                : (R.stop(!0, !0).fadeIn('fast'),
                                  void (
                                      s.railVisible &&
                                      E.stop(!0, !0).fadeIn('fast')
                                  ))
                        );
                    }
                    function c() {
                        s.alwaysVisible ||
                            (p = setTimeout(function () {
                                (s.disableFadeOut && h) ||
                                    u ||
                                    d ||
                                    (R.fadeOut('slow'), E.fadeOut('slow'));
                            }, 1e3));
                    }
                    var h,
                        u,
                        d,
                        p,
                        g,
                        f,
                        v,
                        b,
                        w = '<div></div>',
                        m = 30,
                        y = !1,
                        x = e(this);
                    if (x.parent().hasClass(s.wrapperClass)) {
                        var C = x.scrollTop();
                        if (
                            ((R = x.closest('.' + s.barClass)),
                            (E = x.closest('.' + s.railClass)),
                            l(),
                            e.isPlainObject(i))
                        ) {
                            if ('height' in i && 'auto' == i.height) {
                                x.parent().css('height', 'auto'),
                                    x.css('height', 'auto');
                                var H = x.parent().parent().height();
                                x.parent().css('height', H), x.css('height', H);
                            }
                            if ('scrollTo' in i) C = parseInt(s.scrollTo);
                            else if ('scrollBy' in i) C += parseInt(s.scrollBy);
                            else if ('destroy' in i)
                                return R.remove(), E.remove(), void x.unwrap();
                            r(C, !1, !0);
                        }
                    } else if (!(e.isPlainObject(i) && 'destroy' in i)) {
                        s.height =
                            'auto' == s.height ? x.parent().height() : s.height;
                        var S = e(w).addClass(s.wrapperClass).css({
                            position: 'relative',
                            overflow: 'hidden',
                            width: s.width,
                            height: s.height
                        });
                        x.css({
                            overflow: 'hidden',
                            width: s.width,
                            height: s.height
                        });
                        var E = e(w)
                                .addClass(s.railClass)
                                .css({
                                    width: s.size,
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    display:
                                        s.alwaysVisible && s.railVisible
                                            ? 'block'
                                            : 'none',
                                    'border-radius': s.railBorderRadius,
                                    background: s.railColor,
                                    opacity: s.railOpacity,
                                    zIndex: 90
                                }),
                            R = e(w)
                                .addClass(s.barClass)
                                .css({
                                    background: s.color,
                                    width: s.size,
                                    position: 'absolute',
                                    top: 0,
                                    opacity: s.opacity,
                                    display: s.alwaysVisible ? 'block' : 'none',
                                    'border-radius': s.borderRadius,
                                    BorderRadius: s.borderRadius,
                                    MozBorderRadius: s.borderRadius,
                                    WebkitBorderRadius: s.borderRadius,
                                    zIndex: 99
                                }),
                            D =
                                'right' == s.position
                                    ? {right: s.distance}
                                    : {left: s.distance};
                        E.css(D),
                            R.css(D),
                            x.wrap(S),
                            x.parent().append(R),
                            x.parent().append(E),
                            s.railDraggable &&
                                R.bind('mousedown', function (i) {
                                    var o = e(document);
                                    return (
                                        (d = !0),
                                        (t = parseFloat(R.css('top'))),
                                        (pageY = i.pageY),
                                        o.bind(
                                            'mousemove.slimscroll',
                                            function (e) {
                                                (currTop = t + e.pageY - pageY),
                                                    R.css('top', currTop),
                                                    r(0, R.position().top, !1);
                                            }
                                        ),
                                        o.bind(
                                            'mouseup.slimscroll',
                                            function (e) {
                                                (d = !1),
                                                    c(),
                                                    o.unbind('.slimscroll');
                                            }
                                        ),
                                        !1
                                    );
                                }).bind('selectstart.slimscroll', function (e) {
                                    return (
                                        e.stopPropagation(),
                                        e.preventDefault(),
                                        !1
                                    );
                                }),
                            E.hover(
                                function () {
                                    n();
                                },
                                function () {
                                    c();
                                }
                            ),
                            R.hover(
                                function () {
                                    u = !0;
                                },
                                function () {
                                    u = !1;
                                }
                            ),
                            x.hover(
                                function () {
                                    (h = !0), n(), c();
                                },
                                function () {
                                    (h = !1), c();
                                }
                            ),
                            x.bind('touchstart', function (e, t) {
                                e.originalEvent.touches.length &&
                                    (g = e.originalEvent.touches[0].pageY);
                            }),
                            x.bind('touchmove', function (e) {
                                if (
                                    (y || e.originalEvent.preventDefault(),
                                    e.originalEvent.touches.length)
                                ) {
                                    var t =
                                        (g - e.originalEvent.touches[0].pageY) /
                                        s.touchScrollStep;
                                    r(t, !0),
                                        (g = e.originalEvent.touches[0].pageY);
                                }
                            }),
                            l(),
                            'bottom' === s.start
                                ? (R.css({
                                      top: x.outerHeight() - R.outerHeight()
                                  }),
                                  r(0, !0))
                                : 'top' !== s.start &&
                                  (r(e(s.start).position().top, null, !0),
                                  s.alwaysVisible || R.hide()),
                            a(this);
                    }
                }),
                this
            );
        }
    }),
        e.fn.extend({slimscroll: e.fn.slimScroll});
})(jQuery);
