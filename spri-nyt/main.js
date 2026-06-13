(function () {
  const root = document.getElementById("spri-nyt-bestsellers");
  if (!root) return;

  const workerUrl = "https://spri-nyt-list.vxha.workers.dev";

   const lists = [
     {
       key: "hardcover-fiction",
       heading: "Fiction"
     },
     {
       key: "hardcover-nonfiction",
       heading: "Nonfiction"
     },
     {
       key: "young-adult-hardcover",
       heading: "Young Adult Hardcover"
     },
     {
       key: "picture-books",
       heading: "Children’s Picture Books"
     }
   ];

  const branches = [
    {
      name: "Addison Township Public Library",
      shortname: "Addison",
      id: 43,
      logo: "/spri-nyt/logos/AddisonTwpLogo.avif"
    },
    {
      name: "Allen Park Public Library",
      shortname: "Allen Park",
      id: 4,
      logo: "/spri-nyt/logos/AllenParkLogo.avif"
    },
    {
      name: "Auburn Hills Public Library",
      shortname: "Auburn Hills",
      id: 50,
      logo: "/spri-nyt/logos/AuburnHillsLogo.avif"
    },
    {
      name: "Auburn Hills Public Library Lockers",
      shortname: "Lockers",
      id: 150,
      logo: "/spri-nyt/logos/AuburnHillsLogo.avif"
    },
    {
      name: "Belleville Area District Library Sumpter Branch",
      shortname: "Sumpter",
      id: 220,
      logo: "/spri-nyt/logos/BellevilleAreaLogo.avif"
    },
    {
      name: "Belleville Area District Library",
      shortname: "Belleville",
      id: 20,
      logo: "/spri-nyt/logos/BellevilleAreaLogo.avif"
    },
    {
      name: "Berkley Public Library",
      shortname: "Berkley",
      id: 30,
      logo: "/spri-nyt/logos/BerkleyLogo.avif"
    },
    {
      name: "Brighton District Library",
      shortname: "Brighton",
      id: 212,
      logo: "/spri-nyt/logos/BrightonLogo.avif"
    },
    {
      name: "Brighton District Library Lockers",
      shortname: "Lockers",
      id: 312,
      logo: "/spri-nyt/logos/BrightonLogo.avif"
    },
    {
      name: "Chelsea District Library",
      shortname: "Chelsea",
      id: 216,
      logo: "/spri-nyt/logos/ChelseaLogo.avif"
    },
    {
      name: "Chelsea Mobile Library",
      shortname: "Mobile",
      id: 316,
      logo: "/spri-nyt/logos/ChelseaLogo.avif"
    },
    {
      name: "Clawson Blair Memorial Library",
      shortname: "Blair",
      id: 15,
      logo: "/spri-nyt/logos/ClawsonBlairLogo.avif"
    },
    {
      name: "Commerce Township Community Library",
      shortname: "Commerce",
      id: 98,
      logo: "/spri-nyt/logos/CommerceTwpLogo.avif"
    },
    {
      name: "Dearborn Heights North - Caroline Kennedy Library",
      shortname: "Caroline Kennedy",
      id: 7,
      logo: "/spri-nyt/logos/DearbornHeightsLogo.avif"
    },
    {
      name: "Dearborn Heights South - JFK Jr Library",
      shortname: "JFK Jr",
      id: 28,
      logo: "/spri-nyt/logos/DearbornHeightsLogo.avif"
    },
    {
      name: "Dexter District Library",
      shortname: "Dexter",
      id: 221,
      logo: "/spri-nyt/logos/DexterLogo.avif"
    },
    {
      name: "Ecorse Public Library",
      shortname: "Ecorse",
      id: 10,
      logo: "/spri-nyt/logos/EcorseLogo.avif"
    },
    {
      name: "Ferndale Area District Library",
      shortname: "Ferndale",
      id: 69,
      logo: "/spri-nyt/logos/FerndaleLogo.avif"
    },
    {
      name: "Flat Rock Public Library",
      shortname: "Flat Rock",
      id: 18,
      logo: "/spri-nyt/logos/FlatRockLogo.avif"
    },
    {
      name: "Franklin Public Library",
      shortname: "Franklin",
      id: 40,
      logo: "/spri-nyt/logos/FranklinLogo.avif"
    },
    {
      name: "Garden City Public Library",
      shortname: "Garden City",
      id: 5,
      logo: "/spri-nyt/logos/GardenCityLogo.avif"
    },
    {
      name: "Hamtramck Public Library",
      shortname: "Hamtramck",
      id: 34,
      logo: "/spri-nyt/logos/HamtramckLogo.avif"
    },
    {
      name: "Hartland Cromaine Library",
      shortname: "Cromaine",
      id: 213,
      logo: "/spri-nyt/logos/HartlandCromaineLogo.avif"
    },
    {
      name: "Hartland Cromaine Library Lockers",
      shortname: "Lockers",
      id: 313,
      logo: "/spri-nyt/logos/HartlandCromaineLogo.avif"
    },
    {
      name: "Hazel Park Memorial District Library",
      shortname: "Hazel Park",
      id: 39,
      logo: "/spri-nyt/logos/HazelParkLogo.avif"
    },
    {
      name: "Highland Township Public Library",
      shortname: "Highland",
      id: 56,
      logo: "/spri-nyt/logos/HighlandTownshipLogo.avif"
    },
    {
      name: "Holly Township Library",
      shortname: "Holly",
      id: 222,
      logo: "/spri-nyt/logos/HollyLogo.avif"
    },
    {
      name: "Huntington Woods Library",
      shortname: "Huntington Woods",
      id: 31,
      logo: "/spri-nyt/logos/HuntingtonWoodsLogo.avif"
    },
    {
      name: "Inkster Leanna Hicks Public Library",
      shortname: "Inkster",
      id: 3,
      logo: "/spri-nyt/logos/InksterLogo.avif"
    },
    {
      name: "Lincoln Park Public Library",
      shortname: "Lincoln Park",
      id: 12,
      logo: "/spri-nyt/logos/LincolnParkLogo.avif"
    },
    {
      name: "Livonia Public Library Alfred Noble",
      shortname: "Alfred Noble",
      id: 19,
      logo: "/spri-nyt/logos/LivoniaLogo.avif"
    },
    {
      name: "Livonia Public Library Carl Sandburg",
      shortname: "Carl Sandburg",
      id: 21,
      logo: "/spri-nyt/logos/LivoniaLogo.avif"
    },
    {
      name: "Livonia Public Library Civic Center",
      shortname: "Civic Center",
      id: 32,
      logo: "/spri-nyt/logos/LivoniaLogo.avif"
    },
    {
      name: "Lyon Township Public Library",
      shortname: "Lyon",
      id: 93,
      logo: "/spri-nyt/logos/LyonLogo.avif"
    },
    {
      name: "Madison Heights Public Library",
      shortname: "Madison Heights",
      id: 29,
      logo: "/spri-nyt/logos/MadisonHeightsLogo.avif"
    },
    {
      name: "Manchester District Library",
      shortname: "Manchester",
      id: 217,
      logo: "/spri-nyt/logos/ManchesterLogo.avif"
    },
    {
      name: "Melvindale Public Library",
      shortname: "Melvindale",
      id: 6,
      logo: "/spri-nyt/logos/MelvindaleLogo.avif"
    },
    {
      name: "Milford Public Library",
      shortname: "Milford",
      id: 58,
      logo: "/spri-nyt/logos/MilfordLogo.avif"
    },
    {
      name: "Novi Lakeshore Lending Library",
      shortname: "Lakeshore",
      id: 166,
      logo: "/spri-nyt/logos/NoviLogo.avif"
    },
    {
      name: "Novi Public Library",
      shortname: "Novi",
      id: 66,
      logo: "/spri-nyt/logos/NoviLogo.avif"
    },
    {
      name: "Oak Park Public Library",
      shortname: "Oak Park",
      id: 37,
      logo: "/spri-nyt/logos/OakParkLogo.avif"
    },
    {
      name: "Oxford Public Library",
      shortname: "Oxford",
      id: 42,
      logo: "/spri-nyt/logos/OxfordLogo.avif"
    },
    {
      name: "Pontiac Public Library",
      shortname: "Pontiac",
      id: 41,
      logo: "/spri-nyt/logos/PontiacLogo.avif"
    },
    {
      name: "Redford Township District Library",
      shortname: "Redford",
      id: 9,
      logo: "/spri-nyt/logos/RedfordLogo.avif"
    },
    {
      name: "River Rouge Public Library",
      shortname: "River Rouge",
      id: 8,
      logo: "/spri-nyt/logos/RiverRougeLogo.avif"
    },
    {
      name: "Riverview Veterans Memorial Library",
      shortname: "Riverview",
      id: 24,
      logo: "/spri-nyt/logos/RiverviewLogo.avif"
    },
    {
      name: "Romulus Public Library",
      shortname: "Romulus",
      id: 22,
      logo: "/spri-nyt/logos/RomulusLogo.avif"
    },
    {
      name: "Royal Oak Public Library",
      shortname: "Royal Oak",
      id: 65,
      logo: "/spri-nyt/logos/RoyalOakLogo.avif"
    },
    {
      name: "Salem-South Lyon District Library",
      shortname: "Salem-South Lyon",
      id: 97,
      logo: "/spri-nyt/logos/SalemSouthLyonLogo.avif"
    },
    {
      name: "Southgate Veterans Memorial Library",
      shortname: "Southgate",
      id: 14,
      logo: "/spri-nyt/logos/SouthgateLogo.avif"
    },
    {
      name: "Springfield Township Library",
      shortname: "Springfield",
      id: 71,
      logo: "/spri-nyt/logos/SpringfieldLogo.avif"
    },
    {
      name: "Taylor Community Library",
      shortname: "Taylor",
      id: 26,
      logo: "/spri-nyt/logos/TaylorLogo.avif"
    },
    {
      name: "Trenton Veterans Memorial Library",
      shortname: "Trenton",
      id: 16,
      logo: "/spri-nyt/logos/TrentonLogo.avif"
    },
    {
      name: "Walled Lake City Library",
      shortname: "Walled Lake",
      id: 62,
      logo: "/spri-nyt/logos/WalledLakeLogo.avif"
    },
    {
      name: "Waterford Township Public Library",
      shortname: "Waterford",
      id: 64,
      logo: "/spri-nyt/logos/WaterfordLogo.avif"
    },
    {
      name: "Wayne Public Library",
      shortname: "Wayne",
      id: 23,
      logo: "/spri-nyt/logos/WayneLogo.avif"
    },
    {
      name: "White Lake Township Library",
      shortname: "White Lake",
      id: 73,
      logo: "/spri-nyt/logos/WhiteLakeLogo.avif"
    },
    {
      name: "Wixom Public Library",
      shortname: "Wixom",
      id: 38,
      logo: "/spri-nyt/logos/WixomLogo.avif"
    },
    {
      name: "Wyandotte Bacon Memorial District Library",
      shortname: "Bacon",
      id: 95,
      logo: "/spri-nyt/logos/WyandotteBaconLogo.avif"
    },
    {
      name: "Northville District Library",
      shortname: "Northville",
      id: 13,
      logo: "/spri-nyt/logos/NorthvilleLogo.avif"
    }
  ];

  const BRANCH_STORAGE_KEY = "spriNytSelectedBranchId";
  const QR_CAPTION = "Scan to view this flyer in your browser. Tap the links to find the books right on your device!";
  let selectedBranch = getInitialBranch();
  let currentListData = [];
  let isAvailabilityChecking = true;
  let availabilityBatchId = 0;


  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[char];
    });
  }

  function cleanIsbn(value) {
    return String(value || "").replace(/[^0-9X]/gi, "");
  }

  function getBookIsbns(book) {
    const rawIsbns = [];

    if (Array.isArray(book.isbns)) {
      book.isbns.forEach(function (entry) {
        if (typeof entry === "string") {
          rawIsbns.push(entry);
        } else if (entry && typeof entry === "object") {
          if (entry.isbn13) rawIsbns.push(entry.isbn13);
          if (entry.isbn10) rawIsbns.push(entry.isbn10);
        }
      });
    }

    if (book.primary_isbn13) rawIsbns.push(book.primary_isbn13);
    if (book.primary_isbn10) rawIsbns.push(book.primary_isbn10);

    return Array.from(
      new Set(
        rawIsbns
          .map(cleanIsbn)
          .filter(Boolean)
      )
    );
  }

  function getCoverIsbn(book) {
    const isbns = getBookIsbns(book);
    return isbns[0] || "";
  }

  function makeCoverUrl(book) {
    const isbn = getCoverIsbn(book);
    return isbn ? "https://static01.nyt.com/bestsellers/images/" + isbn + ".jpg" : "";
  }

  function makeMelUrl(book) {
    const isbn = getCoverIsbn(book);
    return isbn ? "https://search.mel.org/iii/encore/search/C__S" + encodeURIComponent(isbn) : "";
  }

  function makeBookId(listKey, index) {
    return "spri-nyt-" + listKey.replace(/[^a-z0-9]/gi, "-") + "-" + index;
  }

  function getInitialBranch() {
    const urlBranch = getBranchFromUrl();
    if (urlBranch) return urlBranch;

    let savedId = "";

    try {
      savedId = localStorage.getItem(BRANCH_STORAGE_KEY) || "";
    } catch (error) {
      savedId = "";
    }

    return getBranchById(savedId) || getBranchById("71") || branches[0];
  }

  function getBranchById(id) {
    return branches.find(function (branch) {
      return String(branch.id) === String(id);
    });
  }

  function getBranchFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      return getBranchById(params.get("id"));
    } catch (error) {
      return null;
    }
  }

  function getBranchFlyerUrl(branch) {
    return "https://vxhaynes.github.io/spri-nyt?id=" + encodeURIComponent(String((branch || selectedBranch).id));
  }

  function syncUrlToSelectedBranch() {
    const flyerUrl = getBranchFlyerUrl(selectedBranch);

    try {
      window.history.replaceState({}, "", flyerUrl);
    } catch (error) {
      // Ignore URL update errors.
    }
  }

  function makeQrCodeUrl(value) {
    return "https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=" + encodeURIComponent(value);
  }

  function setPrintButtonLoading(isLoading) {
    isAvailabilityChecking = Boolean(isLoading);

    const button = root.querySelector(".spri-print-button");
    if (!button) return;

    button.textContent = isAvailabilityChecking ? "Checking lists..." : "Print lists";
    button.disabled = isAvailabilityChecking;
    button.setAttribute("aria-disabled", isAvailabilityChecking ? "true" : "false");
  }

  function saveSelectedBranch() {
    try {
      localStorage.setItem(BRANCH_STORAGE_KEY, String(selectedBranch.id));
    } catch (error) {
      // Ignore localStorage errors.
    }
  }

  function getBranchOptionsHtml() {
    return branches.map(function (branch) {
      const selected = String(branch.id) === String(selectedBranch.id) ? " selected" : "";

      return `
        <option value="${escapeHtml(branch.id)}"${selected}>
          ${escapeHtml(branch.name)}
        </option>
      `;
    }).join("");
  }

  function renderControlsHtml() {
    const printDisabledAttr = isAvailabilityChecking
      ? 'disabled aria-disabled="true"'
      : 'aria-disabled="false"';

    return `
      <div class="spri-widget-toolbar">
        <label class="spri-library-picker">
          <span>Library</span>
          <select id="spri-library-select">
            ${getBranchOptionsHtml()}
          </select>
        </label>

        <button
          class="spri-print-button"
          type="button"
          onclick="window.print()"
          ${printDisabledAttr}
        >
          ${isAvailabilityChecking ? "Checking lists..." : "Print lists"}
        </button>
      </div>
    `;
  }

  function attachBranchSelector() {
    const select = document.getElementById("spri-library-select");
    if (!select) return;

    select.addEventListener("change", async function () {
      const nextBranch = getBranchById(select.value);

      if (!nextBranch || String(nextBranch.id) === String(selectedBranch.id)) {
        return;
      }

      selectedBranch = nextBranch;
      saveSelectedBranch();
      syncUrlToSelectedBranch();

      if (currentListData.length) {
        setPrintButtonLoading(true);
        renderLists(currentListData);
        await checkAllAvailability(currentListData);
      } else {
        renderLoading();
      }
    });
  }

  function renderHeaderHtml(list, dateHtml) {
    const flyerUrl = getBranchFlyerUrl(selectedBranch);
    const qrUrl = makeQrCodeUrl(flyerUrl);

    return `
      <header class="spri-nyt-header">
        <img
          class="spri-brand-logo"
          src="${escapeHtml(selectedBranch.logo)}"
          alt="${escapeHtml(selectedBranch.name)} logo"
        >

        <div class="spri-header-text">
          <div class="spri-brand-name">${escapeHtml(selectedBranch.name)}</div>
          <h2 class="spri-list-title">
            New York Times ${escapeHtml(list.heading)} Best Sellers
          </h2>
          <div class="spri-nyt-date">
            ${dateHtml}
          </div>
        </div>

        <div class="spri-header-qr">
          <img
            class="spri-header-qr-image"
            src="${escapeHtml(qrUrl)}"
            alt="QR code for ${escapeHtml(flyerUrl)}"
            loading="eager"
          >
          <div class="spri-header-qr-caption">
            ${escapeHtml(QR_CAPTION)}
          </div>
        </div>
      </header>
    `;
  }

  function renderLoading() {
    root.innerHTML = `
      ${renderControlsHtml()}
      <div class="spri-nyt-grid">
        ${lists.map(function (list) {
          return `
            <section class="spri-nyt-column">
              ${renderHeaderHtml(list, "Loading…")}
            </section>
          `;
        }).join("")}
      </div>
    `;

    attachBranchSelector();
  }

  function renderError(message) {
    root.innerHTML = `
      <div class="spri-nyt-error">
        ${escapeHtml(message)}
      </div>
    `;
  }

  async function fetchJson(url) {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || data.error || "Request failed: " + response.status);
    }

    return data;
  }

  async function loadList(list) {
    const data = await fetchJson(
      workerUrl + "/nyt?list=" + encodeURIComponent(list.key)
    );

    return {
      ...list,
      publishedDate: data.published_date || "",
      books: Array.isArray(data.books) ? data.books : []
    };
  }

   function renderLists(listData) {
     root.innerHTML = `
       ${renderControlsHtml()}

       <div class="spri-nyt-grid">
         ${listData.map(function (list) {
           return `
             <section class="spri-nyt-column">
               ${renderHeaderHtml(
                 list,
                 list.publishedDate ? formatDisplayDate(list.publishedDate) : ""
               )}

               <ol class="spri-nyt-list">
                 ${list.books.slice(0, 15).map(function (book, index) {
                   const id = makeBookId(list.key, index);
                   const coverUrl = makeCoverUrl(book);

                   return `
                     <li class="spri-nyt-item" id="${escapeHtml(id)}">
                       <div class="spri-nyt-book">
                         ${coverUrl ? `
                           <span class="spri-nyt-cover-wrap">
                             <img
                               class="spri-nyt-cover"
                               src="${escapeHtml(coverUrl)}"
                               alt=""
                               loading="lazy"
                               onerror="this.closest('.spri-nyt-cover-wrap').remove();"
                             >
                           </span>
                         ` : ""}

                         <div class="spri-nyt-info">
                           <div class="spri-nyt-title">
                             ${escapeHtml(book.title)}
                           </div>

                           <div class="spri-nyt-author">
                             by ${escapeHtml(book.author)}
                           </div>

                           ${book.description ? `
                             <div class="spri-nyt-desc">
                               ${escapeHtml(book.description)}
                             </div>
                           ` : ""}

                           <div class="spri-nyt-status" data-status="checking">
                             Checking availability...
                           </div>

                           <div class="spri-nyt-libby"></div>

                           <div class="spri-nyt-hoopla"></div>
                         </div>
                       </div>
                     </li>
                   `;
                 }).join("")}
               </ol>

               <footer class="spri-print-footer">
                 Printed on ${escapeHtml(getPrintedDate())}
               </footer>
             </section>
           `;
         }).join("")}
       </div>
     `;

     attachBranchSelector();
   }

  function applyCatalogLink(item, book, data) {
    const titleEl = item.querySelector(".spri-nyt-title");
    const coverWrap = item.querySelector(".spri-nyt-cover-wrap");
    const statusEl = item.querySelector(".spri-nyt-status");

    const linkUrl = data.status === "not-found"
      ? makeMelUrl(book)
      : data.catalog_url;

    if (!linkUrl) return;

    if (titleEl && !titleEl.querySelector("a")) {
      const currentTitle = titleEl.innerHTML;

      titleEl.innerHTML = `
        <a href="${escapeHtml(linkUrl)}" target="_blank" rel="noopener">
          ${currentTitle}
        </a>
      `;
    }

    if (coverWrap && !coverWrap.querySelector("a")) {
      coverWrap.innerHTML = `
        <a href="${escapeHtml(linkUrl)}" target="_blank" rel="noopener">
          ${coverWrap.innerHTML}
        </a>
      `;
    }

    if (statusEl && !statusEl.querySelector("a")) {
      const currentStatus = statusEl.textContent;

      statusEl.innerHTML = `
        <a href="${escapeHtml(linkUrl)}" target="_blank" rel="noopener">
          ${escapeHtml(currentStatus)}
        </a>
      `;
    }
  }

  function renderLibbyLinks(item, data) {
    const libbyEl = item.querySelector(".spri-nyt-libby");
    if (!libbyEl) return;

    const libbyLinks = data.libby_links || {};
    const links = [];

    if (libbyLinks.ebook_url) {
      links.push(`
        <a href="${escapeHtml(libbyLinks.ebook_url)}" target="_blank" rel="noopener">
          🕮 eBook on Libby
        </a>
      `);
    }

    if (libbyLinks.eaudiobook_url) {
      links.push(`
        <a href="${escapeHtml(libbyLinks.eaudiobook_url)}" target="_blank" rel="noopener">
          🕪 Audiobook on Libby
        </a>
      `);
    }

    libbyEl.innerHTML = links.join(" ");
  }


  function renderHooplaLinks(item, data) {
    const hooplaEl = item.querySelector(".spri-nyt-hoopla");
    if (!hooplaEl) return;

    const hooplaLinks = data.hoopla_links || {};
    const links = [];

    if (hooplaLinks.ebook_url) {
      links.push(`
        <a href="${escapeHtml(hooplaLinks.ebook_url)}" target="_blank" rel="noopener">
          🕮 eBook on Hoopla
        </a>
      `);
    }

    if (hooplaLinks.audiobook_url) {
      links.push(`
        <a href="${escapeHtml(hooplaLinks.audiobook_url)}" target="_blank" rel="noopener">
          🕪 Audiobook on Hoopla
        </a>
      `);
    }

    hooplaEl.innerHTML = links.join(" ");
  }

  async function checkAvailability(list, book, index, batchId) {
    const id = makeBookId(list.key, index);
    const item = document.getElementById(id);
    if (!item) return;

    const statusEl = item.querySelector(".spri-nyt-status");
    const isbns = getBookIsbns(book);

    const params = new URLSearchParams();
    params.set("title", book.title || "");
    params.set("author", book.author || "");
    params.set("isbns", isbns.join(","));
    params.set("branch", selectedBranch.id);
    params.set("branchShortname", selectedBranch.shortname);

    try {
      const data = await fetchJson(workerUrl + "/book?" + params.toString());

      if (batchId !== availabilityBatchId) return;

      statusEl.textContent = data.label || data.error || "Check catalog";
      statusEl.dataset.status = data.status || "unknown";

      applyCatalogLink(item, book, data);
      renderLibbyLinks(item, data);
      renderHooplaLinks(item, data);
    } catch (error) {
      if (batchId !== availabilityBatchId) return;

      statusEl.textContent = "Availability check failed: " + String(error.message || error);
      statusEl.dataset.status = "error";
    }
  }

   function getPrintedDate() {
     return new Date().toLocaleDateString("en-US", {
       month: "long",
       day: "numeric",
       year: "numeric"
     });
   }
   
  async function checkAllAvailability(listData) {
    const batchId = ++availabilityBatchId;
    setPrintButtonLoading(true);

    const jobs = [];

    listData.forEach(function (list) {
      list.books.slice(0, 15).forEach(function (book, index) {
        jobs.push(function () {
          return checkAvailability(list, book, index, batchId);
        });
      });
    });

    await runLimited(jobs, 6);

    if (batchId === availabilityBatchId) {
      setPrintButtonLoading(false);
    }
  }

  async function runLimited(jobs, limit) {
    const queue = jobs.slice();
    const workers = [];

    for (let i = 0; i < Math.min(limit, queue.length); i++) {
      workers.push((async function () {
        while (queue.length) {
          const job = queue.shift();

          try {
            await job();
          } catch (error) {
            // Individual book errors are handled in checkAvailability().
          }
        }
      })());
    }

    await Promise.allSettled(workers);
  }

   function formatDisplayDate(value) {
     if (!value) return "";
   
     const parts = String(value).split("-");
     if (parts.length !== 3) return value;
   
     const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
   
     return date.toLocaleDateString("en-US", {
       month: "long",
       day: "numeric",
       year: "numeric"
     });
   }

  async function init() {
    if (!workerUrl) {
      renderError("Missing Cloudflare Worker URL.");
      return;
    }

    syncUrlToSelectedBranch();
    renderLoading();

    try {
      const listData = await Promise.all(lists.map(loadList));
      currentListData = listData;
      renderLists(currentListData);
      await checkAllAvailability(currentListData);
    } catch (error) {
      renderError("The bestseller lists could not be loaded.");
    }
  }

  init();
})();
