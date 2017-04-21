self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
var Prism = function () {
    var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
        t = self.Prism = {
            util: {
                encode: function (e) {
                    return e instanceof n ? new n(e.type, t.util.encode(e.content), e.alias) : "Array" === t.util.type(e) ? e.map(t.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                },
                type: function (e) {
                    return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
                },
                clone: function (e) {
                    var n = t.util.type(e);
                    switch (n) {
                        case "Object":
                            var a = {};
                            for (var r in e) e.hasOwnProperty(r) && (a[r] = t.util.clone(e[r]));
                            return a;
                        case "Array":
                            return e.slice()
                    }
                    return e
                }
            },
            languages: {
                extend: function (e, n) {
                    var a = t.util.clone(t.languages[e]);
                    for (var r in n) a[r] = n[r];
                    return a
                },
                insertBefore: function (e, n, a, r) {
                    r = r || t.languages;
                    var i = r[e],
                        l = {};
                    for (var o in i)
                        if (i.hasOwnProperty(o)) {
                            if (o == n)
                                for (var s in a) a.hasOwnProperty(s) && (l[s] = a[s]);
                            l[o] = i[o]
                        }
                    return r[e] = l
                },
                DFS: function (e, n) {
                    for (var a in e) n.call(e, a, e[a]), "Object" === t.util.type(e) && t.languages.DFS(e[a], n)
                }
            },
            highlightAll: function (e, n) {
                for (var a, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), i = 0; a = r[i++];) t.highlightElement(a, e === !0, n)
            },
            highlightElement: function (a, r, i) {
                for (var l, o, s = a; s && !e.test(s.className);) s = s.parentNode;
                if (s && (l = (s.className.match(e) || [, ""])[1], o = t.languages[l]), o) {
                    a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, s = a.parentNode, /pre/i.test(s.nodeName) && (s.className = s.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l);
                    var c = a.textContent;
                    if (c) {
                        var g = {
                            element: a,
                            language: l,
                            grammar: o,
                            code: c
                        };
                        if (t.hooks.run("before-highlight", g), r && self.Worker) {
                            var u = new Worker(t.filename);
                            u.onmessage = function (e) {
                                g.highlightedCode = n.stringify(JSON.parse(e.data), l), t.hooks.run("before-insert", g), g.element.innerHTML = g.highlightedCode, i && i.call(g.element), t.hooks.run("after-highlight", g)
                            }, u.postMessage(JSON.stringify({
                                language: g.language,
                                code: g.code
                            }))
                        } else g.highlightedCode = t.highlight(g.code, g.grammar, g.language), t.hooks.run("before-insert", g), g.element.innerHTML = g.highlightedCode, i && i.call(a), t.hooks.run("after-highlight", g)
                    }
                }
            },
            highlight: function (e, a, r) {
                var i = t.tokenize(e, a);
                return n.stringify(t.util.encode(i), r)
            },
            tokenize: function (e, n) {
                var a = t.Token,
                    r = [e],
                    i = n.rest;
                if (i) {
                    for (var l in i) n[l] = i[l];
                    delete n.rest
                }
                e: for (var l in n)
                    if (n.hasOwnProperty(l) && n[l]) {
                        var o = n[l];
                        o = "Array" === t.util.type(o) ? o : [o];
                        for (var s = 0; s < o.length; ++s) {
                            var c = o[s],
                                g = c.inside,
                                u = !!c.lookbehind,
                                f = 0,
                                h = c.alias;
                            c = c.pattern || c;
                            for (var p = 0; p < r.length; p++) {
                                var d = r[p];
                                if (r.length > e.length) break e;
                                if (!(d instanceof a)) {
                                    c.lastIndex = 0;
                                    var m = c.exec(d);
                                    if (m) {
                                        u && (f = m[1].length);
                                        var y = m.index - 1 + f,
                                            m = m[0].slice(f),
                                            v = m.length,
                                            k = y + v,
                                            b = d.slice(0, y + 1),
                                            w = d.slice(k + 1),
                                            N = [p, 1];
                                        b && N.push(b);
                                        var O = new a(l, g ? t.tokenize(m, g) : m, h);
                                        N.push(O), w && N.push(w), Array.prototype.splice.apply(r, N)
                                    }
                                }
                            }
                        }
                    }
                return r
            },
            hooks: {
                all: {},
                add: function (e, n) {
                    var a = t.hooks.all;
                    a[e] = a[e] || [], a[e].push(n)
                },
                run: function (e, n) {
                    var a = t.hooks.all[e];
                    if (a && a.length)
                        for (var r, i = 0; r = a[i++];) r(n)
                }
            }
        },
        n = t.Token = function (e, t, n) {
            this.type = e, this.content = t, this.alias = n
        };
    if (n.stringify = function (e, a, r) {
        if ("string" == typeof e) return e;
        if ("[object Array]" == Object.prototype.toString.call(e)) return e.map(function (t) {
            return n.stringify(t, a, e)
        }).join("");
        var i = {
            type: e.type,
            content: n.stringify(e.content, a, r),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: a,
            parent: r
        };
        if ("comment" == i.type && (i.attributes.spellcheck = "true"), e.alias) {
            var l = "Array" === t.util.type(e.alias) ? e.alias : [e.alias];
            Array.prototype.push.apply(i.classes, l)
        }
        t.hooks.run("wrap", i);
        var o = "";
        for (var s in i.attributes) o += s + '="' + (i.attributes[s] || "") + '"';
        return "<" + i.tag + ' class="' + i.classes.join(" ") + '" ' + o + ">" + i.content + "</" + i.tag + ">"
    }, !self.document) return self.addEventListener ? (self.addEventListener("message", function (e) {
        var n = JSON.parse(e.data),
            a = n.language,
            r = n.code;
        self.postMessage(JSON.stringify(t.util.encode(t.tokenize(r, t.languages[a])))), self.close()
    }, !1), self.Prism) : self.Prism;
    var a = document.getElementsByTagName("script");
    return a = a[a.length - 1], a && (t.filename = a.src, document.addEventListener && !a.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)), self.Prism
}();
"undefined" != typeof module && module.exports && (module.exports = Prism);;
Prism.languages.markup = {
    comment: /<!--[\w\W]*?-->/g,
    prolog: /<\?.+?\?>/,
    doctype: /<!DOCTYPE.+?>/,
    cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
        pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
        inside: {
            tag: {
                pattern: /^<\/?[\w:-]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[\w-]+?:/
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
                inside: {
                    punctuation: /=|>|"/g
                }
            },
            punctuation: /\/?>/g,
            "attr-name": {
                pattern: /[\w:-]+/g,
                inside: {
                    namespace: /^[\w-]+?:/
                }
            }
        }
    },
    entity: /\&#?[\da-z]{1,8};/gi
}, Prism.hooks.add("wrap", function (t) {
    "entity" === t.type && (t.attributes.title = t.content.replace(/&amp;/, "&"))
});;
Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//g,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
        inside: {
            punctuation: /[;:]/g
        }
    },
    url: /url\((["']?).*?\1\)/gi,
    selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
    property: /(\b|\B)[\w-]+(?=\s*:)/gi,
    string: /("|')(\\?.)*?\1/g,
    important: /\B!important\b/gi,
    punctuation: /[\{\};:]/g,
    "function": /[-a-z0-9]+(?=\()/gi
}, Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/gi,
        inside: {
            tag: {
                pattern: /<style[\w\W]*?>|<\/style>/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.css
        }
    }
});;
Prism.hooks.add("after-highlight", function (e) {
    var n = e.element.parentNode;
    if (n && /pre/i.test(n.nodeName) && -1 !== n.className.indexOf("line-numbers")) {
        var t, a = 1 + e.code.split("\n").length;
        lines = new Array(a), lines = lines.join("<span></span>"), t = document.createElement("span"), t.className = "line-numbers-rows", t.innerHTML = lines, n.hasAttribute("data-start") && (n.style.counterReset = "linenumber " + (parseInt(n.getAttribute("data-start"), 10) - 1)), e.element.appendChild(t)
    }
});;