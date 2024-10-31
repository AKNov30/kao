//app/layout.js
"use client";
import "./globals.css";
import ClientSessionProvider from "./components/ClientSessionProvider";
import Navbar from "./components/appbar/Navbar";
import Sidebar from "./components/appbar/Sidebar";
import { SidebarVisibilityProvider, useSidebarVisibility } from "./components/appbar/SidebarVisibilityContext";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

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
  // const shouldShowSidebar = pathname !== "/auth/login";
  const hideSidebar = pathname == "/auth/login";
  const { showSidebar } = useSidebarVisibility();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  // const displaySidebar = showSidebar && shouldShowSidebar;

  return (
    <div className="flex">
      <SidebarVisibilityProvider>
      {showSidebar && <Sidebar />}
      <main className={`pt-16 flex-1 ${hideSidebar || !isLoggedIn ? 'ml-0' : 'sm:ml-[20rem] ml-0'}`}>
      {/* <main className={`pt-16 flex-1 sm:ml-[20rem] ml-0`}> */}
        {children}
      </main>
      </SidebarVisibilityProvider>
    </div>
  );
}
