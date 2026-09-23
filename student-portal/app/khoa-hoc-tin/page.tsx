'use client';

import Link from 'next/link';
import { 
  Laptop, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ExternalLink, 
  MessageSquareHeart, 
  FolderOpen, 
  PhoneCall, 
  MessageCircle, 
  Headphones,
  ArrowRight
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  badge: string;
  target: string;
  duration: string;
  schedule: string;
  description: string;
  highlights: string[];
  status: 'open' | 'upcoming';
  registerUrl: string;
  detailUrl?: string;
  detailButtonText?: string;
}

const FEEDBACK_DRIVE_URL = 'https://drive.google.com/drive/folders/1369Y0mpUfTJFC_g9p8SjmdaNfgxzBf4N?usp=drive_link';
const CONTACT_PHONE_RAW = '0934304070';
const CONTACT_PHONE_DISPLAY = '0934 30 40 70';
const CONTACT_NAME = 'Bin';

const COURSES: Course[] = [
  {
    id: 'tin-khao-sat',
    title: 'KHOÁ TIN HỌC KHẢO SÁT ĐẦU RA',
    badge: 'Khóa Trọng Điểm / Chi phí thấp / Thời gian ngắn',
    target: 'Dành cho sinh viên cần hoàn thành chuẩn đầu ra tin học để xét tốt nghiệp.',
    duration: '~17 buổi đến 22 buổi',
    schedule: 'Lịch học linh hoạt và tối ưu',
    description: 'Thời gian học ngắn, tiết kiệm chi phí, đề thi thử sát đề, tài liệu ôn tập đầy đủ.',
    highlights: [
      'Tiết kiệm thời gian & chi phí, thời hạn xét 2 năm',
      'Kỹ thuật tối ưu tốc độ làm bài Word, Excel & Powerpoint',
      'Bộ 15 đề thi khảo sát thực chiến & Cam kết hỗ trợ giải đáp thông tin 1:1 trong thời gian học và sau khi học xong',
    ],
    status: 'open',
    registerUrl: `https://zalo.me/${CONTACT_PHONE_RAW}`,
    detailUrl: '/khoa-hoc-tin/dot-12-2026',
    detailButtonText: 'THÔNG TIN KHOÁ KHẢO SÁT T12/2026',
  },
  {
    id: 'tin-co-ban-nang-cao',
    title: 'KHOÁ HỌC CƠ BẢN - NÂNG CAO',
    badge: 'Cơ Bản Đến Nâng Cao',
    target: 'Dành cho sinh viên làm báo cáo, khóa luận tốt nghiệp và đi làm thực tế.',
    duration: '~12 buổi',
    schedule: 'Linh hoạt thời gian học',
    description: 'Giúp sinh viên nắm vững các kỹ năng, luyện sát đề để vững tâm đi thi.',
    highlights: [
      'Dành cho sinh viên đã học tại trường và cần ôn kiến thức đi thi',
      'Tối ưu thời gian, bổ sung kiến thức và kỹ thuật cho sinh viên',
      'Đề thi lý thuyết thực hành thực chiến & Hỗ trợ giải đáp các thắc mắc',
    ],
    status: 'open',
    registerUrl: `https://zalo.me/${CONTACT_PHONE_RAW}`,
  },
];

