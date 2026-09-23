'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  // Điều chỉnh chiều cao linh hoạt, tỉ lệ gốc tự động co giãn sắc nét
  const heightStyles = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
  }[size];

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] select-none ${className}`}
      title="BIN.STUDY - TIN ĐẦU RA DTU"
    >
      <div className={`relative ${heightStyles} w-auto aspect-[320/95]`}>
        <Image
          src="/logo-bin-study.svg"
          alt="BIN.STUDY - TIN ĐẦU RA DTU"
          width={280}
          height={84}
          priority
          className="h-full w-auto object-contain object-left"
        />
      </div>
    </Link>
  );
}