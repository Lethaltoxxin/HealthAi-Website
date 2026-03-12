import ClientLayout from "./ClientLayout";
import "./globals.css";

export const metadata = {
  title: "Health AI - The Future of Wellness",
  description: "Next generation mobile-first health application.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