export default function KhoaHocTinPage() {
  return (
    <div 
      className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased pt-8 pb-16 px-4 sm:px-6 flex flex-col items-center"
      style={{
        fontFamily: "'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        letterSpacing: '-0.011em',
      }}
    >
      
      {/* 1. TIÊU ĐỀ TRANG (HUY HIỆU ĐÃ ĐỔI THÀNH MÀU TÍM NỔI BẬT) */}
      <section className="w-full pt-8 pb-2 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center">
        <div className="space-y-3 text-center max-w-3xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#8b5cf6] text-white text-xs font-semibold rounded-full shadow-[0_2px_8px_rgba(139,92,246,0.35)]">
              <Laptop size={16} className="text-purple-100" />
              <span>Đào tạo kỹ năng thực chiến & Chuẩn đầu ra</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-tight">
            Khóa Học Tin Học Đầu Ra Mr.Bin <br className="hidden sm:inline" />
          </h1>

          <p className="text-[17px] leading-[25px] font-normal text-[#1d1d1f] max-w-2xl mx-auto">
            Lộ trình học từ đầu, ôn thi, và thi thử khoá tin học khảo sát.
          </p>

          {/* Hotline & Feedback */}
          <div className="pt-2.5 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href={`https://zalo.me/${CONTACT_PHONE_RAW}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-neutral-50 border border-[#e5e5ea] text-[#1d1d1f] text-sm sm:text-base font-medium transition-all hover:scale-[1.02] shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
            >
              <MessageCircle size={20} className="text-[#0068ff] shrink-0" />
              <span>Hotline/Zalo: <strong className="font-bold">{CONTACT_PHONE_DISPLAY}</strong> ({CONTACT_NAME})</span>
            </Link>

            <Link
              href={FEEDBACK_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-neutral-50 border border-amber-500/40 text-amber-950 text-sm sm:text-base font-semibold transition-all hover:scale-[1.02] shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
            >
              <MessageSquareHeart size={20} className="text-amber-600 shrink-0" />
              <span>Xem Feedback học viên</span>
              <FolderOpen size={18} className="text-amber-600/90 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. DANH SÁCH KHÓA HỌC */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-3 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES.map((course) => {
            const isOpen = course.status === 'open';

            return (
              <div
                key={course.id}
                className="group relative bg-white rounded-[26px] p-7 sm:p-8 border border-[#e5e5ea]/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] text-[#8b5cf6] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <BookOpen size={22} strokeWidth={2.2} />
                    </div>

                    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                      isOpen 
                        ? 'bg-purple-50 text-[#8b5cf6] border border-purple-200/60' 
                        : 'bg-[#f5f5f7] text-[#86868b]'
                    }`}>
                      {course.badge}
                    </span>
                  </div>

                  <div className="space-y-2 text-center flex flex-col items-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#8b5cf6] transition-colors leading-snug">
                      {course.title}
                    </h2>
                    <p className="text-[17px] leading-[25px] font-normal text-[#1d1d1f] max-w-md">
                      {course.description}
                    </p>
                  </div>

                  {/* Khung thời lượng & Lịch học */}
                  <div className="p-4 rounded-2xl bg-[#f5f5f7] space-y-2 text-sm text-[#1d1d1f]">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-[#8b5cf6] shrink-0" />
                      <span>Thời lượng: <strong className="font-semibold">{course.duration}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#8b5cf6] shrink-0" />
                      <span>Lịch học: <strong className="font-semibold">{course.schedule}</strong></span>
                    </div>
                  </div>

                  {/* Danh sách ưu điểm nổi bật */}
                  <div className="space-y-3 pt-1">
                    <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block">
                      Ưu điểm nổi bật:
                    </span>
                    <ul className="space-y-3.5">
                      {course.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[17px] leading-[25px] font-normal text-[#1d1d1f]">
                          <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Cụm nút bấm */}
                <div className="pt-6 mt-6 border-t border-[#f5f5f7] space-y-3">
                  {/* NÚT THÔNG TIN CHI TIẾT - XANH LÁ ĐẬM SẮC NÉT */}
                  {course.detailUrl && (
                    <Link
                      href={course.detailUrl}
                      className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-[#15803d] hover:bg-[#166534] text-white text-sm sm:text-[15px] font-bold tracking-wide transition-all shadow-[0_4px_16px_rgba(21,128,61,0.3)] hover:shadow-[0_6px_20px_rgba(21,128,61,0.4)] cursor-pointer hover:scale-[1.01] group/btn"
                    >
                      <span>{course.detailButtonText || 'Chi tiết khóa học'}</span>
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform stroke-[2.5]" />
                    </Link>
                  )}

                  <Link
                    href={course.registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-[#0068ff] hover:bg-[#0055d4] text-white text-sm sm:text-[15px] font-bold transition-all shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.01]"
                  >
                    <MessageCircle size={19} />
                    <span>Liên hệ Zalo Bin ({CONTACT_PHONE_DISPLAY})</span>
                    <ExternalLink size={16} />
                  </Link>

                  <Link
                    href={FEEDBACK_DRIVE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-[#6e6e73] hover:text-amber-700 transition text-xs sm:text-sm font-semibold"
                  >
                    <MessageSquareHeart size={17} className="text-amber-600" />
                    <span>Xem feedback học viên khóa trước</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. KHỐI TƯ VẤN CUỐI TRANG */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-2">
        <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-[#e5e5ea]/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-13 h-13 rounded-2xl bg-[#f5f5f7] text-[#8b5cf6] flex items-center justify-center shrink-0">
              <Headphones size={26} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1d1d1f]">
                Cần tư vấn trực tiếp về lịch học?
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b] mt-0.5">
                Hotline / Zalo: <strong className="text-[#1d1d1f]">{CONTACT_PHONE_DISPLAY}</strong> gặp <strong className="text-[#8b5cf6]">{CONTACT_NAME}</strong> để được hỗ trợ 24/7
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`tel:${CONTACT_PHONE_RAW}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#f5f5f7] hover:bg-[#e5e5ea] text-[#1d1d1f] text-sm sm:text-base font-bold transition shadow-sm hover:scale-[1.02]"
            >
              <PhoneCall size={18} className="text-[#8b5cf6]" />
              <span>Gọi ngay</span>
            </a>
            <Link
              href={`https://zalo.me/${CONTACT_PHONE_RAW}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0068ff] hover:bg-[#0055d4] text-white text-sm sm:text-base font-bold transition shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              <MessageCircle size={18} />
              <span>Nhắn Zalo</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}