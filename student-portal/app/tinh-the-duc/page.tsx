'use client';

import { useState } from 'react';
import { Activity, CheckCircle, AlertCircle, RotateCcw, ArrowRight } from 'lucide-react';

function convertScore(s: number): { score4: number; grade: string } {
  if (s >= 9.5) return { score4: 4.0, grade: 'A+' };
  if (s >= 8.5) return { score4: 4.0, grade: 'A' };
  if (s >= 8.0) return { score4: 3.65, grade: 'A-' };
  if (s >= 7.5) return { score4: 3.33, grade: 'B+' };
  if (s >= 7.0) return { score4: 3.0, grade: 'B' };
  if (s >= 6.5) return { score4: 2.65, grade: 'B-' };
  if (s >= 6.0) return { score4: 2.33, grade: 'C+' };
  if (s >= 5.5) return { score4: 2.0, grade: 'C' };
  if (s >= 4.5) return { score4: 1.65, grade: 'C-' };
  if (s >= 4.0) return { score4: 1.0, grade: 'D' };
  return { score4: 0.0, grade: 'F' };
}

export default function TinhDiemTheDucPage() {
  const [score1, setScore1] = useState<string>('');
  const [score2, setScore2] = useState<string>('');
  const [score3, setScore3] = useState<string>('');

  const [result, setResult] = useState<{
    m1_4: number;
    m1_grade: string;
    m2_4: number;
    m2_grade: string;
    m3_4: number;
    m3_grade: string;
    avg: string;
    isPass: boolean;
    deficit: string;
  } | null>(null);

  const [error, setError] = useState<string>('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const s1 = parseFloat(score1);
    const s2 = parseFloat(score2);
    const s3 = parseFloat(score3);

    if (isNaN(s1) || isNaN(s2) || isNaN(s3)) {
      setError('Vui lòng nhập điểm hợp lệ cho tất cả các môn.');
      setResult(null);
      return;
    }

    if (s1 < 0 || s1 > 10 || s2 < 0 || s2 > 10 || s3 < 0 || s3 > 10) {
      setError('Điểm số phải nằm trong thang điểm từ 0 đến 10.');
      setResult(null);
      return;
    }

    const m1 = convertScore(s1);
    const m2 = convertScore(s2);
    const m3 = convertScore(s3);

    const avgScore = (m1.score4 + m2.score4 + m3.score4) / 3;
    const isPass = avgScore >= 2.0;
    const deficit = !isPass ? (2.0 - avgScore).toFixed(2) : '0.00';

    setResult({
      m1_4: m1.score4,
      m1_grade: m1.grade,
      m2_4: m2.score4,
      m2_grade: m2.grade,
      m3_4: m3.score4,
      m3_grade: m3.grade,
      avg: avgScore.toFixed(2),
      isPass,
      deficit,
    });
  };

  const handleReset = () => {
    setScore1('');
    setScore2('');
    setScore3('');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 pb-16 px-4 bg-[#edeef2] text-neutral-900 font-sans relative selection:bg-[#b23b35] selection:text-white">
      
      {/* Nền nhám mờ SVG */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-45 mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/70 via-transparent to-black/5 z-0" />

      {/* 1. TIÊU ĐỀ TRANG: FONT MỀM MẠI, GỌN GÀNG */}
      <div className="relative z-10 text-center space-y-3.5 pt-4 mb-9 max-w-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#b23b35] text-white text-xs font-semibold rounded-full shadow-sm">
            <Activity size={14} className="text-red-100" />
            <span>Công cụ quy đổi chuẩn đầu ra DTU</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight uppercase">
          TÍNH ĐIỂM THỂ DỤC <span className="text-[#b23b35]">(HỆ 4.0)</span>
        </h1>

        <p className="text-neutral-600 text-xs sm:text-sm font-normal tracking-wide">
          Nhập điểm tổng kết hệ 10 của 3 học phần GDTC để kiểm tra điều kiện đạt chuẩn tốt nghiệp
        </p>
      </div>

      {/* 2. KHUNG CARD CHÍNH */}
      <div className="relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-sm border border-neutral-300 rounded-3xl p-6 sm:p-9 shadow-xl shadow-neutral-900/5 space-y-7">
        
        {/* Thông báo lỗi */}
        {error && (
          <div className="p-4 bg-red-50/80 border border-red-200 text-[#b23b35] text-xs sm:text-sm rounded-2xl flex items-center gap-2.5 font-medium">
            <AlertCircle size={18} className="shrink-0 text-[#b23b35]" />
            <span>{error}</span>
          </div>
        )}

        {/* Form nhập liệu */}
        <form onSubmit={handleCalculate} className="space-y-7">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            
            {/* Môn 1 */}
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-normal text-neutral-700 uppercase text-center">
                MÔN THỂ DỤC 1
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  inputMode="decimal"
                  placeholder="7.5"
                  value={score1}
                  onChange={(e) => setScore1(e.target.value)}
                  required
                  className="w-full bg-neutral-50/60 hover:bg-neutral-50 focus:bg-white border border-neutral-300 hover:border-neutral-400 focus:border-[#b23b35] focus:ring-4 focus:ring-[#b23b35]/10 rounded-2xl px-4 py-3.5 text-neutral-900 text-center text-2xl font-bold tracking-tight focus:outline-none transition placeholder:text-neutral-300 shadow-inner"
                />
              </div>
            </div>

            {/* Môn 2 */}
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-normal text-neutral-700 uppercase text-center">
                MÔN THỂ DỤC 2
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  inputMode="decimal"
                  placeholder="6.0"
                  value={score2}
                  onChange={(e) => setScore2(e.target.value)}
                  required
                  className="w-full bg-neutral-50/60 hover:bg-neutral-50 focus:bg-white border border-neutral-300 hover:border-neutral-400 focus:border-[#b23b35] focus:ring-4 focus:ring-[#b23b35]/10 rounded-2xl px-4 py-3.5 text-neutral-900 text-center text-2xl font-bold tracking-tight focus:outline-none transition placeholder:text-neutral-300 shadow-inner"
                />
              </div>
            </div>

            {/* Môn 3 */}
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-normal text-neutral-700 uppercase text-center">
                MÔN THỂ DỤC 3
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  inputMode="decimal"
                  placeholder="8.0"
                  value={score3}
                  onChange={(e) => setScore3(e.target.value)}
                  required
                  className="w-full bg-neutral-50/60 hover:bg-neutral-50 focus:bg-white border border-neutral-300 hover:border-neutral-400 focus:border-[#b23b35] focus:ring-4 focus:ring-[#b23b35]/10 rounded-2xl px-4 py-3.5 text-neutral-900 text-center text-2xl font-bold tracking-tight focus:outline-none transition placeholder:text-neutral-300 shadow-inner"
                />
              </div>
            </div>

          </div>

          {/* Hàng nút bấm */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <button
              type="submit"
              className="w-full sm:flex-1 bg-[#b23b35] hover:bg-[#9b302a] active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-2xl uppercase tracking-normal text-xs sm:text-sm transition duration-200 shadow-md shadow-red-900/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Tính Kết Quả Ngay</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 active:scale-[0.99] border border-neutral-200 text-neutral-700 font-semibold py-3.5 px-5 rounded-2xl uppercase tracking-normal text-xs sm:text-sm transition duration-200 cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Nhập lại</span>
            </button>
          </div>
        </form>

        {/* 3. KHỐI HIỂN THỊ KẾT QUẢ */}
        {result && (
          <div className="space-y-5 pt-4 border-t border-neutral-200/90 animate-in fade-in-50 duration-300">
            
            {/* Chi tiết 3 môn */}
            <div className="border border-neutral-200/90 p-5 bg-neutral-50/70 rounded-2xl space-y-3.5">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wide text-center">
                Chi tiết điểm quy đổi sang hệ 4.0
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white border border-neutral-200 p-4 rounded-2xl text-center shadow-sm">
                  <span className="text-[11px] text-neutral-500 font-medium uppercase block">
                    Môn TD 1 ({result.m1_grade})
                  </span>
                  <span className="text-2xl font-bold text-neutral-900 mt-1 block tracking-tight">
                    {result.m1_4.toFixed(2)}
                  </span>
                </div>

                <div className="bg-white border border-neutral-200 p-4 rounded-2xl text-center shadow-sm">
                  <span className="text-[11px] text-neutral-500 font-medium uppercase block">
                    Môn TD 2 ({result.m2_grade})
                  </span>
                  <span className="text-2xl font-bold text-neutral-900 mt-1 block tracking-tight">
                    {result.m2_4.toFixed(2)}
                  </span>
                </div>

                <div className="bg-white border border-neutral-200 p-4 rounded-2xl text-center shadow-sm">
                  <span className="text-[11px] text-neutral-500 font-medium uppercase block">
                    Môn TD 3 ({result.m3_grade})
                  </span>
                  <span className="text-2xl font-bold text-neutral-900 mt-1 block tracking-tight">
                    {result.m3_4.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Điểm trung bình cộng & Thẻ trạng thái */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 p-5 bg-neutral-100/80 border border-neutral-200 rounded-2xl">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs font-bold text-[#b23b35] uppercase block tracking-wide">
                  ĐIỂM TRUNG BÌNH GDTC HỆ 4.0
                </span>
                <span className="text-4xl sm:text-5xl font-extrabold text-neutral-900 block tracking-tight">
                  {result.avg}
                </span>
              </div>

              <div>
                {result.isPass ? (
                  <div className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wide rounded-xl shadow-sm">
                    <CheckCircle size={17} className="shrink-0 text-emerald-100" />
                    <span>Chúc mừng: Đã đạt chứng chỉ thể chất</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-5 py-3 bg-[#b23b35] text-white font-bold text-xs uppercase tracking-wide rounded-xl shadow-sm">
                    <AlertCircle size={17} className="shrink-0 text-red-100" />
                    <span>Chưa đạt: Thiếu {result.deficit} điểm (Cần &ge; 2.0)</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}