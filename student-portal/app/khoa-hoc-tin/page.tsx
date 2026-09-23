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
    title: 'KHOÁ HỌC/ÔN THI TIN HỌC KHẢO SÁT ĐẦU RA MR.BIN',
    badge: 'Khóa Trọng Điểm / Chi phí thấp / Thời gian ngắn',
    target: 'Dành cho sinh viên cần hoàn thành chuẩn đầu ra tin học để xét tốt nghiệp.',
    duration: '~17 buổi đến 22 buổi',
    schedule: 'Lịch học linh hoạt và tối ưu',
    description: 'Trọng tâm giải đề thực chiến sát với format đề thi khảo sát mới nhất của trường, mẹo làm bài đạt điểm tối đa.',
    highlights: [
      'Thời gian học nhanh & chi phí thấp có thời hạn xét 2 năm',
      'Kỹ thuật tối ưu tốc độ làm bài Word, Excel & Powerpoint',
      'Bộ 15 đề thi khảo sát thực chiến & Cam kết hỗ trợ giải đáp thông tin 1:1 trong thời gian học và sau khi học xong',
    ],
    status: 'open',
    registerUrl: `https://zalo.me/${CONTACT_PHONE_RAW}`,
    detailUrl: '/khoa-hoc-tin/dot-12-2026', // <-- Đã sửa đúng thư mục khoa-hoc-tin
    detailButtonText: 'Chi tiết khoá học T12/2026',
  },
  {
    id: 'tin-co-ban-nang-cao',
    title: 'CHỨNG CHỈ TIN HỌC TẠI DTU GỒM CƠ BẢN - NÂNG CAO',
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
    <div className="min-h-screen flex flex-col items-center pt-8 pb-16 px-4 bg-[#edeef2] text-neutral-900 font-sans relative selection:bg-[#b23b35] selection:text-white">
      
      {/* NỀN NHÁM MỜ SVG */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-45 mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/70 via-transparent to-black/5 z-0" />

      {/* 1. TIÊU ĐỀ TRANG */}
      <div className="relative z-10 text-center space-y-3.5 pt-4 mb-9 max-w-3xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#b23b35] text-white text-xs font-semibold rounded-full shadow-sm">
            <Laptop size={14} className="text-red-100" />
            <span>Đào tạo kỹ năng thực chiến & Chuẩn đầu ra</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-normal uppercase">
          CÁC KHÓA HỌC <span className="text-[#b23b35]">TIN HỌC ĐẦU RA MR.BIN</span>
        </h1>

        <p className="text-neutral-600 text-xs sm:text-sm font-normal tracking-wide">
          Lộ trình ôn thi tin học khảo sát, chuẩn hóa chứng chỉ đầu ra và trang bị kỹ năng tin học văn phòng
        </p>

        {/* Hotline & Feedback */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          <Link
            href={`https://zalo.me/${CONTACT_PHONE_RAW}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 text-xs font-semibold transition group shadow-sm"
          >
            <MessageCircle size={15} className="text-[#0068ff] group-hover:scale-110 transition-transform" />
            <span>Hotline/Zalo: <strong className="text-neutral-900 font-bold">{CONTACT_PHONE_DISPLAY}</strong> ({CONTACT_NAME})</span>
          </Link>

          <Link
            href={FEEDBACK_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-neutral-50 border border-amber-500/40 text-amber-800 text-xs font-bold transition shadow-sm group"
          >
            <MessageSquareHeart size={15} className="text-amber-600 group-hover:scale-110 transition-transform" />
            <span>Xem Feedback học viên</span>
            <FolderOpen size={14} className="text-amber-600/80" />
          </Link>
        </div>
      </div>

      {/* 2. DANH SÁCH KHÓA HỌC */}
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {COURSES.map((course) => {
          const isOpen = course.status === 'open';

          return (
            <div
              key={course.id}
              className="group relative bg-white/95 backdrop-blur-sm border border-neutral-300 hover:border-[#b23b35] rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl shadow-neutral-900/5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#b23b35] group-hover:scale-105 transition-all">
                    <BookOpen size={22} />
                  </div>

                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                    isOpen 
                      ? 'bg-red-50 border-red-200 text-[#b23b35]' 
                      : 'bg-neutral-100 border-neutral-200 text-neutral-500'
                  }`}>
                    {course.badge}
                  </span>
                </div>

                <div className="space-y-1.5 text-center">
                  <h2 className="text-base font-bold text-neutral-900 group-hover:text-[#b23b35] transition-colors leading-snug">
                    {course.title}
                  </h2>
                  <p className="text-xs text-neutral-500 leading-relaxed text-center font-normal">
                    {course.description}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Clock size={14} className="text-[#b23b35] shrink-0" />
                    <span>Thời lượng: <strong className="text-neutral-900 font-semibold">{course.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Calendar size={14} className="text-[#b23b35] shrink-0" />
                    <span>Lịch học: <strong className="text-neutral-900 font-semibold">{course.schedule}</strong></span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    Ưu điểm khi học tại Mr.Bin:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {course.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* NÚT HÀNH ĐỘNG */}
              <div className="pt-6 mt-4 border-t border-neutral-100 space-y-2.5">
                
                {/* Nút Chi tiết khoá học T12/2026 */}
                {course.detailUrl && (
                  <Link
                    href={course.detailUrl}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-red-50 hover:bg-red-100/80 border border-red-200 text-[#b23b35] text-xs font-bold transition shadow-sm cursor-pointer group/btn"
                  >
                    <span>{course.detailButtonText || 'Chi tiết khóa học'}</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                )}

                <Link
                  href={course.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold transition shadow-sm cursor-pointer ${
                    isOpen
                      ? 'bg-[#b23b35] hover:bg-[#9b302a] text-white shadow-red-900/20'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200'
                  }`}
                >
                  <MessageCircle size={15} />
                  <span>Liên hệ Zalo Bin ({CONTACT_PHONE_DISPLAY})</span>
                  <ExternalLink size={14} />
                </Link>

                <Link
                  href={FEEDBACK_DRIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-neutral-500 hover:text-amber-700 transition text-[11px] font-medium"
                >
                  <MessageSquareHeart size={13} className="text-amber-600/90" />
                  <span>Xem feedback học viên khóa trước</span>
                </Link>
              </div>

            </div>
          );
        })}
      </div>

      {/* 3. KHỐI TƯ VẤN CUỐI TRANG */}
      <div className="relative z-10 w-full max-w-4xl p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-neutral-900/5">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#b23b35] shrink-0">
            <Headphones size={24} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              Cần tư vấn trực tiếp về lịch học?
            </h3>
            <p className="text-xs text-neutral-500">
              Liên hệ Hotline / Zalo: <strong className="text-neutral-900 font-semibold">{CONTACT_PHONE_DISPLAY}</strong> gặp <strong className="text-[#b23b35] font-bold">{CONTACT_NAME}</strong> để được hỗ trợ 24/7
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <a
            href={`tel:${CONTACT_PHONE_RAW}`}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold border border-neutral-200 transition"
          >
            <PhoneCall size={14} className="text-[#b23b35]" />
            <span>Gọi ngay</span>
          </a>
          <Link
            href={`https://zalo.me/${CONTACT_PHONE_RAW}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0068ff] hover:bg-[#0055d4] text-white text-xs font-bold shadow-sm transition"
          >
            <MessageCircle size={14} />
            <span>Nhắn Zalo</span>
          </Link>
        </div>
      </div>

    </div>
  );
}