'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 shadow-2xl">
      {/* TẦNG 1: Logo căn giữa, Nút Vàng full mép phải */}
      <div className="w-full bg-[#050505] h-14 sm:h-16 flex items-center justify-between border-b border-neutral-900 relative">
        <div className="w-24 sm:w-60 pl-6 hidden lg:flex items-center text-xs text-neutral-500 font-medium">
          <span>HỆ THỐNG ĐÀO TẠO SINH VIÊN DTU</span>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 text-center select-none py-1">
          <Link href="/" className="inline-flex flex-col items-center leading-none group">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#e5a922] uppercase">
              TIN HỌC ĐẦU RA
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white group-hover:text-[#e5a922] transition-colors">
              MR.BIN DTU
            </span>
          </Link>
        </div>

        <div className="flex items-center h-full ml-auto">
          <Link 
            href="/khoa-hoc-tin"
            className="bg-[#e5a922] hover:bg-[#d69b18] text-black font-black text-sm uppercase tracking-wider px-6 sm:px-9 h-full flex items-center justify-center transition-colors"
          >
            HỌC NGAY
          </Link>
        </div>
      </div>

      {/* TẦNG 2: Size chữ chuẩn ảnh 1 (text-base, font-extrabold, uppercase) */}
      <nav className="w-full bg-[#111215] h-12 flex items-center justify-center border-b border-neutral-800/90 px-4 overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-6 sm:space-x-10 text-sm sm:text-base font-extrabold uppercase tracking-wide text-neutral-200 whitespace-nowrap">
          <Link href="/" className="text-[#e5a922] transition-colors">Trang Chủ</Link>
          <Link href="/khoa-hoc-tin" className="hover:text-[#e5a922] transition-colors">Khóa Học Tin</Link>
          <Link href="/cong-dong" className="hover:text-[#e5a922] transition-colors">Cộng Đồng</Link>
          <Link href="/tinh-the-duc" className="hover:text-[#e5a922] transition-colors">Điểm GDTC</Link>
          <Link href="/tinh-gpa" className="hover:text-[#e5a922] transition-colors">Tính GPA</Link>
          <Link href="/tai-lieu" className="hover:text-[#e5a922] transition-colors">Tài Liệu</Link>
          <Link href="/mau-don" className="hover:text-[#e5a922] transition-colors">Mẫu Đơn</Link>
        </div>
      </nav>
    </header>
  );
}