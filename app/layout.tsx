import type { Metadata } from "next";
import "./theme.css";
import "./hover.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ElementPay Merchant Console",
  description: "Merchant & Developer Console for ElementPay — collect, convert and pay out across Africa and beyond.",
  icons: { icon: "/elementpay-logo.png" },
};

const themeBoot = `try{var t=localStorage.getItem("ep-console-theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
