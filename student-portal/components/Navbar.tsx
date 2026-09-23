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
  { name: 'Trang Chủ', href: '/' },
  { name: 'Khóa Học Tin', href: '/khoa-hoc-tin', isHighlight: true },
  { name: 'Cộng Đồng', href: '/cong-dong' },
  { name: 'Điểm GDTC', href: '/tinh-the-duc' },
  { name: 'Tính GPA', href: '/tinh-gpa' },
  { name: 'Tài Liệu', href: '/tai-lieu' },
  { name: 'Mẫu Đơn', href: '/mau-don' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Tự động đóng menu khi bấm chuyển trang
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Khóa cuộn trang khi menu mobile đang mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header 
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#e5e5ea] shadow-[0_2px_12px_rgba(0,0,0,0.03)] select-none"
      style={{
        fontFamily: "'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        letterSpacing: '-0.011em',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between md:justify-center">
        
        {/* LOGO (TRÊN MOBILE BÊN TRÁI, TRÊN DESKTOP CĂN CÙNG MENU) */}
        <div className="flex items-center gap-4 sm:gap-5">
          <Link 
            href="/" 
            scroll={false}
            prefetch={false}
            className="flex items-center transition-transform hover:opacity-85 active:scale-95 shrink-0"
            title="Trang chủ"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
              <Image
                src="/logo-bin-study.svg"
                alt="Logo"
                width={40}
                height={40}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* DÀN MENU CHO MÁY TÍNH (DESKTOP) */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={false}
                  prefetch={false}
                  className={`flex items-center gap-1.5 text-[15px] tracking-tight transition-colors relative py-5 cursor-pointer ${
                    isActive
                      ? 'text-[#1d1d1f] font-bold'
                      : 'text-[#515154] hover:text-[#1d1d1f] font-semibold'
                  }`}
                >
                  <span>{item.name}</span>

                  {item.isHighlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
                  )}

                  {/* THANH CHỈ BÁO GRADIENT DƯỚI ĐÁY */}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-[#2c65f6] via-[#a844f2] to-[#e44d32] rounded-full shadow-[0_2px_8px_rgba(168,68,242,0.35)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* NÚT HAMBURGER BÊN PHẢI TRÊN MOBILE */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#1d1d1f] hover:text-[#2c65f6] rounded-xl hover:bg-neutral-100 transition cursor-pointer"
          aria-label="Mở menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* =========================================================================
          DRAWER / MENU XỔ XUỐNG CHO MOBILE
          (TỰ ĐỘNG KHỚP CHIỀU CAO MÀN HÌNH ĐIỆN THOẠI, CUỘN ĐƯỢC 100%, KHÔNG LO BỊ CHE KHUẤT)
         ========================================================================= */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] bg-white/98 backdrop-blur-2xl border-t border-[#e5e5ea] z-50 flex flex-col justify-between overflow-y-auto px-5 py-6 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#86868b] tracking-wider uppercase px-3 mb-3">
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
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-[16px] transition-all ${
                    isActive
                      ? 'bg-neutral-100 text-[#1d1d1f] font-bold border-l-4 border-l-[#a844f2] shadow-sm'
                      : 'text-[#48484a] hover:bg-[#f5f5f7] font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span>{item.name}</span>
                    {item.isHighlight && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </div>
                  <ChevronRight size={18} className={isActive ? 'text-[#1d1d1f]' : 'text-[#86868b]'} />
                </Link>
              );
            })}
          </div>

          <div className="pt-6 pb-2 border-t border-[#e5e5ea] text-center mt-6">
            <p className="text-xs text-[#86868b] font-medium tracking-wider">
              BIN.STUDY • TIN ĐẦU RA DTU
            </p>
          </div>
        </div>
      )}
    </header>
  );
}