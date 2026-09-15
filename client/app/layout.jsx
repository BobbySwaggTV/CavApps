import "./globals.css";

export const metadata = {
  title: "15th MEU Apps",
  description: "NextJS based apps for 15th MEU Gaming",
  robots: {
    index: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body /*className={inter.className} <--- Blocked since tailwind is not in use*/
      >
        {children}
      </body>
    </html>
  );
}
