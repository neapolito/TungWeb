(function () {
  var O = location.origin, SEL = '[src],[href],[action],[poster]', AT = ['src', 'href', 'action', 'poster'];
  function fx(u) {
    try {
      if (u && u.url) u = u.url;
      u = String(u);
      if (/^(\/p\/|data:|blob:|javascript:|mailto:|tel:|about:|#)/i.test(u)) return u;
      var a = new URL(u, location.href);
      if (a.origin === O) return u;
      if (a.protocol === 'http:' || a.protocol === 'https:') return '/p/' + a.href;
    } catch (e) {}
    return u;
  }
  var f = window.fetch;
  if (f) window.fetch = function (i, o) {
    try {
      if (typeof i === 'string' || i instanceof URL) i = fx(i);
      else if (i && i.url) i = new Request(fx(i.url), i);
    } catch (e) {}
    return f.call(this, i, o);
  };
  var xo = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (m, u) { arguments[1] = fx(u); return xo.apply(this, arguments); };
  var wo = window.open;
  window.open = function (u) { if (u) arguments[0] = fx(u); return wo.apply(this, arguments); };
  if (navigator.serviceWorker) navigator.serviceWorker.register = function () { return Promise.reject(new Error('disabled')); };

  function one(e) {
    if (!e || e.nodeType !== 1) return;
    for (var i = 0; i < AT.length; i++) {
      var v = e.getAttribute(AT[i]);
      if (v) { var n = fx(v); if (n !== v) e.setAttribute(AT[i], n); }
    }
  }
  new MutationObserver(function (ms) {
    ms.forEach(function (m) {
      if (m.type === 'attributes') return one(m.target);
      m.addedNodes.forEach(function (n) { one(n); if (n.querySelectorAll) n.querySelectorAll(SEL).forEach(one); });
    });
  }).observe(document, { subtree: true, childList: true, attributes: true, attributeFilter: AT });
})();
