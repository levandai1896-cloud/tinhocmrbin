'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  GraduationCap, 
  QrCode, 
  ExternalLink, 
  X, 
  Clock, 
  CheckCircle2, 
  Lock, 
  MessageCircle 
} from 'lucide-react';

interface ZaloGroup {
  name: string;
  url: string;
  qrImagePath: string;
}

interface CohortCommunity {
  cohort: string;
  name: string;
  gradYear: string;
  description: string;
  groups?: ZaloGroup[];
  status: 'active' | 'coming_soon';
}

const COMMUNITIES: CohortCommunity[] = [
  {
    cohort: 'K28',
    name: 'Cộng đồng Tốt nghiệp K28',
    gradYear: '2026',
    description: 'Kết nối việc làm, chia sẻ khóa luận, thực tập và thủ tục xét tốt nghiệp đợt sắp tới.',
    status: 'active',
    groups: [
      {
        name: 'Nhóm 1 (K28)',
        url: 'https://zalo.me/g/qkwrni958',
        qrImagePath: '/zalo/qr-k28-1.jpg',
      },
      {
        name: 'Nhóm 2 (K28)',
        url: 'https://zalo.me/g/utybpb451',
        qrImagePath: '/zalo/qr-k28-2.jpg',
      },
    ],
  },
  {
    cohort: 'K29',
    name: 'Cộng đồng Tốt nghiệp K29',
    gradYear: '2027',
    description: 'Định hướng chuyên ngành, đồ án môn học, tích lũy chứng chỉ ngoại ngữ và chuẩn đầu ra.',
    status: 'active',
    groups: [
      {
        name: 'Nhóm Chính Thức (K29)',
        url: 'https://zalo.me/g/n1zomuednvdfwl4aezc1',
        qrImagePath: '/zalo/qr-k29.jpg',
      },
    ],
  },
  {
    cohort: 'K30',
    name: 'Cộng đồng Tốt nghiệp K30',
    gradYear: '2028',
    description: 'Hỗ trợ phương pháp học đại cương, tín chỉ Giáo dục thể chất, GDQP và lộ trình học tập.',
    status: 'coming_soon',
  },
  {
    cohort: 'K31',
    name: 'Cộng đồng Tốt nghiệp K31',
    gradYear: '2029',
    description: 'Trao đổi tài liệu môn học cơ sở ngành, kết nối mentor học tập và hoạt động ngoại khóa.',
    status: 'coming_soon',
  },
  {
    cohort: 'K32',
    name: 'Cộng đồng Tốt nghiệp K32',
    gradYear: '2030',
    description: 'Cổng tiếp nhận tân sinh viên, hướng dẫn đăng ký tín chỉ và làm quen môi trường đại học.',
    status: 'coming_soon',
  },
];

