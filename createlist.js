(function () {
  var WIDGET_BASE = 'https://spri-reading-lists.pages.dev/';

  function getCurrentScript() {
    return document.currentScript || (function () {
      var scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();
  }

  function normalizeBase(url) {
    return String(url || '').replace(/\/+$/, '') + '/';
  }

  function parseBool(value, defaultValue) {
    if (value == null || value === '') return defaultValue;
    return !(String(value) === '0' || String(value).toLowerCase() === 'false');
  }

  function buildWidgetUrl(base, options) {
    var widgetUrl = new URL('widget.html', normalizeBase(base));
    widgetUrl.searchParams.set('list', options.list);

    if (options.compact) widgetUrl.searchParams.set('compact', '1');
    if (!options.title) widgetUrl.searchParams.set('title', '0');
    if (!options.desc) widgetUrl.searchParams.set('desc', '0');
    if (options.titleText) widgetUrl.searchParams.set('titleText', options.titleText);
    if (options.descText) widgetUrl.searchParams.set('descText', options.descText);

    return widgetUrl.toString();
  }

  function createIframe(script, options) {
    var iframe = document.createElement('iframe');
    iframe.src = buildWidgetUrl(WIDGET_BASE, options);
    iframe.width = options.width || '100%';
    iframe.height = String(options.height || '900');
    iframe.style.width = options.width || '100%';
    iframe.style.border = '0';
    iframe.loading = 'lazy';
    iframe.title = options.iframeTitle || 'TLN reading list';
    iframe.setAttribute('scrolling', 'no');
    iframe.dataset.tlnListEmbed = '1';
    return iframe;
  }

  function findMount(script, selector) {
    if (selector) {
      var target = document.querySelector(selector);
      if (target) return target;
    }

    var next = script.nextElementSibling;
    if (next && next.hasAttribute('data-tln-list-mount')) return next;

    return script.parentNode;
  }

  function init() {
    var script = getCurrentScript();
    if (!script) return;

    var list = script.getAttribute('data-list');
    if (!list) {
      console.error('createlist.js: missing required data-list attribute.');
      return;
    }

    var options = {
      list: list,
      width: script.getAttribute('data-width') || '100%',
      height: script.getAttribute('data-height') || '900',
      mount: script.getAttribute('data-mount'),
      compact: parseBool(script.getAttribute('data-compact'), false),
      title: parseBool(script.getAttribute('data-title'), true),
      desc: parseBool(script.getAttribute('data-desc'), true),
      titleText: script.getAttribute('data-title-text') || '',
      descText: script.getAttribute('data-desc-text') || '',
      iframeTitle: script.getAttribute('data-iframe-title') || 'TLN reading list'
    };

    var mount = findMount(script, options.mount);
    if (!mount) {
      console.error('createlist.js: could not find a mount point.');
      return;
    }

    var iframe = createIframe(script, options);

    if (options.mount) {
      mount.appendChild(iframe);
    } else if (mount === script.parentNode) {
      mount.insertBefore(iframe, script.nextSibling);
    } else {
      mount.appendChild(iframe);
    }

    window.addEventListener('message', function (event) {
      if (!event || !event.data || event.data.type !== 'tln-widget-height') return;
      if (event.origin !== new URL(WIDGET_BASE).origin) return;
      if (!event.data.height) return;
      iframe.style.height = String(event.data.height) + 'px';
      iframe.height = String(event.data.height);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
