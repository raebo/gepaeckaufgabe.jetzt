"use strict";(()=>{(()=>{let t="{{ .Site.Params.googleAnalyticsID }}",e=document.getElementById("cookie-banner"),o=document.getElementById("cookie-accept"),c=document.getElementById("cookie-decline");if(!e){console.error("Cookie banner element not found");return}let a=()=>{if(!t)return;let n=document.createElement("script");n.async=!0,n.src=`https://www.googletagmanager.com/gtag/js?id=${t}`,document.head.appendChild(n);let i=document.createElement("script");i.innerHTML=`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${t}', { 'anonymize_ip': true });
    `,document.head.appendChild(i)},l=localStorage.getItem("cookieConsent");l?l==="accepted"&&a():e.style.display="block",o&&(o.onclick=()=>{localStorage.setItem("cookieConsent","accepted"),a(),e.style.display="none"}),c&&(c.onclick=()=>{localStorage.setItem("cookieConsent","declined"),e.style.display="none"}),s})();})();
