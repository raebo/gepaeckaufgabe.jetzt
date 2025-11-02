declare module 'hugo' {
  interface Page {
    Title: string;
    RelPermalink: string;
    Date: string;
    Params: Record<string, any>;
  }
  
  interface Site {
    Title: string;
    Params: Record<string, any>;
  }
}

// Global Hugo variables
declare const .Site: any;
declare const .Page: any;
