import "./globals.css";

export const metadata = {
  title: "Next.js + React Three Fiber + Robot arm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