export default function CongDongPage() {
  const [selectedCohort, setSelectedCohort] = useState<CohortCommunity | null>(null);
  const [activeGroupIndex, setActiveGroupIndex] = useState<number>(0);

  const handleOpenCohort = (item: CohortCommunity) => {
    setSelectedCohort(item);
    setActiveGroupIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display','Segoe_UI',sans-serif] antialiased selection:bg-[#0071e3] selection:text-white pb-24">
      
      {/* 1. TIÊU ĐỀ TRANG CĂN GIỮA THEO STYLE APPLE */}
      <section className="w-full pt-14 pb-8 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center">
        <div className="space-y-3 text-center max-w-3xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#b23b35] text-white text-xs font-semibold rounded-full shadow-sm">
              <GraduationCap size={16} className="text-red-100" />
              <span>Mạng lưới hỗ trợ học vụ & Tốt nghiệp</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-tight">
            Cộng Đồng Tốt Nghiệp <span className="text-[#b23b35]">K28 - K32</span>
          </h1>

          <p className="text-[17px] leading-[25px] font-normal text-[#86868b] max-w-2xl mx-auto">
            Không gian trao đổi đồ án, cập nhật thông báo tốt nghiệp và kết nối sinh viên theo từng khóa đào tạo.
          </p>
        </div>
      </section>

      {/* 2. GRID DANH SÁCH CÁC KHÓA K28 - K32 */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMUNITIES.map((item) => {
            const isActive = item.status === 'active';

            return (
              <div
                key={item.cohort}
                onClick={() => handleOpenCohort(item)}
                className="group relative bg-white rounded-[26px] p-6 sm:p-7 border border-[#e5e5ea]/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Badge & Cohort Box */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-transform duration-300 group-hover:scale-105 shadow-sm ${
                        isActive
                          ? 'bg-red-50 text-[#b23b35] border border-red-200/60'
                          : 'bg-[#f5f5f7] text-[#86868b]'
                      }`}
                    >
                      {item.cohort}
                    </div>

                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold shadow-sm">
                        <CheckCircle2 size={13} className="text-emerald-600" />
                        <span>ĐANG HOẠT ĐỘNG</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-[#86868b] text-[11px] font-semibold">
                        <Clock size={13} />
                        <span>SẮP MỞ</span>
                      </span>
                    )}
                  </div>

                  {/* Tên & Dự kiến tốt nghiệp */}
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors leading-snug">
                      {item.name}
                    </h2>
                    <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                      Dự kiến tốt nghiệp: <span className="text-[#1d1d1f]">{item.gradYear}</span>
                    </p>
                  </div>

                  {/* Mô tả nhóm */}
                  <p className="text-[14px] sm:text-[15px] leading-[22px] font-normal text-[#515154] line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Footer thẻ */}
                <div className="pt-4 mt-5 border-t border-[#f5f5f7] flex items-center justify-between text-xs sm:text-[13px] font-semibold">
                  {isActive ? (
                    <>
                      <span className="flex items-center gap-2 text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                        <QrCode size={17} className="text-[#b23b35]" />
                        <span>Quét QR / Vào nhóm ({item.groups?.length} nhóm)</span>
                      </span>
                      <ExternalLink size={15} className="text-[#86868b] group-hover:text-[#0071e3] group-hover:translate-x-0.5 transition-all" />
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-1.5 text-[#86868b]">
                        <Lock size={14} />
                        <span>Sắp mở liên kết</span>
                      </span>
                      <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60">
                        Sắp ra mắt
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. MODAL HIỂN THỊ QR & LINK ZALO */}
      {selectedCohort && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-[28px] p-6 text-center space-y-4 shadow-2xl border border-[#e5e5ea] max-h-[95vh] overflow-y-auto">
            {/* Nút đóng */}
            <button
              onClick={() => setSelectedCohort(null)}
              className="absolute top-4 right-4 p-2 text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] rounded-full transition cursor-pointer"
            >
              <X size={20} />
            </button>

            {selectedCohort.status === 'active' && selectedCohort.groups ? (
              <>
                <div className="space-y-1.5 pt-1">
                  <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    <CheckCircle2 size={13} /> Khóa {selectedCohort.cohort}
                  </div>
                  <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight">
                    {selectedCohort.name}
                  </h3>
                  <p className="text-xs text-[#86868b]">
                    Quét mã QR hoặc nhấn nút bên dưới để tham gia nhóm
                  </p>
                </div>

                {/* Tab chuyển nhóm nếu có nhiều nhóm (K28) */}
                {selectedCohort.groups.length > 1 && (
                  <div className="flex rounded-xl bg-[#f5f5f7] p-1 border border-[#e5e5ea]">
                    {selectedCohort.groups.map((group, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveGroupIndex(index)}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                          activeGroupIndex === index
                            ? 'bg-[#b23b35] text-white shadow-sm'
                            : 'text-[#515154] hover:text-[#1d1d1f]'
                        }`}
                      >
                        {group.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Khung ảnh QR gốc */}
                <div className="flex justify-center">
                  <div className="relative w-64 h-[360px] rounded-2xl overflow-hidden shadow-sm border border-[#e5e5ea] bg-[#f5f5f7]">
                    <Image
                      src={selectedCohort.groups[activeGroupIndex].qrImagePath}
                      alt={selectedCohort.groups[activeGroupIndex].name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Nút vào Zalo */}
                <div className="space-y-2 pt-2">
                  <Link
                    href={selectedCohort.groups[activeGroupIndex].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0068ff] hover:bg-[#0055d4] text-white font-bold py-3.5 px-5 rounded-2xl shadow-md transition text-sm sm:text-[15px] cursor-pointer hover:scale-[1.01]"
                  >
                    <MessageCircle size={18} />
                    <span>Tham gia {selectedCohort.groups[activeGroupIndex].name}</span>
                    <ExternalLink size={15} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedCohort(null)}
                    className="w-full py-2 text-xs text-[#86868b] hover:text-[#1d1d1f] transition cursor-pointer font-medium"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              </>
            ) : (
              /* Giao diện popup Coming Soon (K30, K31, K32) */
              <div className="py-5 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center mx-auto text-amber-600">
                  <Clock size={32} />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                    <span>Khóa {selectedCohort.cohort} • Sắp ra mắt</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight">
                    {selectedCohort.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#86868b] max-w-xs mx-auto leading-relaxed">
                    Cộng đồng Zalo cho khóa này đang trong giai đoạn chuẩn bị và sẽ sớm mở liên kết theo kế hoạch của ban chủ nhiệm.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCohort(null)}
                  className="w-full py-3 px-5 bg-[#f5f5f7] hover:bg-[#e5e5ea] text-[#1d1d1f] rounded-2xl text-xs sm:text-sm font-bold border border-[#e5e5ea] transition cursor-pointer"
                >
                  Đã hiểu
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}