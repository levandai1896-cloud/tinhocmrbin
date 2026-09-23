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
import { getNotifications } from '@/data/notifications';

interface FeatureCard {
  title: string;
  badge: string;
  description: string;
  icon: any;
  href: string;
  btnText: string;
  isAppleGradient?: boolean;
}

const FEATURES: FeatureCard[] = [
  {
    title: 'Khóa Tin Đầu Ra',
    badge: 'Khảo sát & Chuẩn đầu ra',
    description: 'Lộ trình ôn thi tin học khảo sát cấp tốc, mẹo thực chiến Word - Excel khóa luận và hỗ trợ 1:1 suốt khóa học.',
    icon: Laptop,
    href: '/khoa-hoc-tin',
    btnText: 'Xem khóa học',
    isAppleGradient: true,
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
    href: '/tinh-the-duc',
    btnText: 'Mở công cụ',
  },
  {
    title: 'Tính GPA Tích Lũy',
    badge: 'Thang điểm 4.0',
    description: 'Quản lý điểm số các môn học theo tín chỉ, tính toán chính xác điểm trung bình học kỳ và dự đoán xếp loại tốt nghiệp.',
    icon: Calculator,
    href: '/tinh-gpa',
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
  const notifications = await getNotifications();
  const latestNews = notifications.slice(0, 3);

  return (
    <div 
      className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased selection:bg-[#0071e3] selection:text-white pb-24"
      style={{
        fontFamily: "'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        letterSpacing: '-0.011em',
      }}
    >
      
      {/* 1. TIÊU ĐỀ CHÍNH */}
      <section className="w-full pt-12 pb-8 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center">
        <div className="space-y-2 mb-6 text-center max-w-3xl">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#b23b35]">
            Chuẩn đầu ra tin học • Đồng hành tốt nghiệp
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-tight">
            Cổng Thông Tin Học Tập. <br className="hidden sm:inline" />
            <span className="text-[#86868b]">Dành cho sinh viên DTU.</span>
          </h1>
        </div>

        {/* 2. LƯỚI 6 Ô TÍNH NĂNG - ĐÃ THU GỌN ĐỘ DÀI CHIỀU DỌC */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;

            // Ô KHÓA HỌC TIN HỌC (VIỀN & NỀN GRADIENT APPLE)
            if (item.isAppleGradient) {
              return (
                <div 
                  key={idx}
                  className="p-[2px] rounded-[28px] bg-gradient-to-br from-[#2c65f6] via-[#a844f2] to-[#ff7a00] shadow-[0_8px_25px_rgba(168,68,242,0.16)] hover:shadow-[0_14px_35px_rgba(168,68,242,0.25)] transition-all duration-300 ease-out hover:-translate-y-1"
                >
                  <Link
                    href={item.href}
                    className="relative w-full h-full bg-gradient-to-b from-white via-white to-[#fbfaff] rounded-[26px] p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
                  >
                    <div className="absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br from-blue-400/15 via-purple-400/15 to-orange-400/15 rounded-full blur-xl pointer-events-none" />

                    <div className="space-y-3.5 relative z-10">
                      {/* Badge & Icon */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold tracking-wide px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-50 via-purple-50 to-orange-50 border border-purple-200/70 text-purple-900 shadow-sm">
                          {item.badge}
                        </span>

                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2c65f6]/10 via-[#a844f2]/10 to-[#ff7a00]/10 border border-purple-200/50 flex items-center justify-center text-[#a844f2] transition-transform duration-300 group-hover:scale-105 shadow-sm">
                          <Icon size={20} strokeWidth={2.2} />
                        </div>
                      </div>

                      {/* Tiêu đề gradient & Mô tả */}
                      <div className="space-y-1.5">
                        <h2 className="text-[19px] sm:text-[21px] font-extrabold tracking-tight leading-snug bg-gradient-to-r from-[#2c65f6] via-[#a844f2] to-[#e44d32] bg-clip-text text-transparent">
                          {item.title}
                        </h2>
                        <p 
                          className="text-[15px] sm:text-[16px] leading-[23px] font-normal text-[#1d1d1f]"
                          style={{
                            fontFamily: '"SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif'
                          }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Nút bấm */}
                    <div className="pt-4 mt-4 border-t border-purple-100/60 flex items-center justify-between relative z-10">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold text-white bg-gradient-to-r from-[#2c65f6] via-[#a844f2] to-[#e44d32] hover:opacity-95 transition-all shadow-[0_4px_14px_rgba(168,68,242,0.28)] hover:scale-[1.02]">
                        <span>{item.btnText}</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            }

            // 5 Ô CÒN LẠI (NỀN TRẮNG CHUẨN APPLE)
            return (
              <Link
                key={idx}
                href={item.href}
                className="group relative bg-white rounded-[26px] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.07)] border border-[#e5e5ea]/80 overflow-hidden cursor-pointer"
              >
                <div className="space-y-3.5">
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wide px-3 py-0.5 rounded-full bg-[#f5f5f7] text-[#86868b]">
                      {item.badge}
                    </span>

                    <div className="w-10 h-10 rounded-2xl bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <Icon size={20} strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* Tiêu đề & Mô tả */}
                  <div className="space-y-1.5">
                    <h2 className="text-[19px] sm:text-[21px] font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors leading-snug">
                      {item.title}
                    </h2>
                    <p 
                      className="text-[15px] sm:text-[16px] leading-[23px] font-normal text-[#1d1d1f]"
                      style={{
                        fontFamily: '"SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif'
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Nút bấm Apple Pill Button */}
                <div className="pt-4 mt-4 border-t border-[#f5f5f7] flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold bg-[#0071e3] hover:bg-[#0077ed] text-white transition-all shadow-sm group-hover:scale-[1.02]">
                    <span>{item.btnText}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. KHỐI THÔNG BÁO KHÓA HỌC */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-4">
        <div className="bg-white rounded-[28px] p-6 sm:p-9 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] border border-[#e5e5ea]/80 flex flex-col lg:flex-row gap-8 items-center transition-all duration-300">
          <div className="flex-1 flex flex-col justify-between space-y-3.5">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-3 py-1 bg-[#b23b35] text-white rounded-full uppercase tracking-wider">
                  Khóa Tin T12/2026
                </span>
                <span className="text-[11px] font-semibold px-3 py-1 bg-[#f5f5f7] text-[#86868b] rounded-full uppercase tracking-wider">
                  Chuẩn đầu ra
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">
                Mr.Bin - Khai giảng khoá tin khảo sát DTU đợt tốt nghiệp 12/2026
              </h3>

              <p 
                className="text-[16px] sm:text-[17px] leading-[25px] font-normal text-[#1d1d1f]"
                style={{
                  fontFamily: '"SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif'
                }}
              >
                Hệ thống hóa toàn bộ đề thi Word & Excel khảo sát chuẩn đầu ra thực tế tại trường. Hướng dẫn trực tiếp trên máy tính với mẹo thực chiến tránh bẫy và đồng hành 1:1 cho học viên đến khi hoàn thành chuẩn tốt nghiệp.
              </p>
            </div>

            <div className="pt-1">
              <Link 
                href="/khoa-hoc-tin/dot-12-2026"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#0071e3] hover:underline"
              >
                <span>Xem lịch khai giảng & đăng ký</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          {/* Khung Video */}
          <div className="w-full lg:w-[420px] aspect-video bg-[#000000] rounded-[24px] relative flex flex-col items-center justify-center text-center p-4 group cursor-pointer shadow-lg overflow-hidden">
            <div className="w-13 h-13 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center pl-1 shadow-md group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
              <Play size={22} fill="currentColor" />
            </div>
            <p className="text-sm font-bold text-white tracking-wide mt-3">
              Video Hướng Dẫn Ôn Thi Chuẩn Đầu Ra
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">
              Bấm để xem bài giải đề thực chiến
            </p>
          </div>
        </div>
      </section>

      {/* 4. PHÂN KHU TIN TỨC SỰ KIỆN */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 mt-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
            Tin tức & Sự kiện
          </h2>
          <Link href="/thong-bao" className="inline-flex items-center gap-1 text-sm font-semibold text-[#0071e3] hover:underline">
            <span>Xem tất cả</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((news) => (
            <Link
              key={news.id}
              href={news.linkUrl}
              className="group bg-white rounded-[26px] border border-[#e5e5ea]/80 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)]"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e5e5ea]">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                <div className="p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase">
                    <span className="px-2.5 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] rounded-full">
                      {news.category}
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#f5f5f7] text-[#86868b] rounded-full">
                      {news.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors line-clamp-2 leading-snug">
                    {news.title}
                  </h3>

                  <p className="text-xs text-[#86868b] line-clamp-2 leading-relaxed font-normal">
                    {news.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[#f5f5f7] flex items-center justify-between text-xs text-[#86868b]">
                <span>{news.date ? news.date.replace(/\./g, '/') : ''}</span>
                <span className="text-[#0071e3] font-semibold flex items-center gap-0.5 group-hover:underline">
                  Chi tiết <ChevronRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}