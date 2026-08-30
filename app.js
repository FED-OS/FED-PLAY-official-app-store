/* ============================================================
   FED PLAY · ULTIMATE APP STORE — SHARED APP LOGIC
   Each page declares window.FED_PAGE = { tab, featuredIds, hero } and
   calls FED.init() to render sidebar, chips, featured, carousel, grid.
   ============================================================ */
const FED = (function () {

    // ---- helpers ----
    function escapeHtml(str) {
        return String(str).replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m] || m));
    }

    function renderStars(rating) {
        const full = Math.floor(rating);
        let html = '';
        for (let i = 0; i < full; i++) html += '★';
        if (rating % 1 >= 0.5) html += '½';
        for (let i = html.length; i < 5; i++) html += '☆';
        return html;
    }

    function getCategoryLabel(cat) {
        const map = { social: '💬 Social', creative: '🎨 Creative', utility: '🛠️ Utility', games: '🎮 Games', movies: '🎬 Movies' };
        return map[cat] || '📦 App';
    }

    function getCategoryEmoji(cat) {
        const map = { social: '💬', creative: '🎨', utility: '🛠️', games: '🎮', movies: '🎬' };
        return map[cat] || '📦';
    }

    function getButtonClass(app) {
        if (app.isPremium) return 'btn-premium';
        if (app.isPrivate) return 'btn-private';
        if (app.isAppStore) return 'btn-appstore';
        if (app.featured) return 'btn-featured';
        return `btn-${app.category}`;
    }

    // ---- toast ----
    function showToast(message, type = 'info', duration = 3500) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span> ${escapeHtml(message)}`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('out');
            setTimeout(() => { if (toast.parentNode) toast.remove(); }, 400);
        }, duration);
    }

    // ---- state ----
    let activeCategory = 'all';
    let searchQuery = '';
    let pendingPremiumApp = null;
    let searchDebounceTimer = null;
    let paypalRendered = false;

    let featuredIds = [];
    let currentFeaturedIndex = 0;
    let featuredInterval = null;

    // ---- filtering ----
    function getFilteredApps() {
        const page = window.FED_PAGE || {};
        const tab = page.tab || 'apps';
        return APPS.filter(app => {
            // tab gating
            if (tab === 'games' && !app.tags.includes('games')) return false;
            if (tab === 'movies' && !app.tags.includes('movies')) return false;
            if (tab === 'creative' && !app.tags.includes('creative')) return false;
            if (tab === 'utility' && !app.tags.includes('utility')) return false;
            if (tab === 'fed_originals' && !app.tags.includes('fed_originals')) return false;
            if (tab === 'missing' && !app.tags.includes('missing')) return false;
            if (tab === 'premium' && !app.isPremium) return false;
            if (tab === 'private' && !app.isPrivate) return false;
            if (tab === 'appstore' && !app.isAppStore) return false;

            // chip gating
            if (activeCategory === 'featured' && !app.featured) return false;
            if (activeCategory === 'premium' && !app.isPremium) return false;
            if (activeCategory === 'private' && !app.isPrivate) return false;
            if (activeCategory === 'appstore' && !app.isAppStore) return false;
            if (activeCategory !== 'all' && activeCategory !== 'featured' && activeCategory !== 'premium' &&
                activeCategory !== 'private' && activeCategory !== 'appstore' && app.category !== activeCategory)
                return false;

            // search
            if (searchQuery.trim() !== '') {
                const q = searchQuery.toLowerCase();
                return app.name.toLowerCase().includes(q) || app.description.toLowerCase().includes(q);
            }
            return true;
        });
    }

    // ---- featured hero ----
    function renderFeatured() {
        const container = document.getElementById('featuredAppContainer');
        if (!container || featuredIds.length === 0) return;
        const app = APPS.find(a => a.id === featuredIds[currentFeaturedIndex]);
        if (!app) return;

        let btnText = '⬇ Install', btnAction = 'free', badgeHtml = '';
        if (app.isPremium) { btnText = '💎 Unlock'; btnAction = 'premium'; badgeHtml = '<span class="featured-badge-tag">💎 Premium</span>'; }
        else if (app.isPrivate) { btnText = '🔒 Request'; btnAction = 'private'; badgeHtml = '<span class="featured-badge-tag">🔒 Private</span>'; }
        else if (app.isAppStore) { btnText = '📱 Download'; btnAction = 'appstore'; badgeHtml = '<span class="featured-badge-tag">📱 App Store</span>'; }

        const btnClass = getButtonClass(app);
        container.innerHTML = `
            <div class="featured-info">
                <div class="featured-icon-wrap">
                    <img class="featured-icon" src="${app.imageUrl}" alt="${escapeHtml(app.name)} logo" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <span class="featured-icon-fallback">${getCategoryEmoji(app.category)}</span>
                    <div style="display:flex;flex-direction:column;">
                        <h3>${escapeHtml(app.name)}</h3>
                        ${badgeHtml}
                    </div>
                </div>
                <div class="featured-desc">${escapeHtml(app.description)}</div>
                <div class="featured-meta">
                    <span>⭐ ${app.rating} (${app.reviews} reviews)</span>
                    <span>📦 official wrapper</span>
                    ${app.editorsChoice ? '<span class="gp-badge">⭐ Editor\'s pick</span>' : ''}
                </div>
            </div>
            <button class="featured-install ${btnClass}" data-id="${app.id}" data-action="${btnAction}" data-url="${app.downloadUrl || ''}" data-contact="${app.creatorContact || ''}" style="border: 2px solid currentColor; background: transparent; color: var(--text-primary);">
                ${btnText} <span style="font-size:14px;">→</span>
            </button>`;
        container.querySelector('.featured-install').addEventListener('click', function (e) {
            e.stopPropagation();
            handleAppAction(this.dataset.action, this.dataset.id);
        });
        document.querySelectorAll('.featured-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentFeaturedIndex);
        });
    }

    function startFeaturedRotation() {
        if (featuredInterval) clearInterval(featuredInterval);
        if (featuredIds.length <= 1) return;
        featuredInterval = setInterval(() => {
            currentFeaturedIndex = (currentFeaturedIndex + 1) % featuredIds.length;
            renderFeatured();
        }, 4000);
    }

    // ---- grid ----
    function renderGrid() {
        const grid = document.getElementById('appGrid');
        const title = document.getElementById('gridTitle');
        const sub = document.getElementById('gridSub');
        if (!grid) return;
        const filtered = getFilteredApps();

        if (activeCategory === 'premium') { title.textContent = '💎 Premium Apps'; sub.textContent = 'exclusive content'; }
        else if (activeCategory === 'private') { title.textContent = '🔒 Private Apps'; sub.textContent = 'request access from creator'; }
        else if (activeCategory === 'appstore') { title.textContent = '📱 FED Play App Store'; sub.textContent = 'download the app'; }
        else if (activeCategory === 'featured') { title.textContent = '⭐ Featured Apps'; sub.textContent = "editor's picks"; }
        else { title.textContent = window.FED_PAGE.gridTitle || '📦 Most Wanted'; sub.textContent = window.FED_PAGE.gridSub || 'sideload ready'; }

        const countEl = document.getElementById('searchCount');
        if (countEl) {
            if (searchQuery.trim() !== '') {
                countEl.textContent = `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`;
                countEl.classList.add('visible');
            } else countEl.classList.remove('visible');
        }

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🌀</div><h3>No apps found</h3><p>Try a different category or search term</p></div>`;
            return;
        }

        grid.innerHTML = filtered.map((app, index) => {
            let cardClass = '', badgeHtml = '', btnText = 'Install', btnAction = 'free';
            if (app.isPremium) { cardClass = 'premium-card'; badgeHtml = '<div class="badge-tag premium">💎 Premium</div>'; btnText = '💎 Unlock'; btnAction = 'premium'; }
            else if (app.isPrivate) { cardClass = 'private-card'; badgeHtml = '<div class="badge-tag private">🔒 Private</div>'; btnText = '🔒 Request'; btnAction = 'private'; }
            else if (app.isAppStore) { cardClass = 'appstore-card'; badgeHtml = '<div class="badge-tag appstore">📱 App Store</div>'; btnText = '📱 Download'; btnAction = 'appstore'; }
            const btnClass = getButtonClass(app);
            const delay = Math.min(index * 0.03, 0.5);
            return `
                <div class="app-card ${cardClass}" style="animation-delay:${delay}s" role="listitem">
                    ${badgeHtml}
                    <div class="app-icon-wrap">
                        <img class="app-icon" src="${app.imageUrl}" alt="${escapeHtml(app.name)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <span class="app-icon-fallback">${getCategoryEmoji(app.category)}</span>
                        <div>
                            <div class="app-name">${escapeHtml(app.name)}</div>
                            <div class="app-category">${getCategoryLabel(app.category)}</div>
                        </div>
                    </div>
                    <div class="stars">${renderStars(app.rating)} <span class="rating-num">${app.rating}</span></div>
                    ${app.editorsChoice ? '<div class="editors-choice">⭐ Editor’s choice</div>' : ''}
                    <button class="install-btn ${btnClass}" data-id="${app.id}" data-action="${btnAction}" data-url="${app.downloadUrl || ''}" data-contact="${app.creatorContact || ''}">${btnText}</button>
                </div>`;
        }).join('');

        grid.querySelectorAll('.install-btn').forEach(btn => {
            btn.addEventListener('click', function () { handleAppAction(this.dataset.action, this.dataset.id); });
        });
    }

    // ---- app action ----
    function handleAppAction(action, id) {
        const app = APPS.find(a => a.id === id);
        if (!app) return;
        if (action === 'premium' || action === 'private') {
            pendingPremiumApp = app;
            openHolographicModal();
        } else if (action === 'appstore' || action === 'free') {
            if (app.downloadUrl) {
                window.open(app.downloadUrl, '_blank');
                showToast(`⬇️ Downloading ${app.name}…`, 'success');
            } else {
                showToast(`⚠️ No download URL for ${app.name}`, 'warning');
            }
        }
    }

    // ---- holographic modal ----
    let stripeLoaded = false;
    function loadStripeSDK() {
        if (stripeLoaded) return;
        stripeLoaded = true;
        // inject the stripe-buy-button element into the placeholder
        const container = document.getElementById('stripe-button-container-quick');
        if (container && !container.querySelector('stripe-buy-button')) {
            const btn = document.createElement('stripe-buy-button');
            btn.setAttribute('buy-button-id', 'buy_btn_1TqoW5LSIB6IjFRXK9UsvpAT');
            btn.setAttribute('publishable-key', 'pk_live_51TKTF4LSIB6IjFRX3lKiYl3vVLCiphsZluzPsi9Zzz4Dxs1AxXqn2tQXwpXlKuzP2ePkXIn45BoqkVRsSVhSczkk00EhKZvS83');
            container.appendChild(btn);
        }
        // load the SDK
        if (!document.getElementById('stripe-buy-sdk')) {
            const s = document.createElement('script');
            s.src = 'https://js.stripe.com/v3/buy-button.js'; s.id = 'stripe-buy-sdk'; s.async = true;
            document.head.appendChild(s);
        }
    }

    function openHolographicModal() {
        const modal = document.getElementById('holographicModal');
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (!paypalRendered) { renderPayPal(); paypalRendered = true; }
        loadStripeSDK();
    }
    function closeHolographicModal() {
        const modal = document.getElementById('holographicModal');
        modal.classList.remove('open');
        document.body.style.overflow = '';
        pendingPremiumApp = null;
    }
    function renderPayPal() {
        const container = document.getElementById('paypal-button-container-quick');
        if (!container || typeof paypal === 'undefined') return;
        container.innerHTML = '';
        try {
            paypal.Buttons({
                createOrder: function (data, actions) { return actions.order.create({ purchase_units: [{ amount: { value: '10.00' } }] }); },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        showToast(`✅ PayPal completed by ${details.payer.name.given_name}`, 'success');
                        if (pendingPremiumApp) setTimeout(() => unlockAfterPayment(pendingPremiumApp), 1200);
                    });
                },
                onError: function (err) { showToast('❌ PayPal error: ' + err.message, 'error'); },
                onCancel: function () { showToast('⏹️ PayPal cancelled.', 'warning'); }
            }).render(container);
        } catch (e) { console.error('PayPal render error:', e); }
    }
    function unlockAfterPayment(app) {
        if (!app) return;
        if (app.downloadUrl) { window.open(app.downloadUrl, '_blank'); showToast(`✅ ${app.name} unlocked! Download started.`, 'success'); }
        else if (app.creatorContact) { window.open(app.creatorContact, '_blank'); showToast(`🔒 Contact ${app.name} creator for access.`, 'info'); }
        else showToast(`ℹ️ ${app.name} — contact creator for access.`, 'info');
        closeHolographicModal();
    }

    // ---- carousel ----
    let carouselItems = [], duplicatedItems = [];
    let track, scrollPosition = 0, animationId = null, isScrolling = true;
    const SCROLL_SPEED = 0.6, gap = 12;

    function buildCarousel() {
        track = document.getElementById('carouselTrack');
        if (!track) return;
        // carousel shows apps relevant to the current page tab
        const page = window.FED_PAGE || {};
        const tab = page.tab || 'apps';
        carouselItems = APPS.filter(app => {
            if (tab === 'games') return app.tags.includes('games');
            if (tab === 'movies') return app.tags.includes('movies');
            if (tab === 'creative') return app.tags.includes('creative');
            if (tab === 'utility') return app.tags.includes('utility');
            if (tab === 'fed_originals') return app.tags.includes('fed_originals');
            if (tab === 'missing') return app.tags.includes('missing');
            if (tab === 'premium') return app.isPremium;
            if (tab === 'private') return app.isPrivate;
            if (tab === 'appstore') return app.isAppStore;
            return true;
        });
        if (carouselItems.length === 0) carouselItems = [...APPS];
        duplicatedItems = [...carouselItems, ...carouselItems, ...carouselItems, ...carouselItems];
        track.innerHTML = '';
        duplicatedItems.forEach(app => {
            let cardClass = '', badgeHtml = '', btnText = 'Install', btnAction = 'free';
            if (app.isPremium) { cardClass = 'premium-card'; badgeHtml = '<div class="badge-tag">💎</div>'; btnText = '💎 Unlock'; btnAction = 'premium'; }
            else if (app.isPrivate) { cardClass = 'private-card'; badgeHtml = '<div class="badge-tag">🔒</div>'; btnText = '🔒 Request'; btnAction = 'private'; }
            else if (app.isAppStore) { cardClass = 'appstore-card'; badgeHtml = '<div class="badge-tag">📱</div>'; btnText = '📱 Download'; btnAction = 'appstore'; }
            const btnClass = getButtonClass(app);
            const card = document.createElement('div');
            card.className = `carousel-card ${cardClass}`;
            card.setAttribute('role', 'listitem');
            card.innerHTML = `
                ${badgeHtml}
                <img class="carousel-icon" src="${app.imageUrl}" alt="${escapeHtml(app.name)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <span class="carousel-icon-fallback">${getCategoryEmoji(app.category)}</span>
                <div class="carousel-title">${escapeHtml(app.name)}</div>
                <div class="carousel-category">${getCategoryLabel(app.category)}</div>
                <div class="carousel-rating">${renderStars(app.rating)}</div>
                <button class="install-btn ${btnClass}" data-id="${app.id}" data-action="${btnAction}" data-url="${app.downloadUrl || ''}" data-contact="${app.creatorContact || ''}">${btnText}</button>`;
            track.appendChild(card);
        });
        track.querySelectorAll('.install-btn').forEach(btn => {
            btn.addEventListener('click', function (e) { e.stopPropagation(); handleAppAction(this.dataset.action, this.dataset.id); });
        });
        updateCarouselDimensions();
    }

    function updateCarouselDimensions() {
        if (!track || track.children.length === 0) return;
        const first = track.children[0];
        const w = first.offsetWidth + gap;
        const setW = carouselItems.length * w;
        scrollPosition = setW * 1.5;
        track.style.transform = `translateX(-${scrollPosition}px)`;
    }
    function carouselStep() {
        if (!isScrolling || !track) return;
        const first = track.children[0];
        const w = first.offsetWidth + gap;
        const setW = carouselItems.length * w;
        scrollPosition += SCROLL_SPEED;
        if (scrollPosition >= setW * 2) scrollPosition -= setW;
        track.style.transform = `translateX(-${scrollPosition}px)`;
        animationId = requestAnimationFrame(carouselStep);
    }
    function startCarousel() { if (animationId) cancelAnimationFrame(animationId); isScrolling = true; animationId = requestAnimationFrame(carouselStep); }
    function shiftCarousel(dir) {
        if (!track || track.children.length === 0) return;
        const first = track.children[0];
        const w = first.offsetWidth + gap;
        const setW = carouselItems.length * w;
        let target = scrollPosition + (dir === 'next' ? w : -w);
        if (target >= setW * 2) target -= setW;
        if (target < 0) target += setW;
        scrollPosition = target;
        track.style.transform = `translateX(-${scrollPosition}px)`;
    }
    let touchStartX = 0, touchStartY = 0, isDragging = false, dragStartPos = 0;
    function initCarouselTouch() {
        const container = document.getElementById('carouselContainer');
        if (!container) return;
        container.addEventListener('touchstart', function (e) {
            const touch = e.touches[0]; touchStartX = touch.clientX; touchStartY = touch.clientY;
            isDragging = false; dragStartPos = scrollPosition; isScrolling = false;
            if (animationId) cancelAnimationFrame(animationId);
        }, { passive: true });
        container.addEventListener('touchmove', function (e) {
            const touch = e.touches[0];
            const dx = touch.clientX - touchStartX, dy = touch.clientY - touchStartY;
            if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
                e.preventDefault(); isDragging = true;
                const first = track.children[0]; const w = first.offsetWidth + gap; const setW = carouselItems.length * w;
                let newPos = dragStartPos - dx;
                if (newPos < 0) newPos = 0; if (newPos > setW * 2) newPos = setW * 2;
                scrollPosition = newPos; track.style.transform = `translateX(-${scrollPosition}px)`;
            }
        }, { passive: false });
        container.addEventListener('touchend', function () {
            if (isDragging) {
                const first = track.children[0]; const w = first.offsetWidth + gap; const setW = carouselItems.length * w;
                const snapped = Math.round(scrollPosition / w) * w;
                scrollPosition = Math.max(0, Math.min(setW * 2, snapped));
                track.style.transition = 'transform 0.3s ease';
                track.style.transform = `translateX(-${scrollPosition}px)`;
                setTimeout(() => { track.style.transition = 'none'; }, 350);
            }
            isScrolling = true; if (animationId) cancelAnimationFrame(animationId);
            animationId = requestAnimationFrame(carouselStep);
        }, { passive: true });
    }

    // ---- modal wiring ----
    function initHolographicModal() {
        const modal = document.getElementById('holographicModal');
        const closeBtn = document.getElementById('holographicModalClose');
        const trigger = document.getElementById('holographicTrigger');
        if (closeBtn) closeBtn.addEventListener('click', closeHolographicModal);
        if (trigger) trigger.addEventListener('click', openHolographicModal);
        modal.addEventListener('click', function (e) { if (e.target === this) closeHolographicModal(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) closeHolographicModal(); });

        document.getElementById('venmoQuickBtn')?.addEventListener('click', () => window.open('https://account.venmo.com/u/Viraldancando', '_blank'));
        document.getElementById('cryptoPayBtn')?.addEventListener('click', () => window.open('https://nowpayments.io/payment/?iid=5412862639&source=button', '_blank'));
        document.getElementById('directPaymentBtn')?.addEventListener('click', () => window.open('https://nowpayments.io/payment/?iid=5412862639', '_blank'));

        const toggleBtn = document.getElementById('cryptoToggle');
        const content = document.getElementById('cryptoContent');
        if (toggleBtn && content) {
            toggleBtn.addEventListener('click', function () {
                const isOpen = content.classList.toggle('open');
                toggleBtn.classList.toggle('open');
                toggleBtn.querySelector('span:last-child').textContent = isOpen ? '▴' : '▾';
            });
        }

        document.getElementById('copyBtn')?.addEventListener('click', function () {
            const addrInput = document.getElementById('btcAddress');
            addrInput.select(); addrInput.setSelectionRange(0, 99999);
            const done = () => { const btn = this; const o = btn.innerText; btn.innerText = '✅ Copied!'; setTimeout(() => btn.innerText = o, 2000); showToast('📋 Address copied!', 'success'); };
            navigator.clipboard.writeText(addrInput.value).then(done).catch(() => { document.execCommand('copy'); done(); });
        });

        document.getElementById('telegramBtn')?.addEventListener('click', () => window.open('https://t.me/Superhelpful', '_blank'));
        document.getElementById('safewBtn')?.addEventListener('click', () => window.open('https://sfw.vc/superhelpful', '_blank'));

        const processors = [
            { name: 'PayPal', icon: '🅿️', bg: '#003087' }, { name: 'Stripe', icon: '⚡', bg: '#635bff' },
            { name: 'Square', icon: '▣', bg: '#00693e' }, { name: 'Visa', icon: '💳', bg: '#1a1f71' },
            { name: 'Mastercard', icon: '💳', bg: '#eb001b' }, { name: 'Amex', icon: '💳', bg: '#006fcf' },
            { name: 'Discover', icon: '💳', bg: '#ff6000' }, { name: 'Apple Pay', icon: '⌘', bg: '#000000' },
            { name: 'Google Pay', icon: '▶', bg: '#4285f4' }, { name: 'Amazon Pay', icon: '🛒', bg: '#ff9900' },
            { name: 'Venmo', icon: '💙', bg: '#3d95ce' }, { name: 'Cash App', icon: '💰', bg: '#00d632' },
            { name: 'Klarna', icon: '🌸', bg: '#ffb3c7' }, { name: 'Afterpay', icon: '✨', bg: '#b2fce4' },
            { name: 'Affirm', icon: '✓', bg: '#4a4af4' }, { name: 'Braintree', icon: '🌳', bg: '#0b3b5c' },
            { name: 'Adyen', icon: '🔷', bg: '#0abf53' }, { name: 'Worldpay', icon: '🌐', bg: '#f47920' },
            { name: '2Checkout', icon: '✔️', bg: '#1c3c6b' }, { name: 'PayU', icon: '💸', bg: '#0033a0' },
            { name: 'Skrill', icon: '💧', bg: '#1d2b5b' }, { name: 'Neteller', icon: '💛', bg: '#f5b800' },
            { name: 'Paysafe', icon: '🔒', bg: '#0066b3' }, { name: 'Alipay', icon: '🟦', bg: '#1677ff' },
            { name: 'WeChat Pay', icon: '💚', bg: '#07c160' }, { name: 'G Pay', icon: '🟢', bg: '#1a73e8' },
            { name: 'Samsung Pay', icon: '📱', bg: '#1428a0' }, { name: 'Bancontact', icon: '🇧🇪', bg: '#0053a4' },
            { name: 'iDEAL', icon: '🇳🇱', bg: '#cc0033' }, { name: 'Giropay', icon: '🇩🇪', bg: '#ffcc00' },
            { name: 'Przelewy24', icon: '🇵🇱', bg: '#e6007e' }, { name: 'Crypto.com', icon: '₿', bg: '#0b1426' },
            { name: 'BitPay', icon: '₿', bg: '#1a2a3a' }
        ];
        const container = document.getElementById('dropdownContainer');
        const btn = document.getElementById('dropdownBtn');
        const selectedLabel = document.getElementById('selectedLabel');
        const menu = document.getElementById('dropdownMenu');
        if (container && btn && selectedLabel && menu) {
            menu.innerHTML = '';
            const lightBgs = ['#ffb3c7', '#b2fce4', '#f5b800', '#ffcc00', '#ff9900', '#00d632'];
            processors.forEach(p => {
                const item = document.createElement('button');
                item.className = 'dropdown-item';
                item.style.backgroundColor = p.bg;
                item.style.color = lightBgs.includes(p.bg) ? '#1a1a1a' : '#fff';
                item.innerHTML = `<span class="icon">${p.icon}</span><span class="name">${p.name}</span>`;
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    btn.style.backgroundColor = p.bg;
                    btn.style.color = lightBgs.includes(p.bg) ? '#1a1a1a' : '#fff';
                    btn.querySelector('.btn-content .icon').textContent = p.icon;
                    selectedLabel.textContent = p.name;
                    container.classList.remove('open');
                    showToast(`💳 Selected ${p.name}`, 'info');
                });
                menu.appendChild(item);
            });
            btn.addEventListener('click', (e) => { e.stopPropagation(); container.classList.toggle('open'); });
            document.addEventListener('click', () => container.classList.remove('open'));
            menu.addEventListener('click', (e) => e.stopPropagation());
        }
    }

    // ---- sidebar / chips / search / dark mode ----
    function buildSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;
        const tab = (window.FED_PAGE || {}).tab || 'apps';
        const items = TABS.map(t => {
            const count = countForTab(t.id);
            const active = t.id === tab ? ' active' : '';
            const cls = t.cls ? ` ${t.cls}` : '';
            return `<a class="sidebar-item${active}${cls}" href="${t.href}" data-sidebar="${t.id}">
                <span class="material-symbols-outlined">${t.icon}</span><span>${t.label}</span><span class="badge">${count}</span>
            </a>`;
        });
        // insert divider before premium/private/appstore
        const html = `
            <div class="sidebar-brand">
                <div class="brand-icon"><span class="material-symbols-outlined" style="font-size:18px;">play_arrow</span></div>
                <div class="brand-text">FED <span>Play</span></div>
            </div>
            ${items.slice(0, 7).join('')}
            <div class="sidebar-divider"></div>
            ${items.slice(7).join('')}
        `;
        sidebar.innerHTML = html;
    }

    function countForTab(id) {
        if (id === 'apps') return APPS.length;
        if (id === 'premium') return APPS.filter(a => a.isPremium).length;
        if (id === 'private') return APPS.filter(a => a.isPrivate).length;
        if (id === 'appstore') return APPS.filter(a => a.isAppStore).length;
        return APPS.filter(a => a.tags.includes(id)).length;
    }

    function buildChips() {
        const list = document.getElementById('chipList');
        if (!list) return;
        const tab = (window.FED_PAGE || {}).tab || 'apps';
        // For dedicated tab pages, the "all" chip corresponds to that tab; default active is 'all'
        list.innerHTML = CHIPS.map(c => {
            const cls = c.cls ? ` ${c.cls}` : '';
            const active = c.cat === 'all' ? ' active' : '';
            return `<div class="chip${cls}${active}" data-cat="${c.cat}">${c.label}</div>`;
        }).join('');
    }

    function initChips() {
        document.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeCategory = chip.dataset.cat;
                renderGrid();
            });
        });
    }

    function initSearch() {
        const input = document.getElementById('searchInput');
        if (!input) return;
        input.addEventListener('input', (e) => {
            clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(() => { searchQuery = e.target.value; renderGrid(); }, 250);
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { input.blur(); input.value = ''; searchQuery = ''; renderGrid(); showToast('🧹 Search cleared', 'info', 1200); }
        });
    }

    function initDarkMode() {
        const toggle = document.getElementById('darkModeToggle');
        if (!toggle) return;
        const saved = localStorage.getItem('fedplay-dark');
        if (saved !== null) { saved === 'false' ? document.body.classList.remove('dark') : document.body.classList.add('dark'); }
        else { localStorage.setItem('fedplay-dark', 'true'); }
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem('fedplay-dark', document.body.classList.contains('dark'));
            showToast(document.body.classList.contains('dark') ? '🌙 Dark mode' : '☀️ Light mode', 'info', 1500);
        });
    }

    let closeSidebarFn = () => {};
    function initMobileSidebar() {
        const toggleBtn = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        function open() { sidebar.classList.add('open'); overlay?.classList.add('open'); document.body.style.overflow = 'hidden'; }
        function close() { sidebar.classList.remove('open'); overlay?.classList.remove('open'); document.body.style.overflow = ''; }
        closeSidebarFn = close;
        if (toggleBtn && sidebar) toggleBtn.addEventListener('click', (e) => { e.stopPropagation(); sidebar.classList.contains('open') ? close() : open(); });
        overlay?.addEventListener('click', close);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    }

    function initCarouselControls() {
        document.getElementById('carouselPrev')?.addEventListener('click', () => { shiftCarousel('prev'); showToast('⬅️ Carousel previous', 'info', 1000); });
        document.getElementById('carouselNext')?.addEventListener('click', () => { shiftCarousel('next'); showToast('➡️ Carousel next', 'info', 1000); });
        let resizeTimer;
        window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(updateCarouselDimensions, 120); });
    }

    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        window.addEventListener('scroll', () => { window.scrollY > 400 ? btn.classList.add('visible') : btn.classList.remove('visible'); }, { passive: true });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                const si = document.getElementById('searchInput');
                if (si) { si.focus(); si.select(); showToast('🔍 Search focused', 'info', 1500); }
            }
            if (e.key === 'Escape') {
                const modal = document.getElementById('holographicModal');
                if (modal && modal.classList.contains('open')) { closeHolographicModal(); return; }
                const si = document.getElementById('searchInput');
                if (si && document.activeElement === si) { si.blur(); si.value = ''; searchQuery = ''; renderGrid(); showToast('🧹 Search cleared', 'info', 1200); }
                const sidebar = document.getElementById('sidebar');
                if (sidebar && sidebar.classList.contains('open')) closeSidebarFn();
            }
            if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                const active = document.activeElement;
                if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;
                e.preventDefault();
                const si = document.getElementById('searchInput');
                if (si) { si.focus(); si.select(); showToast('🔍 Search focused', 'info', 1200); }
            }
        });
    }

    // ---- public init ----
    function init() {
        const page = window.FED_PAGE || {};
        featuredIds = page.featuredIds || [];

        buildSidebar();
        buildChips();

        // featured hero + dots
        const dotsWrap = document.getElementById('featuredIndicators');
        if (dotsWrap && featuredIds.length > 0) {
            dotsWrap.innerHTML = featuredIds.map((_, i) => `<span class="featured-dot${i === 0 ? ' active' : ''}" data-index="${i}"></span>`).join('');
        }
        if (featuredIds.length > 0) { renderFeatured(); startFeaturedRotation(); }
        else { const fs = document.getElementById('featuredAppContainer'); if (fs) fs.parentElement.style.display = 'none'; }

        // page hero (category pages)
        if (page.hero && document.getElementById('pageHero')) {
            document.getElementById('pageHero').innerHTML = `
                <div class="hero-emoji">${page.hero.emoji}</div>
                <div class="hero-text">
                    <h1>${escapeHtml(page.hero.title)}</h1>
                    <p>${escapeHtml(page.hero.subtitle)}</p>
                    <div class="hero-stats">
                        <span>📦 ${getFilteredApps().length} apps</span>
                        <span>⭐ ${(getFilteredApps().reduce((s,a)=>s+a.rating,0)/(getFilteredApps().length||1)).toFixed(1)} avg rating</span>
                        <span>${page.hero.stat || ''}</span>
                    </div>
                </div>`;
        }

        buildCarousel();
        startCarousel();
        renderGrid();

        initChips();
        initSearch();
        initDarkMode();
        initMobileSidebar();
        initCarouselControls();
        initCarouselTouch();
        initBackToTop();
        initKeyboardShortcuts();
        initHolographicModal();

        document.querySelectorAll('.featured-dot').forEach(dot => {
            dot.addEventListener('click', function () {
                const index = parseInt(this.dataset.index);
                if (index !== currentFeaturedIndex) {
                    currentFeaturedIndex = index; renderFeatured();
                    clearInterval(featuredInterval); startFeaturedRotation();
                }
            });
        });

        if (document.fonts) document.fonts.ready.then(updateCarouselDimensions);
        setTimeout(updateCarouselDimensions, 300);

        setTimeout(() => {
            showToast(`👋 Welcome to FED Play — ${page.welcome || 'your ultimate app store'}!`, 'info', 4000);
        }, 800);

        console.log('📱 FED Play · tab:', page.tab, '· dark mode default, compact UI');
    }

    return { init, showToast, closeSidebar: () => closeSidebarFn() };
})();

if (typeof window !== 'undefined') window.FED = FED;
