import Script from 'next/script';

const GoogleAna = () => {
  return (
    <>
      <Script
        strategy='afterInteractive'
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-7TC5NJ1EGS'
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', 'G-7TC5NJ1EGS');
        `}
      </Script>
    </>
  );
}

export default GoogleAna;
