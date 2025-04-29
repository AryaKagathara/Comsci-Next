import { Html, Head, Main, NextScript } from 'next/document';
// import Script from 'next/script'; // This import is not strictly necessary if you only use standard <script> tags in _document.js

export default function Document() {

  return (
    <Html lang="en">
      <Head>
        {/* Google tag (gtag.js) scripts */}
        {/* This script loads the Google tag manager library asynchronously */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-SK66D59Z07`}
        />
        {/* This script initializes dataLayer and sends initial page view */}
        {/* Use dangerouslySetInnerHTML because this is an inline script block */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-SK66D59Z07');
            `,
          }}
        />
        {/* End Google tag (gtag.js) scripts */}

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}