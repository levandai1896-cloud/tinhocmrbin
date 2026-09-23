import Link from 'next/link';
import { 
  Laptop,
  Users,
  Dumbbell, 
  Calculator, 
  FolderDown, 
  FileCheck2, 
  ArrowRight,
  Play,
  ChevronRight
} from 'lucide-react';
import { getNotifications } from '@/data/notifications'; // <-- Gọi hàm lấy từ Google Sheet

interface FeatureCard {
  title: string;
  badge: string;
  description: string;
  icon: any;
  href: string;
  btnText: string;
  isSpecial?: boolean;
}

const FEATURES: FeatureCard[] = [
  {
    title: 'Khóa Học Tin Học',
    badge: 'Khảo sát & Chuẩn đầu ra',
    description: 'Lộ trình ôn thi tin học khảo sát cấp tốc, mẹo thực chiến Word - Excel khóa luận và hỗ trợ 1:1 suốt khóa học.',
    icon: Laptop,
    href: '/khoa-hoc-tin',
    btnText: 'Xem khóa học',
    isSpecial: true,
  },
  {
    title: 'Cộng Đồng Tốt Nghiệp',
    badge: 'K28 - K32',
    description: 'Không gian kết nối sinh viên theo từng khóa, quét mã QR tham gia nhóm Zalo tư vấn đồ án và thủ tục nhận bằng.',
    icon: Users,
    href: '/cong-dong',
    btnText: 'Vào cộng đồng',
  },
  {
    title: 'Tính Điểm Thể Dục',
    badge: 'Công cụ GDTC',
    description: 'Quy đổi điểm 3 học phần GDTC sang thang điểm 4.0 và kiểm tra điều kiện đạt chuẩn đầu ra nhanh chóng.',
    icon: Dumbbell,
    href: '/diem-gdtc',
    btnText: 'Mở công cụ',
  },
  {
    title: 'Tính GPA Tích Lũy',
    badge: 'Thang điểm 4.0',
    description: 'Quản lý điểm số các môn học theo tín chỉ, tính toán chính xác điểm trung bình học kỳ và dự đoán xếp loại tốt nghiệp.',
    icon: Calculator,
    href: '/tinh-diem',
    btnText: 'Mở công cụ',
  },
  {
    title: 'Kho Học Liệu & Tài Liệu',
    badge: 'Học liệu Drive',
    description: 'Tổng hợp giáo trình, tài liệu ôn tập, đề thi mẫu và biểu mẫu khảo sát ý kiến dành riêng cho sinh viên.',
    icon: FolderDown,
    href: '/tai-lieu',
    btnText: 'Khám phá ngay',
  },
  {
    title: 'Kho Biểu Mẫu & Đơn Từ',
    badge: '22 Mẫu đơn chuẩn',
    description: 'Tra cứu và tải trực tiếp các mẫu đơn xin chuyển ngành, hoãn thi, phúc khảo điểm, miễn nghĩa vụ quân sự.',
    icon: FileCheck2,
    href: '/mau-don',
    btnText: 'Tải biểu mẫu',
  },
];

