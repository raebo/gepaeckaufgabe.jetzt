(() => {
  // Hugo parameter injected at build time
  const GA_ID: string = "{{ .Site.Params.googleAnalyticsID }}";

  // Types
  const banner = document.getElementById("cookie-banner") as HTMLDivElement | null;
  const acceptButton = document.getElementById("cookie-accept") as HTMLButtonElement | null;
  const declineButton = document.getElementById("cookie-decline") as HTMLButtonElement | null;

  if (!banner) {
    console.error("Cookie banner element not found");
    return;
  }

  const loadGA = (): void => {
    if (!GA_ID) return;

    // Load GA script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script1);

    // Init GA
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', { 'anonymize_ip': true });
    `;
    document.head.appendChild(script2);
  };

  // Check stored consent state
  const consent = localStorage.getItem("cookieConsent");

  if (!consent) {
    banner.style.display = "block";
  } else if (consent === "accepted") {
    loadGA();
  }

  // Attach events
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
  }s
})();

