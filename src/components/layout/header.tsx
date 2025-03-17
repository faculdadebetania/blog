import Image from "next/image";
import Link from "next/link";
import { NavDesktop } from "./nav-desktop";
import NavMobile from "./nav-mobile";

export default function Header() {
  return (
    <header className="container flex justify-between items-center h-32 !py-8">
      <Link href="/" className="relative w-[160px] h-full">
        <Image
          priority
          fill
          src="/imagens/logo.png"
          alt="logo"
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
      </Link>
      <NavDesktop />
      <NavMobile />
    </header>
  );
}
