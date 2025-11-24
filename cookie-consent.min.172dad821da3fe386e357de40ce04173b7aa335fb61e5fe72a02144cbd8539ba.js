"use strict";(()=>{(()=>{const t="G-XXXXXXX",e=document.getElementById("cookie-banner"),n=document.getElementById("cookie-accept"),s=document.getElementById("cookie-decline");if(!e){console.error("Cookie banner element not found");return}const o=()=>{if(!t)return;const e=document.createElement("script");e.async=!0,e.src=`https://www.googletagmanager.com/gtag/js?id=${t}`,document.head.appendChild(e);const n=document.createElement("script");n.innerHTML=`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${t}', { 'anonymize_ip': true });
    `,document.head.appendChild(n)},i=localStorage.getItem("cookieConsent");i?i==="accepted"&&o():e.style.display="block",n&&(n.onclick=()=>{localStorage.setItem("cookieConsent","accepted"),o(),e.style.display="none"}),s&&(s.onclick=()=>{localStorage.setItem("cookieConsent","declined"),e.style.display="none"})})()})()