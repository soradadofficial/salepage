// Setup Global State
const appState = {
    products: [],
    loading: true,
    currentPage: 1,
    itemsPerPage: 10
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    setupAnalytics();
    fetchProducts();
});

/**
 * Apply Theme from Config
 */
function applyTheme() {
    const root = document.documentElement;
    const config = window.AppConfig;

    // Apply Colors
    root.style.setProperty('--primary-color', config.theme.primary);
    root.style.setProperty('--secondary-color', config.theme.secondary);
    root.style.setProperty('--bg-color', config.theme.background);
    root.style.setProperty('--text-color', config.theme.text);

    // Set Logo
    const logoImg = document.getElementById('site-logo');
    if (logoImg) logoImg.src = config.logoUrl;

    // Set Title
    document.title = config.websiteName;

    // Set Meta SEO
    if (config.seo) {
        document.querySelector('meta[name="description"]').setAttribute("content", config.seo.description);
        document.querySelector('meta[name="keywords"]').setAttribute("content", config.seo.keywords);
    }
}

/**
 * Setup Analytics Scripts
 */
function setupAnalytics() {
    const { googleAnalyticsId, googleTagManagerId, facebookPixelId } = window.AppConfig.analytics;
    const head = document.head;

    // 1. Google Analytics
    if (googleAnalyticsId) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
        head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
        `;
        head.appendChild(inlineScript);
    }

    // 2. Facebook Pixel
    if (facebookPixelId) {
        const script = document.createElement('script');
        script.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${facebookPixelId}');
            fbq('track', 'PageView');
        `;
        head.appendChild(script);
    }

    // 3. Google Tag Manager (Head)
    if (googleTagManagerId) {
        const script = document.createElement('script');
        script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${googleTagManagerId}');`;
        head.appendChild(script);
    }
}

/**
 * Fetch Products from Google Sheet (CSV)
 * Uses fetch() API with CORS proxy fallback
 */
