// src/app/404.js
"use client";

import { useEffect } from "react";
import { useSidebarVisibility } from "./components/appbar/SidebarVisibilityContext";
export default function NotFound() {
  const { setShowSidebar } = useSidebarVisibility();
  useEffect(() => {
    setShowSidebar(false); // ซ่อน Sidebar เมื่อหน้า 404 ถูกโหลด
    return () => setShowSidebar(true); // แสดง Sidebar อีกครั้งเมื่อออกจากหน้า 404
  }, [setShowSidebar]);
    return (
      <main className="grid h-screen-minus-navbar place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            ไม่มีนะ จะไปไหน กลับไป
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/home"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
    );
  }
