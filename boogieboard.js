(function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
})(function (e) {
  var t = 0,
    i = Array.prototype.slice;
  e.cleanData = function (t) {
    return function (i) {
      var s, n, a;
      for (a = 0; null != (n = i[a]); a++) try {
        s = e._data(n, "events"), s && s.remove && e(n).triggerHandler("remove")
      } catch (o) { }
      t(i)
    }
  }(e.cleanData), e.widget = function (t, i, s) {
    var n, a, o, r, h = {},
      l = t.split(".")[0];
    return t = t.split(".")[1], n = l + "-" + t, s || (s = i, i = e.Widget), e.expr[":"][n.toLowerCase()] = function (t) {
      return !!e.data(t, n)
    }, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function (e, t) {
      return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new o(e, t)
    }, e.extend(o, a, {
      version: s.version,
      _proto: e.extend({}, s),
      _childConstructors: []
    }), r = new i, r.options = e.widget.extend({}, r.options), e.each(s, function (t, s) {
      return e.isFunction(s) ? (h[t] = function () {
        var e = function () {
          return i.prototype[t].apply(this, arguments)
        },
          n = function (e) {
            return i.prototype[t].apply(this, e)
          };
        return function () {
          var t, i = this._super,
            a = this._superApply;
          return this._super = e, this._superApply = n, t = s.apply(this, arguments), this._super = i, this._superApply = a, t
        }
      }(), void 0) : (h[t] = s, void 0)
    }), o.prototype = e.widget.extend(r, {
      widgetEventPrefix: a ? r.widgetEventPrefix || t : t
    }, h, {
        constructor: o,
        namespace: l,
        widgetName: t,
        widgetFullName: n
      }), a ? (e.each(a._childConstructors, function (t, i) {
        var s = i.prototype;
        e.widget(s.namespace + "." + s.widgetName, o, i._proto)
      }), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o
  }, e.widget.extend = function (t) {
    for (var s, n, a = i.call(arguments, 1), o = 0, r = a.length; r > o; o++)
      for (s in a[o]) n = a[o][s], a[o].hasOwnProperty(s) && void 0 !== n && (t[s] = e.isPlainObject(n) ? e.isPlainObject(t[s]) ? e.widget.extend({}, t[s], n) : e.widget.extend({}, n) : n);
    return t
  }, e.widget.bridge = function (t, s) {
    var n = s.prototype.widgetFullName || t;
    e.fn[t] = function (a) {
      var o = "string" == typeof a,
        r = i.call(arguments, 1),
        h = this;
      return a = !o && r.length ? e.widget.extend.apply(null, [a].concat(r)) : a, o ? this.each(function () {
        var i, s = e.data(this, n);
        return "instance" === a ? (h = s, !1) : s ? e.isFunction(s[a]) && "_" !== a.charAt(0) ? (i = s[a].apply(s, r), i !== s && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; " + "attempted to call method '" + a + "'")
      }) : this.each(function () {
        var t = e.data(this, n);
        t ? (t.option(a || {}), t._init && t._init()) : e.data(this, n, new s(a, this))
      }), h
    }
  }, e.Widget = function () { }, e.Widget._childConstructors = [], e.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: {
      disabled: !1,
      create: null
    },
    _createWidget: function (i, s) {
      s = e(s || this.defaultElement || this)[0], this.element = e(s), this.uuid = t++ , this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), s !== this && (e.data(s, this.widgetFullName, this), this._on(!0, this.element, {
        remove: function (e) {
          e.target === s && this.destroy()
        }
      }), this.document = e(s.style ? s.ownerDocument : s.document || s), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), i), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
    },
    _getCreateOptions: e.noop,
    _getCreateEventData: e.noop,
    _create: e.noop,
    _init: e.noop,
    destroy: function () {
      this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
    },
    _destroy: e.noop,
    widget: function () {
      return this.element
    },
    option: function (t, i) {
      var s, n, a, o = t;
      if (0 === arguments.length) return e.widget.extend({}, this.options);
      if ("string" == typeof t)
        if (o = {}, s = t.split("."), t = s.shift(), s.length) {
          for (n = o[t] = e.widget.extend({}, this.options[t]), a = 0; s.length - 1 > a; a++) n[s[a]] = n[s[a]] || {}, n = n[s[a]];
          if (t = s.pop(), 1 === arguments.length) return void 0 === n[t] ? null : n[t];
          n[t] = i
        } else {
          if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
          o[t] = i
        }
      return this._setOptions(o), this
    },
    _setOptions: function (e) {
      var t;
      for (t in e) this._setOption(t, e[t]);
      return this
    },
    _setOption: function (e, t) {
      return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
    },
    enable: function () {
      return this._setOptions({
        disabled: !1
      })
    },
    disable: function () {
      return this._setOptions({
        disabled: !0
      })
    },
    _on: function (t, i, s) {
      var n, a = this;
      "boolean" != typeof t && (s = i, i = t, t = !1), s ? (i = n = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), e.each(s, function (s, o) {
        function r() {
          return t || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0
        }
        "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
        var h = s.match(/^([\w:-]*)\s*(.*)$/),
          l = h[1] + a.eventNamespace,
          u = h[2];
        u ? n.delegate(u, l, r) : i.bind(l, r)
      })
    },
    _off: function (t, i) {
      i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
    },
    _delay: function (e, t) {
      function i() {
        return ("string" == typeof e ? s[e] : e).apply(s, arguments)
      }
      var s = this;
      return setTimeout(i, t || 0)
    },
    _hoverable: function (t) {
      this.hoverable = this.hoverable.add(t), this._on(t, {
        mouseenter: function (t) {
          e(t.currentTarget).addClass("ui-state-hover")
        },
        mouseleave: function (t) {
          e(t.currentTarget).removeClass("ui-state-hover")
        }
      })
    },
    _focusable: function (t) {
      this.focusable = this.focusable.add(t), this._on(t, {
        focusin: function (t) {
          e(t.currentTarget).addClass("ui-state-focus")
        },
        focusout: function (t) {
          e(t.currentTarget).removeClass("ui-state-focus")
        }
      })
    },
    _trigger: function (t, i, s) {
      var n, a, o = this.options[t];
      if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent)
        for (n in a) n in i || (i[n] = a[n]);
      return this.element.trigger(i, s), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
    }
  }, e.each({
    show: "fadeIn",
    hide: "fadeOut"
  }, function (t, i) {
    e.Widget.prototype["_" + t] = function (s, n, a) {
      "string" == typeof n && (n = {
        effect: n
      });
      var o, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
      n = n || {}, "number" == typeof n && (n = {
        duration: n
      }), o = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && e.effects && e.effects.effect[r] ? s[t](n) : r !== t && s[r] ? s[r](n.duration, n.easing, a) : s.queue(function (i) {
        e(this)[t](), a && a.call(s[0]), i()
      })
    }
  }), e.widget
});
((function ($) {
  "use strict";
  $.widget('aerolab.energy', {
    options: {
      headerClass: 'kaseiiki',
      innerClass: 'energyInner',
      defaultClass: 'default',
      classPrefix: ''
    },
    _headers: {},
    _headerInfo: {
      top: 0,
      height: 0
    },
    _$sections: [],
    _sections: [],
    _scrollTop: 0,
    _documentHeight: 0,
    _transformMode: false,
    refresh: function () {
      this._headerInfo = {
        top: 0,
        height: this.element.outerHeight()
      };
      this._$sections = $('[data-energy]:not(:hidden)');
      this._sections = [];
      this._setupHeaders();
      this.recalculate();
    },
    _create: function () {
      var context = this;
      this._scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      this._documentHeight = $(document).height();
      this._headers = {};
      this._transformMode = this._getSupportedTransform();
      this.refresh();
      setInterval(function () {
        context._recalculateSections();
      }, 1000);
      context.recalculate();
      $(window).resize(function () {
        context.recalculate();
      });
      this._updateHeadersLoop();
    },
    recalculate: function () {
      this._recalculateSections();
      this._updateHeaderHeight();
      this._recalculateHeaders();
      this._updateHeaders();
    },
    _getSupportedTransform: function () {
      var prefixes = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
      for (var ix = 0; ix < prefixes.length; ix++) {
        if (document.createElement('div').style[prefixes[ix]] !== undefined) {
          return prefixes[ix];
        }
      }
      return false;
    },
    _getContainerHeight: function () {
      var $customHeaders = this.element.find('> .' + this.options['headerClass']);
      var maxHeight = 0;
      var height = 0;
      var context = this;
      if ($customHeaders.length) {
        $customHeaders.each(function () {
          var $header = $(this);
          var $inner = $header.find('> .' + context.options['innerClass']);
          if ($inner.length) {
            $inner.css('bottom', 'auto').css('overflow', 'auto');
            height = $inner.outerHeight();
            $inner.css('bottom', '0');
          } else {
            $header.css('bottom', 'auto');
            height = $header.outerHeight();
            $header.css('bottom', '0');
          }
          maxHeight = (height > maxHeight) ? height : maxHeight;
        });
      } else {
        maxHeight = height = this.element.outerHeight();
      }
      return maxHeight;
    },
    _setupHeaders: function () {
      var context = this;
      this._headers[this.options['defaultClass']] = {};
      this._$sections.each(function () {
        var $section = $(this);
        var headerClass = $section.data('energy');
        if (typeof headerClass !== 'string') {
          return;
        }
        headerClass = headerClass.trim();
        if (headerClass === '') {
          return;
        }
        context._headers[headerClass] = {};
      });
      var defaultPaddings = {
        top: this.element.css("padding-top"),
        right: this.element.css("padding-right"),
        bottom: this.element.css("padding-bottom"),
        left: this.element.css("padding-left")
      };
      this.element.css({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden'
      });
      this._updateHeaderHeight();
      var $customHeaders = this.element.find('> .' + this.options['headerClass']);
      if ($customHeaders.length) {
        if (!$customHeaders.filter('.' + this.options['defaultClass']).length) {
          $customHeaders.filter('.' + this.options['headerClass'] + ':first').clone(true, true).attr('class', this.options['headerClass'] + ' ' + this.options['defaultClass']);
        }
      } else {
        this.element.wrapInner('<div class="' + this.options['headerClass'] + ' ' + this.options['defaultClass'] + '"></div>');
      }
      var $customHeaders = this.element.find('> .' + this.options['headerClass']);
      var $defaultHeader = $customHeaders.filter('.' + this.options['defaultClass']).clone(true, true);
      for (var headerClass in this._headers) {
        if (!this._headers.hasOwnProperty(headerClass)) {
          continue;
        }
        if (typeof this._headers[headerClass].element === 'undefined') {
          var $existingHeader = $customHeaders.filter('.' + headerClass);
          if ($existingHeader.length) {
            this._headers[headerClass].element = $existingHeader;
          } else {
            this._headers[headerClass].element = $defaultHeader.clone(true, true).removeClass(this.options['defaultClass']).addClass(headerClass).appendTo(this.element);
          }
          var resetStyles = {
            position: 'absolute',
            overflow: 'hidden',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          };
          this._headers[headerClass].element.css(resetStyles);
          if (this._transformMode !== false) {
            this._headers[headerClass].element.css(this._transformMode, 'translateZ(0)');
          }
          if (!this._headers[headerClass].element.find('> .' + this.options['innerClass']).length) {
            this._headers[headerClass].element.wrapInner('<div class="' + this.options['innerClass'] + '"></div>');
          }
          this._headers[headerClass].inner = this._headers[headerClass].element.find('> .' + this.options['innerClass'])
          this._headers[headerClass].inner.css(resetStyles);
          if (this._transformMode !== false) {
            this._headers[headerClass].inner.css(this._transformMode, 'translateZ(0)');
          }
          this._headers[headerClass].from = '';
          this._headers[headerClass].progress = 0.0;
        }
      }
      $customHeaders.each(function () {
        var $header = $(this);
        var hasAnyClass = false;
        for (var headerClass in context._headers) {
          if (!context._headers.hasOwnProperty(headerClass)) {
            continue;
          }
          if ($header.hasClass(headerClass)) {
            hasAnyClass = true;
          }
        }
        if (!$header.find('> .' + context.options['innerClass']).length) {
          $header.wrapInner('<div class="' + context.options['innerClass'] + '"></div>');
        }
        if (hasAnyClass) {
          $header.show();
        } else {
          $header.hide();
        }
      });
    },
    _recalculateHeaders: function () {
      this._scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
      this._scrollTop = Math.max(this._scrollTop, 0);
      this._scrollTop = Math.min(this._scrollTop, this._documentHeight);
      var headerHeight = this._headerInfo.height;
      var headerStart = this._scrollTop + this._headerInfo.top;
      var headerEnd = headerStart + headerHeight;
      if (typeof window.getComputedStyle === 'function') {
        var style = window.getComputedStyle(this.element[0], null);
        var top = 0.0;
        var transformY = 0.0;
        if (this._transformMode !== false && typeof style.transform === 'string') {
          var transformArray = (style.transform).match(/(-?[0-9\.]+)/g);
          if (transformArray !== null && transformArray.length >= 6 && !isNaN(parseFloat(transformArray[5]))) {
            transformY = parseFloat(transformArray[5]);
          }
        }
        if ((style.top).indexOf('px') >= 0 && !isNaN(parseFloat(style.top))) {
          top = parseFloat(style.top);
        }
        headerStart += top + transformY;
        headerEnd += top + transformY;
      }
      for (var headerClass in this._headers) {
        if (!this._headers.hasOwnProperty(headerClass)) {
          continue;
        }
        this._headers[headerClass].from = '';
        this._headers[headerClass].progress = 0.0;
      }
      for (var ix = 0; ix < this._sections.length; ix++) {
        if (headerEnd >= this._sections[ix].start && headerStart <= this._sections[ix].end) {
          this._headers[this._sections[ix].className].visible = true;
          if (headerStart >= this._sections[ix].start && headerEnd <= this._sections[ix].end) {
            this._headers[this._sections[ix].className].from = 'top';
            this._headers[this._sections[ix].className].progress += 1.0;
          } else if (headerEnd > this._sections[ix].end && headerStart < this._sections[ix].end) {
            this._headers[this._sections[ix].className].from = 'top';
            this._headers[this._sections[ix].className].progress = 1.0 - (headerEnd - this._sections[ix].end) / headerHeight;
          } else if (headerEnd > this._sections[ix].start && headerStart < this._sections[ix].start) {
            if (this._headers[this._sections[ix].className].from === 'top') {
              this._headers[this._sections[ix].className].progress += (headerEnd - this._sections[ix].start) / headerHeight;
            } else {
              this._headers[this._sections[ix].className].from = 'bottom';
              this._headers[this._sections[ix].className].progress = (headerEnd - this._sections[ix].start) / headerHeight;
            }
          }
        }
      }
    },
    _updateHeaders: function () {
      if (typeof this._headers[this.options['defaultClass']] === 'undefined') {
        return;
      }
      var totalProgress = 0.0;
      var lastActiveClass = '';
      for (var headerClass in this._headers) {
        if (!this._headers.hasOwnProperty(headerClass)) {
          continue;
        }
        if (!this._headers[headerClass].from === '') {
          continue;
        }
        totalProgress += this._headers[headerClass].progress;
        lastActiveClass = headerClass;
      }
      if (totalProgress < 1.0) {
        if (this._headers[this.options['defaultClass']].from === '') {
          this._headers[this.options['defaultClass']].from = (this._headers[lastActiveClass].from === 'top') ? 'bottom' : 'top';
          this._headers[this.options['defaultClass']].progress = 1.0 - totalProgress;
        } else {
          this._headers[this.options['defaultClass']].progress += 1.0 - totalProgress;
        }
      }
      for (var ix in this._headers) {
        if (!this._headers.hasOwnProperty(ix)) {
          continue;
        }
        if (!this._headers[ix].from === '') {
          continue;
        }
        var offset = (1.0 - this._headers[ix].progress) * 100.0;
        if (offset >= 100.0) {
          offset = 110.0;
        }
        if (offset <= -100.0) {
          offset = -110.0;
        }
        if (this._headers[ix].from === 'top') {
          if (this._transformMode !== false) {
            this._headers[ix].element[0].style[this._transformMode] = 'translateY(-' + offset + '%) translateZ(0)';
            this._headers[ix].inner[0].style[this._transformMode] = 'translateY(+' + offset + '%) translateZ(0)';
          } else {
            this._headers[ix].element[0].style['top'] = '-' + offset + '%';
            this._headers[ix].inner[0].style['top'] = '+' + offset + '%';
          }
        } else {
          if (this._transformMode !== false) {
            this._headers[ix].element[0].style[this._transformMode] = 'translateY(+' + offset + '%) translateZ(0)';
            this._headers[ix].inner[0].style[this._transformMode] = 'translateY(-' + offset + '%) translateZ(0)';
          } else {
            this._headers[ix].element[0].style['top'] = '+' + offset + '%';
            this._headers[ix].inner[0].style['top'] = '-' + offset + '%';
          }
        }
      }
    },
    _recalculateSections: function () {
      this._documentHeight = $(document).height();
      for (var ix = 0; ix < this._$sections.length; ix++) {
        var $section = $(this._$sections[ix]);
        this._sections.push({
          element: $section,
          className: $section.data('energy'),
          start: $section.offset().top,
          end: $section.offset().top + $section.outerHeight()
        });
      }
    },
    _updateHeaderHeight: function () {
      this._headerInfo.height = this._getContainerHeight();
      this.element.css('height', this._headerInfo.height + 'px');
    },
    _updateHeadersLoop: function () {
      var context = this;
      this._requestAnimationFrame(function () {
        context._updateHeadersLoop();
      });
      this._recalculateHeaders();
      this._updateHeaders();
    },
    _requestAnimationFrame: function (callback) {
      var requestAnimationFrame = (requestAnimationFrame || (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })());
      requestAnimationFrame(callback);
    }
  });
})(jQuery));