"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "À propos", href: "/about" },
    { name: "Compétences", href: "/competences" },
    { name: "Projets", href: "/projets" },
    { name: "Expérience", href: "/experience" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700 fixed top-0 left-0 right-0 z-[999]">
      <div className="container mx-auto px-4 py-4 md:px-6">
        <nav className="flex items-center justify-between">
          <Link
            href="/about"
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            ASY.dev
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-400 hover:text-white md:hidden"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`uppercase text-sm tracking-wider relative transition-colors duration-300 cursor-pointer
                  before:content-[''] before:absolute before:bottom-[-4px] before:left-0 before:w-full before:h-[2px]
                  before:bg-blue-400 before:origin-right before:scale-x-0 before:transition-transform before:duration-300
                  hover:before:origin-left hover:before:scale-x-100
                  ${
                    pathname === item.href
                      ? "text-blue-400 before:scale-x-100"
                      : "text-slate-300 hover:text-white"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="absolute top-[73px] left-0 right-0 bg-slate-900/95 border-b border-slate-700 md:hidden">
              <div className="flex flex-col items-center py-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm uppercase tracking-wider px-4 py-2 w-full text-center transition-colors
                      ${pathname === item.href ? "text-blue-400" : "text-slate-300 hover:text-white"}`}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* CV Button in mobile menu */}
                <Button
                  variant="cv"
                  size="sm"
                  className="mt-2"
                  asChild
                >
                  <a href="/cv/cv.pdf" download>
                    <FiDownload className="w-4 h-4 mr-2" />
                    CV
                  </a>
                </Button>
              </div>
            </div>
          )}

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="md:hidden fixed inset-0 top-[73px] bg-slate-900/95 backdrop-blur-sm z-[998]">
              <div className="flex flex-col items-center py-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm uppercase tracking-wider px-4 py-2 w-full text-center transition-colors
                      ${pathname === item.href ? "text-blue-400" : "text-slate-300 hover:text-white"}`}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* CV Button in mobile menu */}
                <Button
                  variant="cv"
                  size="sm"
                  className="mt-2"
                  asChild
                >
                  <a href="/cv/cv.pdf" download>
                    <FiDownload className="w-4 h-4 mr-2" />
                    CV
                  </a>
                </Button>
              </div>
            </div>
          )}

          {/* Desktop CV Button */}
          <Button variant="cv" size="sm" className="hidden md:inline-flex" asChild>
            <a href="/cv/cv.pdf" download>
              <FiDownload className="w-4 h-4 mr-2" />
              CV
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
