/* ============================================================
   FED PLAY · SHARED LAYOUT INJECTOR
   Injects the top bar, categories bar, toast, back-to-top, and
   the holographic payment modal into every page so HTML stays lean.
   Each page only needs the unique body content (hero/featured/grid).
   ============================================================ */
const FED_LAYOUT = (function () {

    const PAYPAL_SDK = 'https://www.paypal.com/sdk/js?client-id=AaZIURGHfoVL0seNGmKhkm3_piU1UERhw7N4TaWhA8DIRRfxZ383l5QqVbyBHfsrB1Hz3H589vd1ZcpI&buyer-country=US&currency=USD&components=buttons&enable-funding=venmo,paylater,card';
    const STRIPE_SDK = 'https://js.stripe.com/v3/buy-button.js';

    function topBarHTML() {
        return `
        <header class="top-bar">
            <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
                <span class="material-symbols-outlined">menu</span>
            </button>
            <div class="logo-area">
                <div class="brand-icon"><span class="material-symbols-outlined" style="font-size:14px;">play_arrow</span></div>
                <div class="brand-text">FED <span>Play</span></div>
            </div>
            <div class="search-wrapper">
                <div class="search-bar">
                    <span class="material-symbols-outlined">search</span>
                    <input type="text" id="searchInput" placeholder="Search for apps, games &amp; more…" aria-label="Search" />
                    <span class="material-symbols-outlined">mic</span>
                </div>
                <span class="search-results-count" id="searchCount"></span>
            </div>
            <div class="right-icons">
                <button class="gp-subscribe-btn" id="holographicTrigger" type="button">
                    <i class="fas fa-crown" style="font-size:10px;"></i> Subscribe
                </button>
                <button class="theme-toggle" id="darkModeToggle" aria-label="Toggle dark mode">
                    <span class="material-symbols-outlined">light_mode</span>
                    <span class="material-symbols-outlined">dark_mode</span>
                    <div class="toggle-slider"></div>
                </button>
                <div class="avatar" role="img" aria-label="User avatar">F</div>
            </div>
        </header>`;
    }

    function categoriesBarHTML() {
        return `
        <nav class="categories-bar" aria-label="Categories">
            <div class="chip-list" id="chipList"></div>
        </nav>`;
    }

    function footerHTML() {
        return `
        <footer class="app-footer">
            <span class="footer-icon">🧩</span> FED Play — the ultimate app store for websites without official apps.<br />
            📲 Download the FED Play app from the <strong>App Store</strong> section. · 🌐 Browse all tabs in the sidebar.
        </footer>`;
    }

    function modalHTML() {
        return `
        <div class="holographic-modal-overlay" id="holographicModal">
            <div class="holographic-modal-content" role="dialog" aria-modal="true" aria-label="Payment options">
                <button class="modal-close" id="holographicModalClose" type="button" aria-label="Close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="card-header">
                    <h1>⚡ <span class="gp-highlight">FED</span> Play <span style="font-weight:400;color:var(--text-muted);">·</span> Premium</h1>
                    <p>Choose your payment method — fast, secure, and private.</p>
                </div>
                <div class="grid-2col">
                    <div class="embedded-wrapper">
                        <span class="label"><i class="fas fa-paypal" style="margin-right:4px;"></i> PayPal</span>
                        <div id="paypal-button-container-quick"></div>
                    </div>
                    <div class="embedded-wrapper">
                        <span class="label"><i class="fas fa-bolt" style="margin-right:4px;"></i> Stripe</span>
                        <div id="stripe-button-container-quick"></div>
                    </div>
                </div>
                <div class="flex-row" style="margin-top:0.6rem;">
                    <button class="btn btn-venmo" id="venmoQuickBtn" type="button" style="flex:1;"><i class="fab fa-venmo"></i> Venmo</button>
                    <button class="btn btn-crypto" id="cryptoPayBtn" type="button" style="flex:1;"><i class="fab fa-bitcoin"></i> Crypto</button>
                </div>
                <div class="divider"></div>
                <button class="crypto-toggle" id="cryptoToggle" type="button">
                    <span>🔑 Reveal Crypto &amp; Secure Options</span>
                    <span class="arrow">▾</span>
                </button>
                <div class="crypto-content" id="cryptoContent">
                    <div class="crypto-grid">
                        <div class="crypto-box">
                            <span class="title">⚡ Pay with Crypto (Widget)</span>
                            <div class="iframe-wrap">
                                <iframe src="https://nowpayments.io/embeds/payment-widget?iid=5412862639" width="410" height="696" frameborder="0" scrolling="no" style="overflow-y:hidden;width:100%;height:380px;border:0;" loading="lazy" title="NOWPayments payment widget"></iframe>
                            </div>
                            <button class="btn btn-crypto" id="directPaymentBtn" type="button" style="width:100%;"><i class="fas fa-external-link-alt"></i> Open payment page</button>
                        </div>
                        <div class="crypto-box">
                            <span class="title">₿ Bitcoin Address</span>
                            <div class="address-copy">
                                <span style="color:var(--text-muted);font-size:10px;">📬</span>
                                <input type="text" value="bc1qwflupf704dhvwfk8msrzgz7f8x5vmp7hdetm0y" id="btcAddress" readonly>
                                <button class="copy-btn" id="copyBtn" type="button">📋 Copy</button>
                            </div>
                            <div class="disclosure-text">
                                <strong>⚠️ FIAT TERMINATED / POLICY</strong>
                                <p style="margin-top:2px;"><strong>EN:</strong> All traditional gateways are blacklisted due to chargeback abuse. Bitcoin transactions are irreversible. No refunds.</p>
                                <p style="margin-top:2px;"><strong>PT:</strong> Gateways tradicionais banidos devido a fraudes. Transações Bitcoin imutáveis. Reembolso zero.</p>
                                <p style="margin-top:2px;"><strong>ZH:</strong> 因恶意申诉欺诈，传统支付已禁用。比特币交易不可篡改，概不退款。</p>
                            </div>
                            <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.4rem;">
                                <button class="btn btn-telegram" id="telegramBtn" type="button" style="flex:1;"><i class="fab fa-telegram"></i> Telegram</button>
                                <button class="btn btn-safew" id="safewBtn" type="button" style="flex:1;"><i class="fas fa-shield-alt"></i> Safew</button>
                            </div>
                            <p style="font-size:0.65rem;color:var(--text-muted);text-align:center;margin-top:0.3rem;">After paying, message us on Telegram or Safew with your TXID.</p>
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="dropdown-wrapper">
                    <div class="sub">💳 Traditional Payment Methods (vetted members only · reference)</div>
                    <div class="dropdown" id="dropdownContainer">
                        <button id="dropdownBtn" type="button">
                            <span class="btn-content"><span class="icon">💳</span><span class="label" id="selectedLabel">Select payment</span></span>
                            <span class="arrow">▾</span>
                        </button>
                        <div id="dropdownMenu"></div>
                    </div>
                </div>
                <div class="footnote">
                    <strong>Final Policy:</strong> All Bitcoin payments are final. Legacy platforms are permanently locked for new accounts.
                    <span style="display:block;margin-top:4px;">📩 Support: <a href="https://t.me/Superhelpful" target="_blank">@superhelpful</a></span>
                </div>
            </div>
        </div>`;
    }

    function toastAndTopHTML() {
        return `
        <div class="toast-container" id="toastContainer" role="status" aria-live="polite"></div>
        <button class="back-to-top" id="backToTop" aria-label="Back to top">↑</button>`;
    }

    function inject() {
        // scripts that must load for the modal — PayPal loads eagerly (no CSP issues).
        // Stripe Buy Button SDK loads lazily (on first modal open) to avoid CSP frame-blocking on localhost.
        const head = document.head;
        if (!document.getElementById('paypal-sdk')) {
            const s = document.createElement('script');
            s.src = PAYPAL_SDK; s.id = 'paypal-sdk';
            s.setAttribute('data-sdk-integration-source', 'developer-studio');
            head.appendChild(s);
        }

        // inject top bar + categories into main content (before #fedContent)
        const main = document.querySelector('.main-content');
        if (main) {
            const content = document.getElementById('fedContent');
            const topWrap = document.createElement('div');
            topWrap.innerHTML = topBarHTML() + categoriesBarHTML();
            const nodes = [...topWrap.childNodes];
            // insert before content if present, else prepend
            if (content) nodes.forEach(n => main.insertBefore(n, content));
            else nodes.forEach(n => main.appendChild(n));
        }

        // footer at end of main
        if (main) {
            const f = document.createElement('div');
            f.innerHTML = footerHTML();
            while (f.firstChild) main.appendChild(f.firstChild);
        }

        // modal + toast + back-to-top at end of body
        const extras = document.createElement('div');
        extras.innerHTML = modalHTML() + toastAndTopHTML();
        while (extras.firstChild) document.body.appendChild(extras.firstChild);
    }

    return { inject };
})();
if (typeof window !== 'undefined') window.FED_LAYOUT = FED_LAYOUT;
