// components/SidebarVisibilityContext.js
"use client";
import { createContext, useContext, useState } from "react";

const SidebarVisibilityContext = createContext();

export function SidebarVisibilityProvider({ children }) {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <SidebarVisibilityContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </SidebarVisibilityContext.Provider>
  );
}

export function useSidebarVisibility() {
  return useContext(SidebarVisibilityContext);
}
