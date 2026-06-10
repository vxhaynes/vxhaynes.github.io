const API_URL = 'https://spri-new.vxha.workers.dev/api/books';
const BOOKS_PER_PAGE = 10;

const els = {
  fictionList: document.getElementById('fictionList'),
  nonfictionList: document.getElementById('nonfictionList'),
  printBtn: document.getElementById('printBtn'),
  refreshBtn: document.getElementById('refreshBtn'),
  status: document.getElementById('status'),
  error: document.getElementById('error'),
  loadingCardTemplate: document.getElementById('loadingCardTemplate')
};

function showLoading() {
  els.error.hidden = true;
  els.printBtn.disabled = true;
  els.printBtn.textContent = 'Checking lists...';
  els.status.textContent = 'Loading catalog data…';

  [els.fictionList, els.nonfictionList].forEach(list => {
    list.replaceChildren();
    for (let i = 0; i < BOOKS_PER_PAGE; i += 1) {
      list.append(els.loadingCardTemplate.content.cloneNode(true));
    }
  });
}

function renderBook(book) {
  const article = document.createElement('article');
  article.className = 'book-card';

  article.append(createCover(book));

  const body = document.createElement('div');
  body.className = 'book-copy';

  const title = document.createElement('h3');
  title.className = 'book-title';
  title.textContent = book?.title || 'Untitled';
  body.append(title);

  const author = document.createElement('p');
  author.className = 'author';
  author.textContent = book?.author ? `by ${book.author}` : 'Author not listed';
  body.append(author);

  if (book?.callClass) {
    const callNumber = document.createElement('p');
    callNumber.className = 'call-number';
    callNumber.textContent = book.callClass;
    body.append(callNumber);
  }

  if (book?.description) {
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = book.description;
    body.append(description);
  }

  const digitalLabels = getDigitalLabels(book?.platforms);
  if (digitalLabels.length) {
    const digital = document.createElement('p');
    digital.className = 'digital-options';
    digital.textContent = digitalLabels.join(' • ');
    body.append(digital);
  }

  article.append(body);
  return article;
}

function renderEmptySlot() {
  const article = document.createElement('article');
  article.className = 'book-card empty-card';
  article.setAttribute('aria-hidden', 'true');
  article.append(createCover({}));
  const body = document.createElement('div');
  body.className = 'book-copy';
  article.append(body);
  return article;
}

function createCover(book) {
  if (!book?.coverUrl) {
    const fallback = document.createElement('div');
    fallback.className = 'cover-placeholder';
    fallback.textContent = 'No cover';
    return fallback;
  }

  const img = document.createElement('img');
  img.loading = 'lazy';
  img.decoding = 'async';
  img.alt = `Cover of ${book.title || 'book'}`;
  img.className = 'cover';
  img.src = book.coverUrl;
  img.onerror = () => {
    const fallback = document.createElement('div');
    fallback.className = 'cover-placeholder';
    fallback.textContent = 'No cover';
    img.replaceWith(fallback);
  };
  return img;
}

function getDigitalLabels(platforms) {
  if (!Array.isArray(platforms)) return [];
  return [...new Set(platforms.map(platform => platform?.label).filter(Boolean))];
}

function renderList(container, books) {
  container.replaceChildren();

  const trimmed = (Array.isArray(books) ? books : []).slice(0, BOOKS_PER_PAGE);
  trimmed.forEach(book => container.append(renderBook(book)));

  for (let i = trimmed.length; i < BOOKS_PER_PAGE; i += 1) {
    container.append(renderEmptySlot());
  }
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

  renderList(els.fictionList, fictionData.books);
  renderList(els.nonfictionList, nonfictionData.books);

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
