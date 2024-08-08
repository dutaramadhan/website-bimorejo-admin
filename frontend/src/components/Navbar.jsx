import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../public/LogoKKN.svg";

export default function Navbar() {
  return (
    <div className="fixed z-[100] flex h-[70px] w-full justify-between bg-blue-500 text-[#EAE0CC]">
      <div className="xl:ml-14 ml-10 flex items-center py-4 px-[28px] mobile:mx-0 mobile:px-10">
        <Link href="/">
          <Image
            src={Logo}
            alt="Logo"
            className="hover:cursor-pointer"
            width={50}
            height={50}
          />
        </Link>
        <div className="px-3 flex items-center gap-2">
          <h1 className="text-black text-[18px] md:text-[25px] font-bold">
            Halaman Admin Website Desa Bimorejo
          </h1>
        </div>
      </div>
    </div>
  );
};
