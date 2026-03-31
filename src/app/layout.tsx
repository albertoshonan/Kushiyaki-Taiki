import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "串焼き大紀 | 高級焼き鳥を身近に",
  description:
    "串焼き大紀 - 厳選された素材と職人の技が織りなす、至高の串焼き体験。高級焼き鳥を身近にお楽しみいただけます。",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@300;400;500&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var l=document.createElement('link');
              l.rel='stylesheet';
              l.href='https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@300;400;500&display=swap';
              document.head.appendChild(l);
            `,
          }}
        />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `if("scrollRestoration"in history)history.scrollRestoration="manual";window.scrollTo(0,0);`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
