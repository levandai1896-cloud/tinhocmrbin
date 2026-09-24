'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
    // Dùng chung max-w-7xl và px-4 sm:px-6 giống hệt thẻ section của khối Hero bên dưới để đồng bộ độ rộng hoàn toàn
    <header className="sticky top-0 inset-x-0 z-50 w-full py-3 flex justify-center pointer-events-none bg-[#f5f5f7]">
      <div className="w-full max-w-7xl px-4 sm:px-6 flex justify-center">
        
        {/* THANH NAVBAR ĐẢO NỔI KHỚP TUYỆT ĐỐI */}
        <div 
          className="pointer-events-auto w-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#e5e5ea]/80 rounded-full px-6 sm:px-8 h-16 flex items-center justify-between transition-all"
          style={{
            fontFamily: "'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            letterSpacing: '-0.011em',
          }}
        >
          
          {/* LOGO THƯƠNG HIỆU */}
          <Link 
            href="/" 
            scroll={false}
            prefetch={false}
            className="flex items-center gap-1.5 transition-transform hover:opacity-85 active:scale-95 shrink-0 pl-1"
          >
            <span className="text-xl font-black tracking-tight text-[#1d1d1f]">
              bin<span className="text-[#b23b35]">.</span>study
            </span>
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={false}
                  prefetch={false}
                  className={`text-[14px] font-semibold tracking-tight transition-colors relative py-2 ${
                    isActive
                      ? 'text-[#1d1d1f]'
                      : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.isHighlight && (
                    <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* NÚT ĐĂNG KÝ HỌC & HAMBURGER */}
          <div className="flex items-center gap-3 pr-1">
            <Link
              href="https://zalo.me/0934304070"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-[13px] font-bold transition shadow-sm hover:scale-[1.02]"
            >
              Đăng ký học
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#1d1d1f] hover:text-[#2c65f6] rounded-full hover:bg-neutral-100 transition cursor-pointer"
              aria-label="Mở menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

      </div>

      {/* MENU MOBILE XỔ XUỐNG */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 bg-white/98 backdrop-blur-2xl border border-[#e5e5ea] rounded-3xl z-50 flex flex-col justify-between p-6 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-auto">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#86868b] tracking-wider uppercase px-3 mb-2">
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
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-[15px] transition-all ${
                    isActive
                      ? 'bg-neutral-100 text-[#1d1d1f] font-bold border-l-4 border-l-[#1d1d1f]'
                      : 'text-[#48484a] hover:bg-[#f5f5f7] font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span>{item.name}</span>
                    {item.isHighlight && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </div>
                  <ChevronRight size={17} className={isActive ? 'text-[#1d1d1f]' : 'text-[#86868b]'} />
                </Link>
              );
            })}
          </div>

          <div className="pt-5 border-t border-[#e5e5ea] text-center mt-4">
            <p className="text-xs text-[#86868b] font-medium tracking-wider">
              BIN.STUDY • TIN ĐẦU RA DTU
            </p>
          </div>
        </div>
      )}
    </header>
  );
}