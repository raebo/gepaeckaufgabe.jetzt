"use strict";
(() => {
  // <stdin>
  (() => {
    const GA_ID = "G-XXXXXXX";
    const banner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("cookie-accept");
    const declineButton = document.getElementById("cookie-decline");
    if (!banner) {
      console.error("Cookie banner element not found");
      return;
    }
    const loadGA = () => {
      if (!GA_ID) return;
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script1);
      const script2 = document.createElement("script");
      script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', { 'anonymize_ip': true });
    `;
      document.head.appendChild(script2);
    };
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      banner.style.display = "block";
    } else if (consent === "accepted") {
      loadGA();
    }
    if (acceptButton) {
      acceptButton.onclick = () => {
        localStorage.setItem("cookieConsent", "accepted");
        loadGA();
        banner.style.display = "none";
      };
    }
    if (declineButton) {
      declineButton.onclick = () => {
        localStorage.setItem("cookieConsent", "declined");
        banner.style.display = "none";
      };
    }
    s;
  })();
})();
