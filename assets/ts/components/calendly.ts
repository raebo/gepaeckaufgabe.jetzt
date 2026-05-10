// Type declarations for external globals
declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
    };
    gtag: (
      command: string,
      eventName: string,
      params?: Record<string, string>
    ) => void;
  }
}

const CALENDLY_URL =
  'https://calendly.com/julia_coachin/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=92874c';

function trackEvent(eventName: string, params: Record<string, string>): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

function openWidget(): void {
  if (typeof window.Calendly === 'undefined') {
    console.warn('Calendly script not loaded yet.');
    return;
  }

  window.Calendly.initPopupWidget({ url: CALENDLY_URL });
}

function handleCtaParam(): void {
  const params = new URLSearchParams(window.location.search);
  if (params.get('cta') !== 'calendly') return;

  trackEvent('calendly_auto_open', {
    event_category: 'engagement',
    event_label: 'cta_param',
    source: document.referrer || 'direct',
  });

  openWidget();
}

function initBookingTracking(): void {
  window.addEventListener('message', (e: MessageEvent) => {
    if (e.data?.event === 'calendly.event_scheduled') {
      trackEvent('calendly_booking_completed', {
        event_category: 'conversion',
        event_label: 'appointment_booked',
      });
    }
  });
}

export function initCalendly(): void {
  handleCtaParam();
  initBookingTracking();
}
