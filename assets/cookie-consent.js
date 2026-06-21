(() => {
  const measurementId = 'G-8GW9DG9DR5';
  const storageKey = 'smj_cookie_consent_v1';

  function readConsent() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function writeConsent(value) {
    try {
      if (value === null) window.localStorage.removeItem(storageKey);
      else window.localStorage.setItem(storageKey, value);
    } catch {
      // The current page can still honor the choice when storage is unavailable.
    }
  }

  function clearAnalyticsCookies() {
    const names = document.cookie
      .split(';')
      .map((cookie) => cookie.split('=')[0].trim())
      .filter((name) => name === '_ga' || name.startsWith('_ga_'));
    const hostname = window.location.hostname;
    const domains = ['', hostname, `.${hostname}`];

    for (const name of names) {
      for (const domain of domains) {
        const domainAttribute = domain ? `; domain=${domain}` : '';
        document.cookie = `${name}=; Max-Age=0; path=/${domainAttribute}; SameSite=Lax`;
      }
    }
  }

  function loadAnalytics() {
    if (document.querySelector('script[data-google-tag]')) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.dataset.googleTag = measurementId;
    document.head.append(script);
  }

  function removeBanner() {
    document.querySelector('[data-cookie-banner]')?.remove();
  }

  function rejectConsent() {
    writeConsent('rejected');
    clearAnalyticsCookies();
    removeBanner();
  }

  function acceptConsent() {
    writeConsent('accepted');
    loadAnalytics();
    removeBanner();
  }

  function showBanner() {
    if (document.querySelector('[data-cookie-banner]')) return;

    const banner = document.createElement('section');
    banner.className = 'cookie-consent';
    banner.dataset.cookieBanner = '';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookie-consent-title');
    banner.innerHTML = `
      <div class="cookie-consent__content">
        <div class="cookie-consent__copy">
          <h2 id="cookie-consent-title">Vi bruger statistikcookies</h2>
          <p>Med dit samtykke bruger vi Google Analytics til at forstå trafikken og forbedre hjemmesiden. <a href="/cookiepolitik.html">Læs cookiepolitikken</a>.</p>
        </div>
        <div class="cookie-consent__actions">
          <button type="button" class="cookie-consent__button cookie-consent__button--secondary" data-cookie-reject>Afvis</button>
          <button type="button" class="cookie-consent__button cookie-consent__button--primary" data-cookie-accept>Accepter</button>
        </div>
      </div>`;

    banner.querySelector('[data-cookie-reject]').addEventListener('click', rejectConsent);
    banner.querySelector('[data-cookie-accept]').addEventListener('click', acceptConsent);
    document.body.append(banner);
    banner.querySelector('[data-cookie-reject]').focus();
  }

  function bindSettingsLinks() {
    document.querySelectorAll('[data-cookie-settings]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        writeConsent(null);
        clearAnalyticsCookies();
        if (typeof window.__smjReload === 'function') window.__smjReload();
        else window.location.reload();
      });
    });
  }

  function init() {
    bindSettingsLinks();
    const consent = readConsent();
    if (consent === 'accepted') loadAnalytics();
    else if (consent !== 'rejected') showBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
