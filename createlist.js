(function () {
  var script = document.currentScript;
  if (!script) return;

  var dataset = script.dataset || {};
  var scriptUrl = new URL(script.src, window.location.href);
  var widgetUrl = new URL('widget.html', scriptUrl);

  if (dataset.list) widgetUrl.searchParams.set('list', dataset.list);
  if (dataset.compact) widgetUrl.searchParams.set('compact', dataset.compact);
  if (dataset.title) widgetUrl.searchParams.set('title', dataset.title);
  if (dataset.desc) widgetUrl.searchParams.set('desc', dataset.desc);
  if (dataset.titleText) widgetUrl.searchParams.set('titleText', dataset.titleText);
  if (dataset.descText) widgetUrl.searchParams.set('descText', dataset.descText);

  var iframe = document.createElement('iframe');
  iframe.src = widgetUrl.toString();
  iframe.width = dataset.width || '100%';
  iframe.height = dataset.height || '900';
  iframe.loading = dataset.loading || 'lazy';
  iframe.title = dataset.iframeTitle || dataset.titleText || 'TLN reading list';
  iframe.style.border = '0';
  iframe.style.width = dataset.width || '100%';
  iframe.style.display = 'block';

  if (dataset.allow) iframe.allow = dataset.allow;
  if (dataset.referrerpolicy) iframe.referrerPolicy = dataset.referrerpolicy;

  var mount = null;
  if (dataset.mount) mount = document.querySelector(dataset.mount);

  if (!mount) {
    mount = document.createElement('div');
    script.parentNode.insertBefore(mount, script.nextSibling);
  }

  mount.appendChild(iframe);

  var expectedOrigin = widgetUrl.origin;
  function handleMessage(event) {
    if (event.origin !== expectedOrigin) return;
    var data = event.data || {};
    if (data.type !== 'tln-widget-height') return;
    var nextHeight = Number(data.height);
    if (Number.isFinite(nextHeight) && nextHeight > 0) {
      iframe.style.height = nextHeight + 'px';
      iframe.height = String(Math.ceil(nextHeight));
    }
  }

  window.addEventListener('message', handleMessage);
})();
