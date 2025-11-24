"use strict";(()=>{(()=>{let t="{{ .Site.Params.googleAnalyticsID }}",e=document.getElementById("cookie-banner"),n=document.getElementById("cookie-accept"),o=document.getElementById("cookie-decline");if(!e){console.error("Cookie banner element not found");return}let i=()=>{if(!t)return;let e=document.createElement("script");e.async=!0,e.src=`https://www.googletagmanager.com/gtag/js?id=${t}`,document.head.appendChild(e);let n=document.createElement("script");n.innerHTML=`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${t}', { 'anonymize_ip': true });
    `,document.head.appendChild(n)},a=localStorage.getItem("cookieConsent");a?a==="accepted"&&i():e.style.display="block",n&&(n.onclick=()=>{localStorage.setItem("cookieConsent","accepted"),i(),e.style.display="none"}),o&&(o.onclick=()=>{localStorage.setItem("cookieConsent","declined"),e.style.display="none"}),s})()})()