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
  Sparkles
} from 'lucide-react';

const CONTACT_PHONE_RAW = '0934304070';
const CONTACT_PHONE_DISPLAY = '0934 30 40 70';
const CONTACT_NAME = 'Bin';
const FEEDBACK_DRIVE_URL = 'https://drive.google.com/drive/folders/1369Y0mpUfTJFC_g9p8SjmdaNfgxzBf4N?usp=drive_link';

export default function ChiTietKhoaHoc12Page() {
  return (
    <div 
      className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased selection:bg-[#0071e3] selection:text-white pt-8 pb-20 px-4 sm:px-6 flex flex-col items-center"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
        letterSpacing: '-0.011em',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      
      {/* 1. NÚT QUAY LẠI */}
      <div className="w-full max-w-3xl mb-4">
        <Link
          href="/khoa-hoc-tin"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#86868b] hover:text-[#0071e3] transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Quay lại danh sách khóa học</span>
        </Link>
      </div>

      {/* 2. KHỐI NỘI DUNG CHÍNH */}
      <main className="w-full max-w-3xl bg-white rounded-[28px] p-6 sm:p-9 border border-[#e5e5ea]/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-6">
        
        {/* HEADER CHI TIẾT */}
        <div className="space-y-3 border-b border-[#f5f5f7] pb-5 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#b23b35] text-white text-xs font-semibold rounded-full shadow-sm">
            <Laptop size={15} className="text-red-100" />
            <span>Chuẩn đầu ra tin học DTU</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight uppercase leading-tight max-w-2xl">
            KHÓA HỌC TIN KHẢO SÁT ĐẦU RA DTU <span className="text-[#b23b35]">12/2026</span>
          </h1>
        </div>

        {/* CỘT MỐC QUAN TRỌNG */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-950 uppercase tracking-wide">
            <Award size={18} className="text-amber-700" /> Thông tin & Thời hạn chứng chỉ
          </div>
          <ul className="space-y-2 text-[16px] leading-[24px] text-[#1d1d1f]">
            <li>• <strong>Lịch thi chính thức:</strong> Buổi chiều, thứ 7 - ngày <strong>05-12-2026</strong>.</li>
            <li>• <strong>Xét tốt nghiệp:</strong> Sinh viên đạt kỳ thi sẽ đủ điều kiện xét tốt nghiệp ngay trong <strong>đợt tháng 12</strong>.</li>
            <li>• <strong>Thời hạn giá trị:</strong> Kết quả khảo sát có giá trị sử dụng trong vòng <strong>2 năm</strong>.</li>
          </ul>
        </div>

        {/* LƯỚI 4 Ô THÔNG TIN ĐỒNG BỘ NÉT CHỮ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Ô 1: Lịch trình đào tạo */}
          <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider">
                <Calendar size={17} className="text-[#b23b35] shrink-0" />
                <span>Lịch Trình Đào Tạo</span>
              </div>
              <div className="text-[18px] sm:text-[19px] font-bold text-[#1d1d1f] tracking-tight">
                15/10/2026 → 30/11/2026
              </div>
            </div>
            <div className="space-y-1 text-[14px] leading-relaxed text-[#1d1d1f] pt-3 border-t border-[#e5e5ea]">
              <p>• <strong>Ngày xếp lịch:</strong> 05/10/2026</p>
              <p className="text-[#515154]">• Lịch học linh hoạt theo thời gian học viên</p>
            </div>
          </div>

          {/* Ô 2: Thời lượng đào tạo */}
          <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider">
                <Clock size={17} className="text-[#b23b35] shrink-0" />
                <span>Thời Lượng Học</span>
              </div>
              <div className="text-[18px] sm:text-[19px] font-bold text-[#1d1d1f] tracking-tight">
                2 buổi / 1 tuần & 2 giờ / 1 buổi
              </div>
            </div>
            <div className="space-y-1 text-[14px] leading-relaxed text-[#1d1d1f] pt-3 border-t border-[#e5e5ea]">
              <p>• <strong>Chính khóa:</strong> 17 buổi học & thi thử thực tế</p>
              <p className="text-[#515154]">• Ôn tập thêm 5 buổi ôn giải đề trọng tâm</p>
            </div>
          </div>

          {/* Ô 3: Hình thức & Địa điểm */}
          <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider">
                <MapPin size={17} className="text-[#b23b35] shrink-0" />
                <span>Hình Thức & Địa Điểm</span>
              </div>
              <div className="text-[18px] sm:text-[19px] font-bold text-[#1d1d1f] tracking-tight">
                Offline kết hợp Online
              </div>
            </div>
            <div className="space-y-1.5 text-[14px] leading-relaxed text-[#1d1d1f] pt-3 border-t border-[#e5e5ea]">
              <p className="block">
                • <strong className="font-semibold text-[#1d1d1f]">Offline:</strong> 291/34 Trần Cao Vân (TT Toàn Thắng)
              </p>
              <p className="block">
                • <strong className="font-semibold text-[#1d1d1f]">Online:</strong> Học tương tác trực tiếp qua Zoom
              </p>
            </div>
          </div>

          {/* Ô 4: Học phí & Lệ phí thi */}
          <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider">
                <BadgePercent size={17} className="text-[#b23b35] shrink-0" />
                <span>Học Phí & Lệ Phí Thi</span>
              </div>
              <div className="text-[18px] sm:text-[19px] font-bold text-[#b23b35] tracking-tight">
                950.000 VNĐ <span className="text-[13px] font-medium text-[#515154]">/ học viên</span>
              </div>
            </div>
            <div className="space-y-1 text-[14px] leading-relaxed text-[#1d1d1f] pt-3 border-t border-[#e5e5ea]">
              <p>• <strong>Lệ phí thi:</strong> 150.000 VNĐ</p>
              <p className="text-[#515154]">• Lệ phí thi sẽ chuyển khoản đóng vào tháng 11</p>
            </div>
          </div>

        </div>

        {/* BANNER LỚP KÈM NHÓM NHỎ */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b23b35] text-white text-xs font-bold shadow-sm">
                <Sparkles size={13} />
                <span>Lớp kèm theo yêu cầu</span>
              </span>
            </div>
            <h3 className="text-[17px] font-bold text-[#1d1d1f] tracking-tight">
              Nhận kèm nhóm nhỏ 1:1, 1:2 và 1:3
            </h3>
            <p className="text-[14px] leading-[22px] text-[#515154] max-w-lg">
              Thời gian học linh động, ít học viên và theo lịch rảnh của học viên, tuy nhiên học phí sẽ cao hơn nhóm lớp.
            </p>
          </div>

          <Link
            href={`https://zalo.me/${CONTACT_PHONE_RAW}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0068ff] hover:bg-[#0055d4] text-white text-sm font-bold transition shadow-md hover:scale-[1.02]"
          >
            <MessageCircle size={18} />
            <span>Tư vấn lớp kèm</span>
          </Link>
        </div>

        {/* KHỐI ƯU ĐÃI & HỖ TRỢ ĐẶC BIỆT */}
        <div className="p-6 rounded-[22px] bg-red-50/70 border border-red-200/80 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#b23b35] uppercase tracking-wide">
            <Users size={18} /> Chính sách ưu đãi & Quyền lợi học viên
          </div>
          <ul className="space-y-3.5">
            <li className="flex items-start gap-3 text-[16px] leading-[24px] text-[#1d1d1f]">
              <CheckCircle2 size={22} className="text-[#b23b35] shrink-0 mt-0.5" />
              <span><strong>Giảm học phí giới thiệu bạn bè:</strong> Giảm học phí khi rủ bạn cùng đăng ký.</span>
            </li>
            <li className="flex items-start gap-3 text-[16px] leading-[24px] text-[#1d1d1f]">
              <CheckCircle2 size={22} className="text-[#b23b35] shrink-0 mt-0.5" />
              <span><strong>Giáo trình đầy đủ:</strong> Cung cấp giáo trình in và video bài giảng, bám sát đề thi thực tế.</span>
            </li>
            <li className="flex items-start gap-3 text-[16px] leading-[24px] text-[#1d1d1f]">
              <FileSpreadsheet size={22} className="text-[#b23b35] shrink-0 mt-0.5" />
              <span><strong>Đặc quyền:</strong> Hỗ trợ chạy <strong>SPSS</strong>, chỉnh sửa bố cục <strong>Báo cáo & Khóa luận</strong> với giá ưu đãi.</span>
            </li>
            <li className="flex items-start gap-3 text-[16px] leading-[24px] text-[#1d1d1f]">
              <ShieldCheck size={22} className="text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Cam kết đồng hành:</strong> Hỗ trợ tư vấn thủ tục nộp chứng chỉ, xét tốt nghiệp trực tiếp tại DTU.</span>
            </li>
          </ul>
        </div>

        {/* FEEDBACK HỌC VIÊN */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shrink-0">
              <MessageSquareHeart size={22} />
            </div>
            <div>
              <p className="text-base font-bold text-[#1d1d1f]">Xem kết quả & Cảm nhận của các khóa trước</p>
              <p className="text-xs sm:text-sm text-[#515154] mt-0.5">Hàng trăm sinh viên DTU đã vượt qua chuẩn đầu ra tin học dễ dàng</p>
            </div>
          </div>
          <Link
            href={FEEDBACK_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-neutral-50 border border-[#e5e5ea] text-[#1d1d1f] text-sm font-bold transition shadow-sm shrink-0 hover:scale-[1.02]"
          >
            <span>Xem Feedback</span>
            <FolderOpen size={16} className="text-amber-600" />
          </Link>
        </div>

        {/* CHÂN TRANG & NÚT LIÊN HỆ */}
        <div className="border-t border-[#f5f5f7] pt-5 space-y-4">
          <p className="text-[16px] text-[#515154] text-center sm:text-left">
            Nếu em có bất kỳ thắc mắc nào về lịch học hay lộ trình, cứ nhắn lại để anh hỗ trợ nhé!
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`https://zalo.me/${CONTACT_PHONE_RAW}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-[#0068ff] hover:bg-[#0055d4] text-white text-sm sm:text-base font-bold transition shadow-md hover:scale-[1.01]"
            >
              <MessageCircle size={18} />
              <span>Nhắn Zalo đăng ký ({CONTACT_NAME} - {CONTACT_PHONE_DISPLAY})</span>
            </Link>

            <a
              href={`tel:${CONTACT_PHONE_RAW}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#f5f5f7] hover:bg-[#e5e5ea] text-[#1d1d1f] border border-[#e5e5ea] text-sm sm:text-base font-bold transition hover:scale-[1.01]"
            >
              <PhoneCall size={17} className="text-[#b23b35]" />
              <span>Gọi điện tư vấn</span>
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}