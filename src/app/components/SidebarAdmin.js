// @/components/Layout/Sidebar.js
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { SlHome } from "react-icons/sl";
import { CgAddR, CgUser } from "react-icons/cg";

import rice from "@/public/image/rice.svg";

export default function SidebarAdmin({ show, setter }) {
  const pathname = usePathname();

  const className =
    "bg-white border-r w-[250px] h-screen transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  const MenuItem = ({ icon, name, route }) => {
    const colorClass =
      pathname === route ? "text-black" : "text-black hover:text-black/50";

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div>{name}</div>
      </Link>
    );
  };

  const ModalOverlay = () => (
    <div
      className="flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30"
      onClick={() => setter((oldVal) => !oldVal)}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="p-10 mb-3 flex justify-self-center border-b-2">
          <Link href="/">
            <Image src={rice} alt="Company Logo" className="w-auto h-28" />
          </Link>
        </div>
        <div className="flex flex-col space-y-1">
          <MenuItem name="Home" route="/admin" icon={<SlHome />} />
          <MenuItem name="AddProduct" route="/admin/addproduct" icon={<CgAddR />} />
          <MenuItem name="ListUser" route="/list-user" icon={<CgUser />} />
        </div>
      </div>
      {show && <ModalOverlay />}
    </>
  );
}
