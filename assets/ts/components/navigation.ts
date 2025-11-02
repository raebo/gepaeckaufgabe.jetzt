export interface NavConfig {
  smoothScroll: boolean;
  highlightActive: boolean;
  offset: number;
}

export class Navigation {
  private config: NavConfig;
  private navLinks: NodeListOf<HTMLAnchorElement>;
  
  constructor(config: Partial<NavConfig> = {}) {
    this.config = {
      smoothScroll: true,
      highlightActive: true,
      offset: 100,
      ...config
    };
    
    this.navLinks = document.querySelectorAll('nav a[href^="#"]');
  }
  
  public init(): void {
    if (this.config.smoothScroll) {
      this.initSmoothScroll();
    }
    
    if (this.config.highlightActive) {
      this.initActiveSectionTracking();
    }
  }
  
  private initSmoothScroll(): void {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e: Event) => {
        e.preventDefault();
        this.scrollToSection(link.hash);
      });
    });
  }
  
  private scrollToSection(sectionId: string): void {
    const target = document.querySelector(sectionId);
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - this.config.offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth' as ScrollBehavior
    });
  }
  
  private initActiveSectionTracking(): void {
    window.addEventListener('scroll', this.throttle(() => {
      this.updateActiveLink();
    }, 100));
  }
  
  private updateActiveLink(): void {
    const scrollPosition = window.scrollY + this.config.offset;
    
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      const section = document.querySelector(link.hash);
      
      if (section) {
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        const sectionBottom = sectionTop + section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          link.classList.add('active');
        }
      }
    });
  }
  
  private throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
    let inThrottle: boolean;
    return ((...args: any[]) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  }
}

export function initNavigation(config?: Partial<NavConfig>): Navigation {
  const navigation = new Navigation(config);
  navigation.init();
  return navigation;
}
