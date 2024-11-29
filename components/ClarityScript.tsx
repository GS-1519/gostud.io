'use client';

declare global {
  interface Window {
    clarity: any;
    [key: string]: any;  // Allow string indexing
  }
}

interface ClarityWindow extends Window {
  clarity: {
    q: any[];
    (...args: any[]): void;
  };
}

export default function ClarityScript() {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    (function(c: ClarityWindow, l: Document, a: string, r: string, i: string) {
      if (!c[a]) {
        c[a] = function() {
          (c[a].q = c[a].q || []).push(arguments);
        };
      }
      
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + i;
      const y = l.getElementsByTagName(r)[0];
      if (y && y.parentNode) {
        y.parentNode.insertBefore(t, y);
      }
    })(window as ClarityWindow, document, "clarity", "script", "oy3edackba");
  }
  return null;
}