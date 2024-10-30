// app/components/Navbar.js
"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from 'next/image';
import rice from '@/public/image/rice.svg'
import logo from '@/public/image/logo.svg'
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Disclosure, Menu } from '@headlessui/react';
import { HiMenu, HiX, HiChevronDown, HiChevronUp } from 'react-icons/hi';

const navigation = [
  { name: 'รายการสินค้า', href: '/home' },
  { name: 'บิล', href: '#' },
  { name: 'บิลเสีย', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <Disclosure as="nav" className="bg-white-800 border-b border">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black-400 hover:bg-black-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {/* Logo Section */}
                <Link href="/home">
                  <Image src={logo} alt="Logo" width={100} className="mr-4" />
                </Link>
                <div className="hidden sm:flex space-x-4">
                  {session && navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className={classNames(
                        pathname === item.href ? 'bg-gray-900 text-white' : 'text-black-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {/* Dropdown Menu for "ตัวช่วยคีย์" */}
                  {session && 
                  <Menu as="div" className="relative">
                    <Menu.Button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="text-black-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                    >
                      ตัวช่วยคีย์
                      {isDropdownOpen ? <HiChevronUp className="ml-1" /> : <HiChevronDown className="ml-1" />}
                    </Menu.Button>
                    <Menu.Items className="absolute z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/helper/utils" className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}>
                            ชุดรวมเลข
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/helper/lak" className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}>
                            เลขลาก
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/helper/win" className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}>
                            เลขวิน
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* ตรวจสอบสถานะการล็อกอินก่อนแสดง dropdown */}
                {session && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 px-1">
                        <span className="sr-only">Open user menu</span>
                        <a className='text-white pe-1 pt-1'>{session.user.name}</a>
                        <Image
                          alt="Profile"
                          src={ rice }
                          className="h-8 w-8 rounded-full filter invert"
                        />
                      </Menu.Button>
                    </div>
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* แสดง admin-zone เฉพาะเมื่อ user เป็น admin */}
                      {session.user.role === 'admin' && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/admin" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              admin-zone
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      {session.user.role === 'admin' && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/auth/register" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              register
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={handleLogout} className={classNames(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700')}>
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          {/* Mobile view */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={classNames(
                    pathname === item.href ? 'bg-gray-900 text-white' : 'text-black-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {/* Dropdown Menu for "ตัวช่วยคีย์" (Mobile view) */}
              {session && (
                <Disclosure.Button as="div" className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-black-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium flex items-center w-full text-left"
                  >
                    ตัวช่วยคีย์
                    {isDropdownOpen ? <HiChevronUp className="ml-1" /> : <HiChevronDown className="ml-1" />}
                  </button>
                  {isDropdownOpen && (
                    <div className="mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <Link href="/helper/utils" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ชุดรวมเลข</Link>
                      <Link href="/helper/lak" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">เลขลาก</Link>
                      <Link href="/helper/win" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">เลขวิน</Link>
                    </div>
                  )}
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    // <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#333", color: "#fff" }}>
    //   <div>
    //     <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: "1.5rem" }}>
    //       MyApp
    //     </Link>
    //   </div>
    //   <div>
    //     {session ? (
    //       <>
    //         <span style={{ marginRight: "1rem" }}>Welcome, {session.user.name}</span>
    //         <button onClick={handleLogout} style={{ padding: "0.5rem 1rem", background: "red", color: "#fff", border: "none", borderRadius: "5px" }}>
    //           Logout
    //         </button>
    //       </>
    //     ) : (
    //       <Link href="/auth/login" style={{ color: "#fff", textDecoration: "none" }}>
    //         Login
    //       </Link>
    //     )}
    //   </div>
    // </nav>
  );
}