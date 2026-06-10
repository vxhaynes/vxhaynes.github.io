const API_URL = 'https://spri-new.vxha.workers.dev/api/books';

const els = {
  fictionList: document.getElementById('fictionList'),
  nonfictionList: document.getElementById('nonfictionList'),
  fictionCount: document.getElementById('fictionCount'),
  nonfictionCount: document.getElementById('nonfictionCount'),
  printBtn: document.getElementById('printBtn'),
  refreshBtn: document.getElementById('refreshBtn'),
  status: document.getElementById('status'),
  notice: document.getElementById('notice'),
  error: document.getElementById('error'),
  footerStamp: document.getElementById('footerStamp'),
  loadingCardTemplate: document.getElementById('loadingCardTemplate')
};

function showLoading() {
  els.error.hidden = true;
  els.notice.hidden = true;
  els.printBtn.disabled = true;
  els.printBtn.textContent = 'Checking lists...';
  els.status.textContent = 'Loading catalog data…';
  els.fictionCount.textContent = '';
  els.nonfictionCount.textContent = '';

  [els.fictionList, els.nonfictionList].forEach(list => {
    list.replaceChildren();
    for (let i = 0; i < 6; i += 1) {
      list.append(els.loadingCardTemplate.content.cloneNode(true));
    }
  });
}

function createPill(text) {
  const span = document.createElement('span');
  span.className = 'pill';
  span.textContent = text;
  return span;
}

function renderBook(book) {
  const article = document.createElement('article');
  article.className = 'book-card';

  const cover = createCover(book);
  article.append(cover);

  const body = document.createElement('div');

  const title = document.createElement('h3');
  title.className = 'book-title';
  const titleLink = document.createElement('a');
  titleLink.href = book.catalogUrl || '#';
  titleLink.target = '_blank';
  titleLink.rel = 'noopener noreferrer';
  titleLink.textContent = book.title || 'Untitled';
  title.append(titleLink);
  body.append(title);

  const author = document.createElement('p');
  author.className = 'author';
  author.textContent = book.author ? `by ${book.author}` : 'Author not listed';
  body.append(author);

  const meta = document.createElement('div');
  meta.className = 'meta';
  if (book.callClass) meta.append(createPill(`Shelf: ${book.callClass}`));
  if (book.onshelf === true) meta.append(createPill('On shelf'));
  if (book.onshelf === false) meta.append(createPill('Checked out'));
  body.append(meta);

  if (book.description) {
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = book.description;
    body.append(description);
  }

  if (Array.isArray(book.platforms) && book.platforms.length > 0) {
    body.append(createPlatforms(book.platforms));
  }

  article.append(body);
  return article;
}

function createCover(book) {
  if (!book.coverUrl) {
    const fallback = document.createElement('div');
    fallback.className = 'cover-placeholder';
    fallback.textContent = 'No cover';
    return fallback;
  }

  const link = document.createElement('a');
  link.href = book.catalogUrl || book.coverUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'cover-link';
  link.setAttribute('aria-label', `Open catalog record for ${book.title || 'this book'}`);

  const img = document.createElement('img');
  img.loading = 'lazy';
  img.decoding = 'async';
  img.alt = `Cover of ${book.title || 'book'}`;
  img.src = book.coverUrl;
  img.onerror = () => {
    const fallback = document.createElement('div');
    fallback.className = 'cover-placeholder';
    fallback.textContent = 'No cover';
    link.replaceWith(fallback);
  };
  link.append(img);
  return link;
}

function createPlatforms(platforms) {
  const wrapper = document.createElement('div');
  wrapper.className = 'platforms';

  const label = document.createElement('strong');
  label.textContent = 'Digital options';
  wrapper.append(label);

  const list = document.createElement('div');
  list.className = 'meta';

  platforms.forEach(platform => {
    const pill = createPill(platform.label);
    if (platform.url) {
      const link = document.createElement('a');
      link.href = platform.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.append(pill);
      list.append(link);
    } else {
      list.append(pill);
    }
  });

  wrapper.append(list);
  return wrapper;
}

function renderList(container, countEl, books) {
  container.replaceChildren();
  books.forEach(book => container.append(renderBook(book)));
  countEl.textContent = `${books.length} book${books.length === 1 ? '' : 's'}`;
}

async function fetchList(list, refresh) {
  const url = new URL(API_URL);
  url.searchParams.set('list', list);
  if (refresh) url.searchParams.set('refresh', '1');

  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || `${list} request failed with HTTP ${response.status}`);
  }

  return data;
}

async function loadBooks({ refresh = false } = {}) {
  showLoading();

  const [fictionData, nonfictionData] = await Promise.all([
    fetchList('fiction', refresh),
    fetchList('nonfiction', refresh)
  ]);

  renderList(els.fictionList, els.fictionCount, fictionData.books || []);
  renderList(els.nonfictionList, els.nonfictionCount, nonfictionData.books || []);

  const generatedAt = new Date(Math.max(
    Date.parse(fictionData.generatedAt || 0),
    Date.parse(nonfictionData.generatedAt || 0)
  ));
  const generatedLabel = Number.isNaN(generatedAt.getTime())
    ? new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
    : generatedAt.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

  els.printBtn.disabled = false;
  els.printBtn.textContent = 'Print lists';
  els.status.textContent = `Updated ${generatedLabel}`;
  els.footerStamp.textContent = `Printed from Springfield Township Library catalog data. Generated ${generatedLabel}.`;

  const warnings = [...(fictionData.warnings || []), ...(nonfictionData.warnings || [])];
  if (warnings.length) {
    els.notice.textContent = [...new Set(warnings)].join(' ');
    els.notice.hidden = false;
  }
}

function showError(error) {
  els.printBtn.disabled = true;
  els.printBtn.textContent = 'Checking lists...';
  els.status.textContent = 'Could not load lists.';
  els.error.textContent = `${error.message}\n\nTry refreshing. If this continues, check the Cloudflare Worker logs.`;
  els.error.hidden = false;
}

els.printBtn.addEventListener('click', () => window.print());
els.refreshBtn.addEventListener('click', () => loadBooks({ refresh: true }).catch(showError));

loadBooks().catch(showError);
