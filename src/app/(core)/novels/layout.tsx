import Script from "next/script";
import { PropsWithChildren } from "react";

const NovelLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Script id="google-translate-init" strategy="afterInteractive" async>
        {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {pageLanguage: 'en', },
                'google_translate_element'
              );
            }
          `}
      </Script>
      <div id="google_translate_element" style={{ visibility: "hidden", position: "absolute", top: 0 }}></div>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  )
}

export default NovelLayout;
