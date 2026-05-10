// Import other TS files
import { initNavigation } from './components/navigation';
import { initAnimations } from "./components/animations";
import { initCalendly } from "./components/calendly";

// Type definitions
interface Section {
  id: string;
  title: string;
  visible: boolean;
}

class App {
  private sections: Section[] = [];
  
  constructor() {
    this.init();
  }
  
  private init(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.detectSections();
      initNavigation();
      initAnimations();
      initCalendly();
    });
  }
  
  private detectSections(): void {
    const sectionElements = document.querySelectorAll('section');
    
    sectionElements.forEach(section => {
      const id = section.id;
      if (id) {
        this.sections.push({
          id,
          title: section.querySelector('h1, h2')?.textContent || id,
          visible: false
        });
      }
    });
    
    console.log('Detected sections:', this.sections);
  }
  
  public getSections(): Section[] {
    return this.sections;
  }
}

// Initialize app
const app = new App();

// Export for potential use in browser console
declare global {
  interface Window {
    App: App;
  }
}

window.App = app;
