//app/layout.js
import ClientSessionProvider from "./components/ClientSessionProvider";
import Navbar from "./components/Navbar";
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ClientSessionProvider>
        <Navbar />
        <main>{children}</main>
      </ClientSessionProvider>
      </body>
    </html>
  );
}