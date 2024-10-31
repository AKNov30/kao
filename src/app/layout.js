//app/layout.js
"use client";
import "./globals.css";
import ClientSessionProvider from "./components/ClientSessionProvider";
import Navbar from "./components/appbar/Navbar";
import Sidebar from "./components/appbar/Sidebar";
import { SidebarVisibilityProvider, useSidebarVisibility } from "./components/appbar/SidebarVisibilityContext";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>
          <SidebarVisibilityProvider>
            <Navbar />
            <LayoutContent>{children}</LayoutContent>
          </SidebarVisibilityProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children }) {
  const pathname = usePathname();
  const shouldShowSidebar = pathname !== "/auth/login";
  const { showSidebar } = useSidebarVisibility();
  const displaySidebar = showSidebar && shouldShowSidebar;

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <main className={`pt-16 flex-1 ${displaySidebar ? 'ml-[20rem]' : ''}`}>
        {children}
      </main>
    </div>
  );
}
