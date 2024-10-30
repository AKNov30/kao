//app/layout.js
import './globals.css'
import ClientSessionProvider from "./components/ClientSessionProvider";
import Navbar from "./components/Navbar";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ClientSessionProvider>
        <Navbar />
        <main className='pt-16'>{children}</main>
      </ClientSessionProvider>
      </body>
    </html>
  );
}