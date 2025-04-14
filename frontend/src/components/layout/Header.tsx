"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Close on ESC or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setQuery("");
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    // Chỉ thêm event listener click khi search đang mở
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <>
      <header className="border-b shadow-sm sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/images/heroes/web-logo.png" 
                alt="Learn AWS & DevOps" 
                className="h-12 mr-2"
              />
              <span className="text-xl font-bold tracking-tight">Learn AWS & DevOps</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/chat" className="hover:text-blue-600">AI Assistant</Link>
            <Link href="/aws" className="hover:text-blue-600">AWS</Link>
            <Link href="/kubernetes" className="hover:text-blue-600">Kubernetes</Link>
            <Link href="/terraform" className="hover:text-blue-600">Terraform</Link>
            <Link href="/devops" className="hover:text-blue-600">DevOps</Link>
          </nav>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-gray-600 hover:text-blue-600 ml-4"
          >
            <Search size={20} />
          </button>
        </div>
      </header>

      {/* Overlay Search */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-16 z-50">
          <div className="relative w-full max-w-md px-6" ref={searchRef}>
            <div className="relative w-full rounded-full bg-white shadow-md px-4 py-2 flex items-center">
              {/* Icon search bên trái */}
              <Search className="h-5 w-5 text-gray-500 mr-2" />

              {/* Input */}
              <input
                type="text"
                placeholder="Search"
                className="flex-grow focus:outline-none text-sm text-gray-700 bg-transparent"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />

              {/* Nút X */}
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setQuery("");
                }}
                className="ml-2 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}