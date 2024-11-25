'use client'

import { useEffect } from 'react'

export default function GoogleTagManager() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const script = document.createElement('script')
      script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WNXH9WQW');`
      document.head.appendChild(script)
    }
  }, [])

  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <noscript>
      <iframe 
        src="https://www.googletagmanager.com/ns.html?id=GTM-WNXH9WQW"
        height="0" 
        width="0" 
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
} 