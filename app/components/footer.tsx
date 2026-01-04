import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.png";
import { Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = [
  { label: "Link 1", href: "#" },
  { label: "Link 2", href: "#" },
  { label: "Link 3", href: "#" },
  { label: "Link 4", href: "#" },
  { label: "Link 5", href: "#" },
  { label: "Link 6", href: "#" },
  { label: "Link 7", href: "#" },
  { label: "Link 8", href: "#" },
  { label: "Link 9", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white">
      <div className="mx-auto max-w-(--max-layout) px-6 py-6">
        <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-4">
          <Link href="/" className="shrink-0 ml-6">
            <Image src={logo} alt="Logo" width={96} height={32} />
          </Link>

          <p className="flex-1 text-center text-xs md:text-sm lg:text-base">
            © 2025 Buddy Inc.
          </p>

          <div className="flex items-center gap-4 shrink-0 mr-6">
            <Link href="https://www.youtube.com" target="_blank">
              <Youtube size={24} />
            </Link>
            <Link href="https://www.twitter.com" target="_blank">
              <Twitter size={24} />
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              <Instagram size={24} />
            </Link>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <ul className="grid grid-cols-3 gap-x-10 gap-y-3 text-center text-xs md:text-sm lg:text-base">
            {footerLinks.map((link) => (
              <li key={link.label} className="sm:mx-12 md:mx-28">
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
