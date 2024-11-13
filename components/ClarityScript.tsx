'use client'

import { useEffect } from 'react';

export default function ClarityScript() {
  useEffect(() => {
    // Only run in production and client-side
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "oy3edackba");
    }
  }, []);

  return null;
} 