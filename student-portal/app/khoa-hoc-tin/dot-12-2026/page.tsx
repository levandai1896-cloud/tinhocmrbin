'use client';

import Link from 'next/link';
import { 
  Laptop, 
  Clock, 
  Calendar, 
  MapPin, 
  BadgePercent, 
  CheckCircle2, 
  PhoneCall, 
  MessageCircle, 
  ArrowLeft,
  Users,
  ShieldCheck,
  Award,
  FileSpreadsheet,
  FolderOpen,
  MessageSquareHeart,
  UserCheck
} from 'lucide-react';

const CONTACT_PHONE_RAW = '0934304070';
const CONTACT_PHONE_DISPLAY = '0934 30 40 70';
const CONTACT_NAME = 'Bin';
const FEEDBACK_DRIVE_URL = 'https://drive.google.com/drive/folders/1369Y0mpUfTJFC_g9p8SjmdaNfgxzBf4N?usp=drive_link';

export default function ChiTietKhoaHoc12Page() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-8 pb-20 px-4 bg-[#edeef2] text-neutral-900 font-sans relative selection:bg-[#b23b35] selection:text-white">
      
      {/* Nền nhám mờ SVG */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-45 mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/70 via-transparent to-black/5 z-0" />

      {/* Nút quay lại danh sách */}
      <div className="relative z-10 w-full max-w-3xl mb-6">
        <Link
          href="/khoa-hoc-tin"
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-[#b23b35] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Quay lại danh sách khóa học</span>
        </Link>
      </div>

      {/* Khung nội dung chi tiết */}
      <main className="relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-sm border border-neutral-300 rounded-3xl p-6 sm:p-10 shadow-xl shadow-neutral-900/5 space-y-7">
        
        {/* Header chi tiết căn giữa */}
        <div className="space-y-3 border-b border-neutral-200 pb-6 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#b23b35] text-white text-xs font-semibold rounded-full shadow-sm">
            <Laptop size={14} className="text-red-100" />
            <span>Chuẩn đầu ra tin học DTU</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-[32px] font-black text-neutral-900 tracking-normal uppercase leading-snug max-w-2xl">
            THÔNG TIN CHI TIẾT KHÓA HỌC TIN KHẢO SÁT ĐẦU RA <span className="text-[#b23b35]">12/2026</span>
          </h1>
        </div>

        {/* CỘT MỐC QUAN TRỌNG: KỲ THI & XÉT TỐT NGHIỆP */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase tracking-wide">
            <Award size={18} className="text-amber-700" /> Thông tin & Thời hạn chứng chỉ
          </div>
          <ul className="text-xs sm:text-sm text-neutral-800 space-y-1.5 leading-relaxed">
            <li>
              • <strong>Lịch thi chính thức:</strong> Buổi chiều thứ 7, ngày <strong>05/12/2026</strong>.
            </li>
            <li>
              • <strong>Xét tốt nghiệp:</strong> Sinh viên đạt kỳ thi này sẽ đủ điều kiện xét tốt nghiệp ngay trong <strong>đợt tháng 12</strong>.
            </li>
            <li>
              • <strong>Thời hạn giá trị:</strong> Kết quả khảo sát có giá trị trong vòng <strong>2 năm</strong> kể từ ngày có kết quả đậu.
            </li>
          </ul>
        </div>

        {/* LƯỚI THÔNG TIN CHI TIẾT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
          
          {/* Hàng 1 - Ô 1: Thời gian học */}
          <div className="p-4.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between space-y-2">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase">
                <Calendar size={15} className="text-[#b23b35]" /> Lịch trình & Thời gian học
              </div>
              <p className="text-sm font-bold text-neutral-900">
                15/10/2026 → 30/11/2026
              </p>
            </div>
            <div className="text-xs text-neutral-600 space-y-0.5 pt-1 border-t border-neutral-200/60">
              <p>• Ngày xếp lịch học: <strong>05/10/2026</strong></p>
              <p className="text-neutral-500 italic">*Thời gian có thể điều chỉnh linh hoạt</p>
            </div>
          </div>

          {/* Hàng 1 - Ô 2: Thời lượng đào tạo */}
          <div className="p-4.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between space-y-2">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase">
                <Clock size={15} className="text-[#b23b35]" /> Thời lượng đào tạo
              </div>
              <p className="text-sm font-bold text-neutral-900">
                2 buổi / tuần • 2 giờ / buổi
              </p>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed pt-1 border-t border-neutral-200/60">
              Tổng lộ trình: <strong>17 buổi học & thi thử</strong> + <strong>5 buổi ôn tập thực chiến</strong>
            </p>
          </div>

          {/* Hàng 2 - Ô 1: HÌNH THỨC & ĐỊA ĐIỂM */}
          <div className="p-4.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between space-y-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase">
                <MapPin size={15} className="text-[#b23b35]" /> Hình thức & Địa điểm học
              </div>
              <div className="space-y-1.5 text-xs text-neutral-800">
                <p className="flex items-start gap-1.5">
                  <span className="font-bold text-neutral-900 shrink-0">• OFFLINE:</span>
                  <span className="text-neutral-700">Số 291/34 Trần Cao Vân (TT Toàn Thắng)</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="font-bold text-neutral-900 shrink-0">• ONLINE:</span>
                  <span className="text-neutral-700">Qua nền tảng Zoom</span>
                </p>
              </div>
            </div>
          </div>

          {/* Hàng 2 - Ô 2: Học phí & Lệ phí thi */}
          <div className="p-4.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between space-y-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase">
                <BadgePercent size={15} className="text-[#b23b35]" /> Học phí & Lệ phí thi
              </div>
              <p className="text-lg font-black text-[#b23b35] leading-tight">
                950.000 VNĐ <span className="text-xs font-normal text-neutral-600">/ 1 sinh viên học theo lớp</span>
              </p>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed pt-2 border-t border-neutral-200/60">
              • <strong>Lệ phí thi:</strong> 150.000 VNĐ (Đóng lệ phí cho trường vào tháng 11 theo hướng dẫn của thầy)
            </p>
          </div>

        </div>

        {/* =========================================================================
            MỤC MỚI: NHẬN DẠY NHÓM NHỎ KÈM 1:1, 1:2, 1:3 VỚI GIÁ ƯU ĐÃI
           ========================================================================= */}
        <div className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-neutral-50 via-white to-neutral-50 border border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#b23b35] shrink-0">
              <UserCheck size={20} />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-neutral-900 uppercase">
                  Lớp Kèm Nhóm Nhỏ Theo Yêu Cầu
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-[#b23b35] text-white text-[10px] font-bold">
                  Học Phí Ưu Đãi
                </span>
              </div>
              <p className="text-xs text-neutral-600 mt-0.5">
                Có nhận kèm nhóm nhỏ <strong className="text-neutral-900 font-semibold">1:1</strong>, <strong className="text-neutral-900 font-semibold">1:2</strong>, <strong className="text-neutral-900 font-semibold">1:3</strong> với lịch học linh động tối đa theo thời gian của học viên.
              </p>
            </div>
          </div>

          <Link
            href={`https://zalo.me/${CONTACT_PHONE_RAW}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0068ff] hover:bg-[#0055d4] text-white text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <MessageCircle size={14} />
            <span>Tư vấn lớp kèm</span>
          </Link>
        </div>

        {/* KHỐI ƯU ĐÃI & HỖ TRỢ ĐẶC BIỆT */}
        <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200/90 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#b23b35] uppercase tracking-wide">
            <Users size={16} /> Chính sách ưu đãi & Quyền lợi học viên
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-800">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#b23b35] shrink-0 mt-0.5" />
              <span><strong>Giảm học phí khi giới thiệu bạn bè:</strong> Nhận ngay mức chiết khấu học phí hấp dẫn khi rủ bạn cùng đăng ký.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-[#b23b35] shrink-0 mt-0.5" />
              <span><strong>Học liệu chuẩn chỉnh:</strong> Cung cấp đầy đủ giáo trình in giấy và hệ thống video bài giảng xem lại 24/7, bộ đề ôn tập bám sát thực tế thi.</span>
            </li>
            <li className="flex items-start gap-2">
              <FileSpreadsheet size={16} className="text-[#b23b35] shrink-0 mt-0.5" />
              <span><strong>Đặc quyền làm tốt nghiệp:</strong> Hỗ trợ chạy dữ liệu <strong>SPSS</strong>, chỉnh sửa chuẩn bố cục bài <strong>Báo cáo thực tập & Khóa luận tốt nghiệp</strong> với mức giá ưu đãi đặc biệt cho học viên.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Cam kết đồng hành:</strong> Tư vấn và giải đáp tận tình các thủ tục nhận bằng, chuẩn đầu ra và các vấn đề học tập khác tại DTU.</span>
            </li>
          </ul>
        </div>

        {/* FEEDBACK HỌC VIÊN */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shrink-0">
              <MessageSquareHeart size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900">Xem kết quả & Cảm nhận của các khóa trước</p>
              <p className="text-[11px] text-neutral-500">Hàng trăm sinh viên DTU đã vượt qua chuẩn đầu ra tin học dễ dàng</p>
            </div>
          </div>
          <Link
            href={FEEDBACK_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs font-bold transition shadow-sm shrink-0 cursor-pointer"
          >
            <span>Xem Feedback</span>
            <FolderOpen size={14} className="text-amber-600" />
          </Link>
        </div>

        {/* CHÂN TRANG & NÚT LIÊN HỆ */}
        <div className="border-t border-neutral-200 pt-6 space-y-4">
          <p className="text-xs text-neutral-600 leading-relaxed text-center sm:text-left">
            Nếu em có bất kỳ thắc mắc nào về lịch học, xếp lớp hay lộ trình, cứ nhắn lại để anh hỗ trợ tư vấn ngay nhé!
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`https://zalo.me/${CONTACT_PHONE_RAW}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-[#0068ff] hover:bg-[#0055d4] text-white text-xs font-bold transition shadow-md cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Nhắn Zalo đăng ký ({CONTACT_NAME} - {CONTACT_PHONE_DISPLAY})</span>
            </Link>

            <a
              href={`tel:${CONTACT_PHONE_RAW}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200 text-xs font-bold transition cursor-pointer"
            >
              <PhoneCall size={15} className="text-[#b23b35]" />
              <span>Gọi điện tư vấn</span>
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}