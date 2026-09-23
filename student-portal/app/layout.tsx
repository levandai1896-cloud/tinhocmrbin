import { Be_Vietnam_Pro } from 'next/font/google';
import Navbar from '@/components/Navbar';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-be-vietnam-pro',
});

export const metadata = {
  title: 'Cổng Học Tập & Tiện Ích Sinh Viên',
  description: 'Khoa Công nghệ thông tin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnamPro.className}>
      <body className="bg-[#edeef2] text-neutral-900 min-h-screen selection:bg-[#b23b35] selection:text-white antialiased flex flex-col">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  );
}