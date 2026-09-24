import Link from 'next/link';
import { 
  Laptop,
  Users,
  Dumbbell, 
  Calculator, 
  FolderDown, 
  FileCheck2, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';

interface FeatureCard {
  title: string;
  badge: string;
  description: string;
  icon: any;
  href: string;
  btnText: string;
}

const FEATURES: FeatureCard[] = [
  {
    title: 'Khóa Tin Đầu Ra',
    badge: 'Khảo sát & Chuẩn đầu ra',
    description: 'Lộ trình ôn thi tin học khảo sát cấp tốc, mẹo thực chiến Word - Excel khóa luận và hỗ trợ 1:1 suốt khóa học.',
    icon: Laptop,
    href: '/khoa-hoc-tin',
    btnText: 'Xem khóa học',
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

export default function HomePage() {
  return (
    <div 
      className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased selection:bg-[#0071e3] selection:text-white pb-20 pt-1"
      style={{
        fontFamily: "'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        letterSpacing: '-0.011em',
      }}
    >
      
      {/* 1. HERO SECTION (Đã thu hẹp khoảng cách lề trên xuống pt-2) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-2">
        <div className="relative w-full rounded-[32px] sm:rounded-[40px] overflow-hidden bg-white border border-[#e5e5ea]/80 min-h-[420px] sm:min-h-[460px] flex items-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Cột trái: Tiêu đề và nút bấm */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-4 sm:space-y-5 z-20">
              <div className="space-y-2">
                <span className="text-[18px] font-bold tracking-widest uppercase text-[#86868b] block">
                  KHAI GIẢNG KHOÁ TIN KHẢO SÁT THÁNG 12/2026
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] leading-[1.08]">
                  Khoá tin khảo sát đợt tốt nghiệp tháng 12/2026 <br />
                </h1>
              </div>

              <p className="text-[15px] sm:text-[18px] leading-[24px] font-normal text-[#515154] max-w-lg">
                Học viên sẽ được học các kỹ năng gồm Word, Excel, Powerpoint từ đầu. Sau quá trình học sẽ đến giai đoạn ôn tập và thi thử để có đầy đủ kiến thức đi thi.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <Link
                  href="/khoa-hoc-tin/dot-12-2026"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-sm font-bold transition-all shadow-md hover:scale-[1.02]"
                >
                  <span>Xem Khóa Học Ngay</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="https://zalo.me/0934304070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#0068ff] hover:bg-[#0055d4] text-white text-sm font-bold transition-all shadow-md hover:scale-[1.02]"
                >
                  <MessageCircle size={18} />
                  <span>ĐĂNG KÝ HỌC NGAY</span>
                </Link>
              </div>
            </div>

            {/* Cột phải: Hình ảnh với lớp gradient chuyển tiếp mềm mại */}
            <div className="lg:col-span-5 h-full min-h-[260px] lg:min-h-[460px] relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/80 via-white/30 to-transparent z-10 pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                alt="Học tập sinh viên"
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 2. LƯỚI 6 Ô TÍNH NĂNG */}
      <section className="w-full pt-10 pb-6 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
            TIỆN ÍCH & HỌC TẬP
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b] mt-1">
            Các công cụ hỗ trợ quá trình học tập và tốt nghiệp của bạn
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;

            return (
              <Link
                key={idx}
                href={item.href}
                className="group relative bg-white rounded-[24px] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.07)] border border-[#e5e5ea]/80 overflow-hidden cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wide px-3 py-0.5 rounded-full bg-[#f5f5f7] text-[#86868b]">
                      {item.badge}
                    </span>

                    <div className="w-9 h-9 rounded-xl bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <Icon size={18} strokeWidth={2.2} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p 
                      className="text-[14px] sm:text-[15px] leading-[22px] font-normal text-[#515154]"
                      style={{
                        fontFamily: '"SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif'
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#f5f5f7] flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold bg-[#1d1d1f] hover:bg-black text-white transition-all shadow-sm group-hover:scale-[1.02]">
                    <span>{item.btnText}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
}