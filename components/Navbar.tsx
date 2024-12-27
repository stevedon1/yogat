
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaHome } from 'react-icons/fa';


export default function Navbar() {
  return (
    <nav className="p-2 w-full bg-slate-100 text-white shadow-md sticky top-0 z-50">
        <div className="flex justify-between">
          <Link href='/'>
          <Image
            src='/logo.jpg'
            alt='logo'
            width={70}
            height={15}
            className=" rounded-md shadow-lg"
          />
          </Link>
          <Link href='/'>
          <FaHome className="text-4xl  text-gray-900 hover:cursor-pointer hover:text-indigo-500 transition" />
          </Link>

        </div>
    </nav>
  )
}
