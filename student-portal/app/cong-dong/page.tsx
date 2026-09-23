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
    <div className="min-h-screen flex flex-col items-center pt-8 pb-16 px-4 bg-[#edeef2] text-neutral-900 font-sans relative selection:bg-[#b23b35] selection:text-white">
      {/* Lớp nền nhám mờ SVG */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-45 mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/70 via-transparent to-black/5 z-0" />

      {/* 1. TIÊU ĐỀ TRANG: KHOẢNG CÁCH GIÃN RỘNG THOÁNG NHƯ KHÓA HỌC TIN */}
      <div className="relative z-10 text-center space-y-4 pt-4 mb-10 max-w-3xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b23b35] text-white text-xs font-semibold shadow-sm">
            <GraduationCap size={14} className="text-red-100" />
            <span>Mạng lưới hỗ trợ học vụ & Tốt nghiệp</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-normal uppercase pt-1">
          CỘNG ĐỒNG TỐT NGHIỆP <span className="text-[#b23b35]">K28 - K32</span>
        </h1>

        <p className="text-neutral-600 text-xs sm:text-sm font-normal tracking-wide max-w-xl mx-auto">
          Không gian trao đổi đồ án, cập nhật thông báo tốt nghiệp và kết nối sinh viên theo từng khóa đào tạo
        </p>
      </div>

      {/* 2. Grid danh sách các khóa K28 - K32 */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {COMMUNITIES.map((item) => {
          const isActive = item.status === 'active';

          return (
            <div
              key={item.cohort}
              onClick={() => handleOpenCohort(item)}
              className={`group relative bg-white/95 backdrop-blur-sm border rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-xl ${
                isActive
                  ? 'border-neutral-300 hover:border-[#b23b35] hover:-translate-y-1'
                  : 'border-neutral-200/80 hover:border-amber-400/80 opacity-90 hover:opacity-100'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-bold text-lg transition-transform group-hover:scale-105 shadow-sm ${
                      isActive
                        ? 'bg-red-50 border-red-200 text-[#b23b35]'
                        : 'bg-neutral-100 border-neutral-200 text-neutral-500'
                    }`}
                  >
                    {item.cohort}
                  </div>

                  {/* Badge Trạng thái */}
                  {isActive ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold shadow-sm">
                      <CheckCircle2 size={12} className="text-emerald-600" />
                      <span>HOẠT ĐỘNG</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold shadow-sm">
                      <Clock size={12} className="text-amber-600" />
                      <span>COMING SOON</span>
                    </span>
                  )}
                </div>

                <div>
                  <h2
                    className={`text-base font-bold transition-colors ${
                      isActive ? 'text-neutral-900 group-hover:text-[#b23b35]' : 'text-neutral-700'
                    }`}
                  >
                    {item.name}
                  </h2>
                  <span className="text-[11px] font-medium text-neutral-500">
                    Dự kiến tốt nghiệp: {item.gradYear}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 font-normal">
                  {item.description}
                </p>
              </div>

              <div className="pt-5 border-t border-neutral-100 mt-4 flex items-center justify-between text-xs font-semibold">
                {isActive ? (
                  <>
                    <span className="flex items-center gap-1.5 text-neutral-700 group-hover:text-[#b23b35] transition-colors">
                      <QrCode size={15} className="text-[#b23b35]" /> Quét QR / Vào nhóm ({item.groups?.length} nhóm)
                    </span>
                    <ExternalLink size={14} className="text-neutral-400 group-hover:text-[#b23b35] group-hover:translate-x-0.5 transition-all" />
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-1.5 text-neutral-400">
                      <Lock size={13} /> Sắp mở liên kết
                    </span>
                    <span className="text-[11px] text-amber-600 font-medium">Chờ mở nhóm</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Modal hiển thị QR & link Zalo */}
      {selectedCohort && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white border border-neutral-300 rounded-3xl p-5 text-center space-y-4 shadow-2xl max-h-[95vh] overflow-y-auto">
            {/* Nút đóng */}
            <button
              onClick={() => setSelectedCohort(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {selectedCohort.status === 'active' && selectedCohort.groups ? (
              <>
                <div className="space-y-1 pt-1">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    <CheckCircle2 size={13} /> Khóa {selectedCohort.cohort}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    {selectedCohort.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-normal">
                    Quét thẻ QR hoặc bấm nút bên dưới để vào nhóm
                  </p>
                </div>

                {/* Tab chuyển nhóm nếu có nhiều nhóm (K28) */}
                {selectedCohort.groups.length > 1 && (
                  <div className="flex rounded-xl bg-neutral-100 p-1 border border-neutral-200">
                    {selectedCohort.groups.map((group, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveGroupIndex(index)}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                          activeGroupIndex === index
                            ? 'bg-[#b23b35] text-white shadow-sm'
                            : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                      >
                        {group.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Khung ảnh QR gốc */}
                <div className="flex justify-center">
                  <div className="relative w-64 h-[380px] rounded-2xl overflow-hidden shadow-md border border-neutral-200 bg-neutral-50">
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
                <div className="space-y-2 pt-1">
                  <Link
                    href={selectedCohort.groups[activeGroupIndex].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0068ff] hover:bg-[#0055d4] text-white font-bold py-3 px-4 rounded-2xl shadow-sm transition text-sm cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>Tham gia {selectedCohort.groups[activeGroupIndex].name}</span>
                    <ExternalLink size={14} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedCohort(null)}
                    className="w-full py-1.5 text-xs text-neutral-500 hover:text-neutral-800 transition cursor-pointer font-medium"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              </>
            ) : (
              /* Giao diện popup Coming Soon (K30, K31, K32) */
              <div className="py-4 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
                  <Clock size={32} />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                    <span>Khóa {selectedCohort.cohort} • Coming Soon</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    {selectedCohort.name}
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed font-normal">
                    Cộng đồng Zalo cho khóa này đang trong giai đoạn chuẩn bị và sẽ chính thức mở liên kết theo kế hoạch của ban chủ nhiệm.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCohort(null)}
                  className="w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-2xl text-xs font-semibold border border-neutral-200 transition cursor-pointer"
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