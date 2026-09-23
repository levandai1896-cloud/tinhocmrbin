'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  isHighlight?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'TRANG CHỦ', href: '/' },
  { name: 'KHÓA HỌC TIN', href: '/khoa-hoc-tin', isHighlight: true },
  { name: 'CỘNG ĐỒNG', href: '/cong-dong' },
  { name: 'ĐIỂM GDTC', href: '/tinh-the-duc' },
  { name: 'TÍNH GPA', href: '/tinh-gpa' },
  { name: 'TÀI LIỆU', href: '/tai-lieu' },
  { name: 'MẪU ĐƠN', href: '/mau-don' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d0d0e] border-b border-neutral-800/90 shadow-xl select-none">
      
      {/* =========================================================================
          TẦNG 1: LOGO CHÍNH GIỮA
         ========================================================================= */}
      <div className="w-full border-b border-neutral-900/90 py-1.5 sm:py-2 px-4 relative flex items-center justify-center">
        
        {/* Nút Hamburger cho Mobile */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden absolute left-4 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* LOGO GỐC */}
        <Link 
          href="/" 
          scroll={false}
          prefetch={false}
          className="inline-flex items-center justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
          title="BIN.STUDY - TIN ĐẦU RA DTU"
        >
          <div className="relative h-14 sm:h-16 md:h-[72px] w-auto aspect-[520/150]">
            <Image
              src="/logo-bin-study.svg"
              alt="BIN.STUDY - TIN ĐẦU RA DTU"
              width={520}
              height={150}
              priority
              className="h-full w-auto object-contain"
            />
          </div>
        </Link>
      </div>

      {/* =========================================================================
          TẦNG 2: MENU ĐIỀU HƯỚNG CĂN GIỮA (DESKTOP)
         ========================================================================= */}
      <nav className="hidden md:flex items-center justify-center gap-5 lg:gap-7 h-11 px-4 bg-[#141416]">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              scroll={false}
              prefetch={false}
              className={`flex items-center gap-1.5 text-[13px] font-black tracking-wide uppercase transition-colors duration-150 relative py-2.5 cursor-pointer ${
                isActive
                  ? 'text-[#e0524a]'
                  : 'text-neutral-200 hover:text-[#e0524a]'
              }`}
            >
              <span>{item.name}</span>

              {item.isHighlight && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              )}

              {isActive && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#e0524a]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* =========================================================================
          DRAWER MOBILE MENU
         ========================================================================= */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bottom-0 bg-[#0d0d0e]/98 backdrop-blur-xl border-t border-neutral-800 z-50 flex flex-col justify-between p-5 animate-in fade-in duration-200">
          <div className="space-y-1.5 pt-2">
            <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest px-3 mb-2">
              Danh mục điều hướng
            </p>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={false}
                  prefetch={false}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-black transition-all ${
                    isActive
                      ? 'bg-[#b23b35] text-white'
                      : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.name}</span>
                    {item.isHighlight && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    )}
                  </div>
                  <ChevronRight size={16} className={isActive ? 'text-white' : 'text-neutral-600'} />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-neutral-800 text-center">
            <p className="text-xs text-neutral-400 font-bold tracking-wider">
              BIN.STUDY • TIN ĐẦU RA DTU
            </p>
          </div>
        </div>
      )}
    </header>
  );
}