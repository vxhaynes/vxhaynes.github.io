const lightbox = document.getElementById('lightbox');
const lightImg = lightbox.querySelector('img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeBtn = document.getElementById('closeBtn');

let currentGallery = [];
let currentIndex = 0;

function showImage(index) {
    currentIndex = index;
    lightImg.src = currentGallery[currentIndex].src;
    lightbox.style.display = 'flex';
}

document.querySelectorAll('.projImg').forEach(gallery => {
    const imgs = gallery.querySelectorAll('img');
    imgs.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentGallery = Array.from(imgs);
            showImage(index);
        });
    });
});

prevBtn.addEventListener('click', e => {
    e.stopPropagation();
    showImage((currentIndex - 1 + currentGallery.length) % currentGallery.length);
});

nextBtn.addEventListener('click', e => {
    e.stopPropagation();
    showImage((currentIndex + 1) % currentGallery.length);
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.gsaProjs');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.projItem'));
    if (!cards.length) return;

    const sortRadios = document.querySelectorAll('input[name="projSort"]');

    const parseTags = (card) => {
        const raw = card.getAttribute('data-tags') || '';
        return raw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    };

    const getId = (card) => {
        const raw = card.getAttribute('data-id');
        if (raw != null && raw !== '' && !isNaN(+raw)) return +raw;
        return -Infinity;
    };

    const meta = cards.map((card, idx) => {
        const title = card.querySelector('h2')?.innerText?.trim() || '';
        const idNum = getId(card);
        const tags = parseTags(card);

        card.querySelectorAll('.projTagRow').forEach(n => n.remove());

        if (tags.length) {
            const row = document.createElement('div');
            row.className = 'projTagRow';
            tags.forEach(t => {
                const pill = document.createElement('span');
                pill.className = 'projTagPill';
                pill.textContent = t;
                row.appendChild(pill);
            });
            card.appendChild(row);
        }

        return {
            card,
            title,
            idNum,
            domIndex: idx,
            tags
        };
    });

    const removeGroupHeaders = () => {
        container.querySelectorAll('.groupHeader').forEach(n => n.remove());
    };

    const mountInOrder = (items, withHeadersFrag = null) => {
        const frag = document.createDocumentFragment();
        if (withHeadersFrag) frag.appendChild(withHeadersFrag);
        items.forEach(it => frag.appendChild(it.card));
        container.appendChild(frag);
    };

    const sortChron = () => {
        removeGroupHeaders();
        const withId = meta.filter(m => Number.isFinite(m.idNum));
        const noId = meta.filter(m => !Number.isFinite(m.idNum));

        withId.sort((a, b) => a.idNum - b.idNum);
        noId.sort((a, b) => a.domIndex - b.domIndex);

        mountInOrder([...withId, ...noId]);
    };

    const sortByTags = () => {
        removeGroupHeaders();

        const hasAnyTags = meta.some(m => m.tags.length);
        if (!hasAnyTags) {
            const byTitle = [...meta].sort((a, b) => a.title.localeCompare(b.title));
            const frag = document.createDocumentFragment();
            byTitle.forEach(m => frag.appendChild(m.card));
            container.appendChild(frag);
            return;
        }

        const groups = new Map();
        meta.forEach(m => {
            const key = m.tags[0] || '(untagged)';
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(m);
        });

        const order = Array.from(groups.keys()).sort((a, b) => a.localeCompare(b));
        const frag = document.createDocumentFragment();

        order.forEach(tag => {
            const hdr = document.createElement('div');
            hdr.className = 'groupHeader';
            hdr.textContent = tag;
            frag.appendChild(hdr);

            const items = groups.get(tag).sort((a, b) => a.title.localeCompare(b.title));
            items.forEach(m => frag.appendChild(m.card));
        });

        container.appendChild(frag);
    };

    sortChron();

    sortRadios.forEach(r => {
        r.addEventListener('change', () => {
            if (!r.checked) return;
            if (r.value === 'chron') sortChron();
            else if (r.value === 'tags') sortByTags();
        });
    });
});
