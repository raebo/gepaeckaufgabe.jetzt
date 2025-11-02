export interface AnimationConfig {
  threshold: number;
  rootMargin: string;
}

export class ScrollAnimator {
  private observer: IntersectionObserver;
  private config: AnimationConfig;
  
  constructor(config: Partial<AnimationConfig> = {}) {
    this.config = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...config
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.config
    );
  }
  
  public observeElements(selector: string = '.animate-on-scroll'): void {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      // Set initial state
      element.classList.add('animate-ready');
      this.observer.observe(element);
    });
  }
  
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-active');
        // Optional: unobserve after animation
        // this.observer.unobserve(entry.target);
      } else {
        entry.target.classList.remove('animate-active');
      }
    });
  }
  
  public disconnect(): void {
    this.observer.disconnect();
  }
}

export function initAnimations(config?: Partial<AnimationConfig>): ScrollAnimator {
  const animator = new ScrollAnimator(config);
  animator.observeElements();
  return animator;
}