export default async function HomePage() {
  // Lấy dữ liệu trực tiếp từ Google Sheet và cắt lấy 3 tin mới nhất
  const notifications = await getNotifications();
  const latestNews = notifications.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#07080b] text-neutral-200 font-sans selection:bg-[#b23b35] selection:text-white">
      
      {/* 1. NỬA TRÊN VÙNG ĐEN */}
      <section className="relative w-full pt-8 pb-24 sm:pb-32 px-4 overflow-hidden flex flex-col items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 filter blur-[1px] pointer-events-none scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080b]/85 via-[#07080b]/75 to-[#07080b] pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
          <div className="text-center space-y-1 mb-8 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight uppercase text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              CỔNG THÔNG TIN HỌC TẬP
            </h1>
            <p className="text-lg sm:text-2xl font-black uppercase text-[#ff4d4f] tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              SINH VIÊN DTU
            </p>
            <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest pt-0.5">
              Chuẩn đầu ra tin học • Đồng hành tốt nghiệp
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((item, idx) => {
              const Icon = item.icon;

              if (item.isSpecial) {
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="group relative bg-[#07080b]/70 hover:bg-[#07080b]/90 backdrop-blur-md border-2 border-emerald-400 hover:border-emerald-300 p-5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))]"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-emerald-950/90 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-md">
                          <Icon size={19} />
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 border-2 border-emerald-400 bg-black/80 text-emerald-200">
                          {item.badge}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h2 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          {item.title}
                        </h2>
                        <p className="text-xs text-neutral-200 font-medium leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t-2 border-emerald-400/40 flex items-center gap-1.5 text-xs font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors">
                      <span>{item.btnText}</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              }

              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="group relative bg-[#07080b]/70 hover:bg-[#07080b]/90 backdrop-blur-md border-2 border-white/85 hover:border-white p-5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-white/10 border-2 border-white/85 text-[#b23b35] group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-md">
                        <Icon size={19} />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 border-2 border-white/85 bg-black/80 text-white">
                        {item.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-base font-black text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {item.title}
                      </h2>
                      <p className="text-xs text-neutral-200 font-medium leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t-2 border-white/40 flex items-center gap-1.5 text-xs font-bold text-neutral-100 group-hover:text-white transition-colors">
                    <span>{item.btnText}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. NỬA DƯỚI: NỀN BÊ TÔNG NHÁM HẠT MỜ */}
      <div className="w-full bg-[#edeef2] text-neutral-900 border-t border-neutral-300 relative pb-16">
        <div 
          className="absolute inset-0 pointer-events-none opacity-45 mix-blend-multiply z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 space-y-14">
          
          {/* KHỐI PATCH NOTE */}
          <section className="-mt-16 sm:-mt-24 bg-white/95 backdrop-blur-md border border-neutral-300 shadow-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center [clip-path:polygon(0_0,calc(100%-20px)_0,100%_20px,100%_100%,20px_100%,0_calc(100%-20px))]">
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black uppercase tracking-wide text-neutral-900">
                    THÔNG BÁO KHOÁ TIN KHẢO SÁT T12/2026
                  </span>
                  <ArrowRight size={18} className="text-[#b23b35]" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 bg-[#b23b35] text-white uppercase rounded-sm">
                    KHẢO SÁT TIN HỌC
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 bg-neutral-200 text-neutral-700 uppercase rounded-sm">
                    CHUẨN ĐẦU RA DTU
                  </span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 pt-1">
                  Khai Giảng Khóa Ôn Thi Khảo Sát Tin DTU - Mr.Bin
                </h3>

                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  Hệ thống hóa toàn bộ đề thi Word & Excel khảo sát chuẩn đầu ra thực tế tại trường. Hướng dẫn làm bài trực tiếp trên máy tính, mẹo thực chiến tránh bẫy đề thi và đồng hành giải đáp 1:1 cho học viên đến khi cầm chắc chứng chỉ tốt nghiệp.
                </p>
              </div>

              <div className="pt-2">
                <Link 
                  href="/khoa-hoc-tin/dot-12-2026"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#b23b35] hover:text-[#9b302a] font-black transition-colors"
                >
                  <span>Xem chi tiết lịch khai giảng & đăng ký</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Khung Video YouTube */}
            <div className="w-full lg:w-[440px] aspect-video bg-neutral-950 border border-neutral-300 relative flex flex-col items-center justify-center text-center p-4 group cursor-pointer shadow-inner">
              <div className="w-12 h-12 rounded-full bg-[#b23b35] text-white flex items-center justify-center pl-0.5 shadow-lg group-hover:scale-110 group-hover:bg-[#9b302a] transition-all duration-200">
                <Play size={20} fill="currentColor" />
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wider mt-3">
                Video Hướng Dẫn Ôn Thi Chuẩn Đầu Ra
              </p>
              <p className="text-[11px] text-neutral-400 mt-1">
                Bấm để xem video giải đề khảo sát trực tiếp
              </p>
            </div>
          </section>

          {/* PHÂN KHU TIN TỨC SỰ KIỆN: LẤY TRỰC TIẾP TỪ GOOGLE SHEET */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black uppercase tracking-wider text-neutral-900">
                TIN TỨC SỰ KIỆN
              </h2>
              <Link href="/thong-bao" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b23b35] hover:underline">
                <span>Xem tất cả thông báo</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestNews.map((news) => (
                <Link
                  key={news.id}
                  href={news.linkUrl}
                  className="group bg-white border border-neutral-300 hover:border-[#b23b35] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))]"
                >
                  <div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center gap-2 text-[9px] font-bold uppercase">
                        <span className="px-2 py-0.5 border border-[#b23b35]/40 text-[#b23b35] bg-red-50">
                          {news.category}
                        </span>
                        <span className="px-2 py-0.5 border border-neutral-300 text-neutral-600 bg-neutral-100">
                          {news.tag}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#b23b35] transition-colors line-clamp-2 leading-snug">
                        {news.title}
                      </h3>

                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {news.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                    <span>{news.date ? news.date.replace(/\./g, '/') : ''}</span>
                    <span className="text-neutral-800 font-bold group-hover:text-[#b23b35] flex items-center gap-0.5 transition-colors">
                      Chi tiết <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>

    </div>
  );
}