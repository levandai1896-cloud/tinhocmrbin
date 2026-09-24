'use client';

import { useState } from 'react';
import { Activity, CheckCircle2, AlertCircle, RotateCcw, ArrowRight } from 'lucide-react';

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
    <div 
      className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased selection:bg-[#0071e3] selection:text-white pb-24"
      style={{
        fontFamily: "'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        letterSpacing: '-0.011em',
      }}
    >
      
      {/* 1. TIÊU ĐỀ TRANG (TIÊU ĐỀ ĐÃ ĐỔI VỀ LẠI MÀU ĐEN TEXT-[#1D1D1F]) */}
      <section className="w-full pt-5 pb-6 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center">
        <div className="space-y-3 text-center max-w-2xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#ff7a00] text-white text-xs font-semibold rounded-full shadow-[0_2px_8px_rgba(255,122,0,0.3)]">
              <Activity size={15} className="text-orange-100" />
              <span>Công cụ quy đổi chuẩn đầu ra DTU</span>
            </div>
          </div>

          {/* Tiêu đề màu đen chuẩn Apple */}
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-tight">
            Tính Điểm Thể Dục <span className="text-[#86868b] font-medium"></span>
          </h1>

          <p className="text-[17px] leading-[25px] font-normal text-[#86868b] max-w-xl mx-auto">
            Nhập điểm tổng kết của 3 học phần thể dục để kiểm tra điều kiện đạt chuẩn chứng chỉ thể chất. Lưu ý: Điểm trung bình hệ 4.0 phải từ 2.0 mới đạt.
          </p>
        </div>
      </section>

      {/* 2. KHUNG CARD CHÍNH */}
      <section className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[28px] p-6 sm:p-9 border border-[#e5e5ea]/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-6">
          
          {/* Thông báo lỗi */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200/80 text-[#b23b35] text-sm rounded-2xl flex items-center gap-2.5 font-medium">
              <AlertCircle size={18} className="shrink-0 text-[#b23b35]" />
              <span>{error}</span>
            </div>
          )}

          {/* Form nhập liệu */}
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              
              {/* Môn 1 */}
              <div className="space-y-2 text-center">
                <label className="block text-[14px] sm:text-[15px] font-bold tracking-tight text-[#1d1d1f]">
                  Điểm Môn Thể Dục 1
                </label>
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
                  className="w-full bg-[#f5f5f7] focus:bg-white border border-[#e5e5ea] focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 rounded-2xl px-4 py-3.5 text-[#1d1d1f] text-center text-2xl font-bold tracking-tight focus:outline-none transition shadow-sm placeholder:text-[#c7c7cc]"
                />
              </div>

              {/* Môn 2 */}
              <div className="space-y-2 text-center">
                <label className="block text-[14px] sm:text-[15px] font-bold tracking-tight text-[#1d1d1f]">
                  Điểm Môn Thể Dục 2
                </label>
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
                  className="w-full bg-[#f5f5f7] focus:bg-white border border-[#e5e5ea] focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 rounded-2xl px-4 py-3.5 text-[#1d1d1f] text-center text-2xl font-bold tracking-tight focus:outline-none transition shadow-sm placeholder:text-[#c7c7cc]"
                />
              </div>

              {/* Môn 3 */}
              <div className="space-y-2 text-center">
                <label className="block text-[14px] sm:text-[15px] font-bold tracking-tight text-[#1d1d1f]">
                  Điểm Môn Thể Dục 3
                </label>
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
                  className="w-full bg-[#f5f5f7] focus:bg-white border border-[#e5e5ea] focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10 rounded-2xl px-4 py-3.5 text-[#1d1d1f] text-center text-2xl font-bold tracking-tight focus:outline-none transition shadow-sm placeholder:text-[#c7c7cc]"
                />
              </div>

            </div>

            {/* Hàng nút bấm */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                className="w-full sm:flex-1 bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold py-3.5 px-6 rounded-2xl text-sm sm:text-base transition-all duration-200 shadow-[0_4px_14px_rgba(0,113,227,0.3)] hover:shadow-[0_6px_20px_rgba(0,113,227,0.4)] hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Tính Kết Quả Ngay</span>
                <ArrowRight size={17} />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#f5f5f7] hover:bg-[#e5e5ea] border border-[#e5e5ea] text-[#1d1d1f] font-semibold py-3.5 px-6 rounded-2xl text-sm sm:text-base transition duration-200 cursor-pointer"
              >
                <RotateCcw size={16} />
                <span>Nhập lại</span>
              </button>
            </div>
          </form>

          {/* 3. KHỐI HIỂN THỊ KẾT QUẢ */}
          {result && (
            <div className="space-y-6 pt-5 border-t border-[#f5f5f7] animate-in fade-in duration-300">
              
              {/* Chi tiết 3 môn */}
              <div className="border border-[#e5e5ea]/80 p-5 bg-[#f5f5f7] rounded-2xl space-y-3">
                <h3 className="text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider text-center">
                  Chi tiết điểm quy đổi sang hệ 4.0
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white border border-[#e5e5ea]/80 p-4 rounded-2xl text-center shadow-sm">
                    <span className="text-[13px] text-[#1d1d1f] font-bold uppercase block">
                      Môn TD 1 ({result.m1_grade})
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mt-1 block tracking-tight">
                      {result.m1_4.toFixed(2)}
                    </span>
                  </div>

                  <div className="bg-white border border-[#e5e5ea]/80 p-4 rounded-2xl text-center shadow-sm">
                    <span className="text-[13px] text-[#1d1d1f] font-bold uppercase block">
                      Môn TD 2 ({result.m2_grade})
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mt-1 block tracking-tight">
                      {result.m2_4.toFixed(2)}
                    </span>
                  </div>

                  <div className="bg-white border border-[#e5e5ea]/80 p-4 rounded-2xl text-center shadow-sm">
                    <span className="text-[13px] text-[#1d1d1f] font-bold uppercase block">
                      Môn TD 3 ({result.m3_grade})
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mt-1 block tracking-tight">
                      {result.m3_4.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Điểm trung bình cộng & Thẻ trạng thái */}
              <div className="flex flex-col items-center justify-center text-center p-7 bg-[#f5f5f7] border border-[#e5e5ea]/80 rounded-[24px] space-y-3.5">
                <span className="text-[15px] sm:text-[17px] font-bold text-[#1d1d1f] uppercase tracking-wider block">
                  Điểm trung bình GDTC hệ 4.0
                </span>
                
                <span className="text-5xl sm:text-6xl font-extrabold text-[#1d1d1f] tracking-tight leading-none">
                  {result.avg}
                </span>

                <div className="pt-2">
                  {result.isPass ? (
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold text-sm sm:text-[15px] uppercase tracking-wide rounded-full shadow-sm">
                      <CheckCircle2 size={20} className="shrink-0 text-emerald-100" />
                      <span>Chúc mừng: bạn đã đạt chứng chỉ thể chất</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#b23b35] text-white font-bold text-sm sm:text-[15px] uppercase tracking-wide rounded-full shadow-sm">
                      <AlertCircle size={20} className="shrink-0 text-red-100" />
                      <span>Rất tiếc bạn chưa đạt: Thiếu {result.deficit} điểm (Cần &ge; 2.0)</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

    </div>
  );
}