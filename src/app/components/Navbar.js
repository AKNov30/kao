// app/components/Navbar.js
"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#333", color: "#fff" }}>
      <div>
        <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: "1.5rem" }}>
          MyApp
        </Link>
      </div>
      <div>
        {session ? (
          <>
            <span style={{ marginRight: "1rem" }}>Welcome, {session.user.name}</span>
            <button onClick={handleLogout} style={{ padding: "0.5rem 1rem", background: "red", color: "#fff", border: "none", borderRadius: "5px" }}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/auth/login" style={{ color: "#fff", textDecoration: "none" }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}