async function fetchProducts() {
    const sheetUrl = window.AppConfig.sheetUrl;
    const loadingEl = document.getElementById('loading');

    // 1. Validate URL
    if (sheetUrl.includes("example_link")) {
        console.warn("Using placeholder data. Please update sheetUrl in config.js");
        renderDummyProducts();
        return;
    }

    try {
        console.log("Attempting to fetch data direct...");
        const data = await fetchCsvData(sheetUrl);
        parseAndLoad(data);
    } catch (errDirect) {
        console.warn("Direct fetch failed, trying CORS proxy...", errDirect);

        try {
            // Fallback: Use CORS Proxy
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(sheetUrl)}`;
            const dataProxy = await fetchCsvData(proxyUrl);
            parseAndLoad(dataProxy);
        } catch (errProxy) {
            console.error("All fetch methods failed:", errProxy);
            loadingEl.innerHTML = `
                <div style="text-align:center; color: #ff4d4f;">
                    <i class="fas fa-exclamation-circle fa-2x"></i>
                    <p>ไม่สามารถโหลดข้อมูลได้ (Failed to load data)</p>
                    <p style="font-size:0.8rem; color:#666;">
                        Check Config.js or "Publish to Web" settings.<br>
                        Error: ${errProxy.message}
                    </p>
                </div>
            `;
        }
    }
}

/**
 * Helper: Fetch CSV Text
 */
async function fetchCsvData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
}

/**
 * Helper: Parse CSV and Render
 */
function parseAndLoad(csvText) {
    Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            if (results.data && results.data.length > 0) {
                console.log("Products Loaded:", results.data.length);
                appState.products = results.data;
                appState.loading = false;
                renderProducts(appState.products);
            } else {
                throw new Error("No data found in CSV");
            }
        },
        error: function (err) {
            throw err;
        }
    });
}


/**
 * Render Dummy Products for Demo
 */
function renderDummyProducts() {
    const dummyData = [
        {
            name: "Wireless Earbuds Pro",
            price: "฿1,290",
            image_url: "https://placehold.co/400x400/1890ff/ffffff?text=Earbuds",
            shopee_link: "#",
            lazada_link: "#",
            tiktok_link: "#"
        },
        {
            name: "Smart Watch Series 5",
            price: "฿2,500",
            image_url: "https://placehold.co/400x400/ff4d4f/ffffff?text=Watch",
            shopee_link: "#",
            lazada_link: "#"
        },
        {
            name: "Gaming Keyboard RGB",
            price: "฿890",
            image_url: "https://placehold.co/400x400/333333/ffffff?text=Keyboard",
            tiktok_link: "#"
        }
    ];
    document.getElementById('loading').style.display = 'none';
    renderProducts(dummyData);
}

/**
 * Render Product Grid with Pagination
 */
function renderProducts(products = appState.products) {
    const grid = document.getElementById('product-grid');
    const loading = document.getElementById('loading');

    if (loading) loading.style.display = 'none';
    grid.innerHTML = '';

    // Pagination Logic
    const start = (appState.currentPage - 1) * appState.itemsPerPage;
    const end = start + appState.itemsPerPage;
    const paginatedItems = products.slice(start, end);

    paginatedItems.forEach(product => {
        // Skip empty rows
        if (!product.name) return;

        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = (e) => {
            // Prevent modal open if button clicked
            if (e.target.closest('a')) return;
            openModal(product);
        };
        card.style.cursor = "pointer";

        // Buttons HTML
        let buttonsHtml = generateButtonsHtml(product);

        // Data Mapping (Handle case where CSV 'price' column contains description)
        let displayPrice = product.price;
        let displayDesc = product.description || "";

        // Heuristic: If price is very long (> 50 chars), treat it as description
        if (displayPrice && displayPrice.length > 50) {
            displayDesc = displayPrice;
            displayPrice = "";
        }

        // Store cleaned data back to object for modal usage
        product._displayDesc = displayDesc;
        product._displayPrice = displayPrice;

        // Card HTML
        card.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}" class="product-image" onerror="this.src='https://placehold.co/400?text=No+Image'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                ${displayDesc ? `<p class="product-desc" style="font-size:0.85rem; color:#666; margin-bottom:10px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${displayDesc}</p>` : ''}
                ${displayPrice ? `<div class="product-price">${displayPrice}</div>` : ''}
                <div class="product-actions">
                    ${buttonsHtml}
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    renderPaginationControls();
    setupModalEvents();
}

/**
 * Generate Action Buttons HTML
 */
function generateButtonsHtml(product) {
    let buttonsHtml = '';
    if (product.shopee_link) {
        buttonsHtml += `<a href="${product.shopee_link}" target="_blank" class="btn-shop btn-shopee"><i class="fas fa-shopping-bag"></i> Shopee</a>`;
    }
    if (product.lazada_link) {
        buttonsHtml += `<a href="${product.lazada_link}" target="_blank" class="btn-shop btn-lazada"><i class="fas fa-heart"></i> Lazada</a>`;
    }
    if (product.tiktok_link) {
        buttonsHtml += `<a href="${product.tiktok_link}" target="_blank" class="btn-shop btn-tiktok"><i class="fab fa-tiktok"></i> TikTok</a>`;
    }
    return buttonsHtml;
}

/**
 * Render Pagination Controls
 */
function renderPaginationControls() {
    const container = document.getElementById('pagination-controls');
    container.innerHTML = '';

    const totalPages = Math.ceil(appState.products.length / appState.itemsPerPage);
    if (totalPages <= 1) return;

    // Prev Button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerText = 'Prev';
    prevBtn.disabled = appState.currentPage === 1;
    prevBtn.onclick = () => {
        if (appState.currentPage > 1) {
            appState.currentPage--;
            renderProducts();
            window.scrollTo(0, 0);
        }
    };
    container.appendChild(prevBtn);

    // Page Numbers (Simple version)
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = `page-btn ${i === appState.currentPage ? 'active' : ''}`;
        btn.innerText = i;
        btn.onclick = () => {
            appState.currentPage = i;
            renderProducts();
            window.scrollTo(0, 0);
        };
        container.appendChild(btn);
    }

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerText = 'Next';
    nextBtn.disabled = appState.currentPage === totalPages;
    nextBtn.onclick = () => {
        if (appState.currentPage < totalPages) {
            appState.currentPage++;
            renderProducts();
            window.scrollTo(0, 0);
        }
    };
    container.appendChild(nextBtn);
}

/**
 * Modal Logic
 */
function openModal(product) {
    const modal = document.getElementById('product-modal');
    document.getElementById('modal-img').src = product.image_url;
    document.getElementById('modal-title').innerText = product.name;
    document.getElementById('modal-price').innerText = product._displayPrice || "";
    document.getElementById('modal-desc').innerText = product._displayDesc || "No description available.";

    document.getElementById('modal-actions').innerHTML = generateButtonsHtml(product);

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function setupModalEvents() {
    const modal = document.getElementById('product-modal');
    const closeSpan = document.querySelector('.close-modal');

    if (closeSpan) {
        closeSpan.onclick = closeModal;
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    }
}
