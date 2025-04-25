import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* --- Google Tag Manager --- */}
        {/* Placed as high in <head> as possible */}
        {/* Make sure GTM_ID is defined before rendering */}
        {GTM_ID && (
          <Script
            id="google-tag-manager"
            strategy="beforeInteractive" // Load GTM early
          >
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {/* --- End Google Tag Manager --- */}

        {/* Other head elements (fonts, meta tags, etc. loaded by Next) */}
      </Head>
      <body>
        {/* --- Google Tag Manager (noscript) --- */}
        {/* Placed immediately after the opening <body> tag */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
        )}
        {/* --- End Google Tag Manager (noscript) --- */}

        {/* Main renders your _app.js and page content */}
        <Main />
        {/* NextScript renders Next.js specific scripts */}
        <NextScript />
      </body>
    </Html>
  );
}
