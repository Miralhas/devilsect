import { CommentsProvider } from "@/contexts/comments-context";
import Script from "next/script";
import { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const NovelLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <CommentsProvider>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {children}
        </AppRouterCacheProvider>
      </CommentsProvider>
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
