'use client';

import { useState } from 'react';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  Minus 
} from 'lucide-react';

// Bảng quy đổi điểm hệ 10 sang hệ 4 & điểm chữ
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

// Xếp loại học lực theo GPA tích lũy hệ 4.0
function getClassification(gpa: number): { label: string; color: string } {
  if (gpa >= 3.6) return { label: 'Xuất sắc', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' };
  if (gpa >= 3.2) return { label: 'Giỏi', color: 'text-blue-700 bg-blue-50 border-blue-300' };
  if (gpa >= 2.5) return { label: 'Khá', color: 'text-amber-700 bg-amber-50 border-amber-300' };
  if (gpa >= 2.0) return { label: 'Trung bình', color: 'text-orange-700 bg-orange-50 border-orange-300' };
  return { label: 'Yếu / Kém', color: 'text-[#b23b35] bg-red-50 border-red-200' };
}

// --- THƯỚC ĐO VÒM PARABOL THANG ĐIỂM 0 - 4 ---
function GpaParabolArc({ gpa }: { gpa: number }) {
  const safeGpa = typeof gpa === 'number' && !isNaN(gpa) ? gpa : 0;
  const clampedGpa = Math.min(Math.max(safeGpa, 0), 4);
  const ratio = clampedGpa / 4;

  const cx = 130;
  const cy = 110;
  const r = 80;

  const arcLength = Math.PI * r;
  const strokeDashoffset = arcLength * (1 - ratio);

  const angle = Math.PI - ratio * Math.PI;
  const pointerX = cx + r * Math.cos(angle);
  const pointerY = cy - r * Math.sin(angle);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-[260px] h-[130px] flex items-center justify-center">
        <svg viewBox="0 0 260 135" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="parabolGpaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b23b35" />
              <stop offset="45%" stopColor="#f59e0b" />
              <stop offset="75%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="#e5e5ea"
            strokeWidth="12"
            strokeLinecap="round"
          />

          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="url(#parabolGpaGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
          />

          {clampedGpa > 0 && !isNaN(pointerX) && !isNaN(pointerY) && (
            <circle
              cx={pointerX}
              cy={pointerY}
              r="7"
              fill="#ffffff"
              stroke="#b23b35"
              strokeWidth="2.5"
              className="transition-all duration-700 ease-out shadow-md"
            />
          )}

          <text x={cx - r - 10} y={cy + 15} fill="#86868b" fontSize="11" fontWeight="600" textAnchor="middle">0.0</text>
          <text x={cx} y={cy - r - 8} fill="#86868b" fontSize="11" fontWeight="600" textAnchor="middle">2.0</text>
          <text x={cx + r + 10} y={cy + 15} fill="#86868b" fontSize="11" fontWeight="600" textAnchor="middle">4.0</text>
        </svg>

        <div className="absolute bottom-0 flex flex-col items-center">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
              {clampedGpa.toFixed(2)}
            </span>
            <span className="text-xs font-semibold text-[#86868b]">/ 4.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ĐỒ THỊ ĐƯỜNG CONG TIẾN TRÌNH GPA THEO KỲ ---
interface SemesterTrendItem {
  semName: string;
  gpa: number;
  credits: number;
}

function GpaTrendChart({ data }: { data: SemesterTrendItem[] }) {
  const width = 760;
  const height = 240;
  const paddingX = 60;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = data.map((item, index) => {
    const x = data.length === 1 
      ? width / 2 
      : paddingX + (index / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (Math.min(Math.max(item.gpa, 0), 4) / 4) * chartHeight;
    return { x, y, ...item };
  });

  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cx = (p0.x + p1.x) / 2;
      path += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  const linePath = createSmoothPath(points);

  const areaPath = points.length > 1
    ? `${linePath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`
    : '';

  return (
    <div className="bg-white rounded-[26px] p-6 sm:p-7 border border-[#e5e5ea]/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f5f5f7] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-neutral-100 text-[#1d1d1f] border border-[#e5e5ea] flex items-center justify-center">
            <TrendingUp size={18} />
          </div>
          <div>
            <h3 className="text-base sm:text-[22px] font-bold text-[#1d1d1f] tracking-tight">
              Đồ thị biến thiên theo học kỳ
            </h3>
            <p className="text-s text-[#86868b] font-normal">
              Theo dõi sự tăng trưởng và phong độ học tập qua từng kỳ học
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-s text-[#515154] font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Tăng điểm
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b23b35] inline-block"></span> Giảm điểm
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto [scrollbar-width:none]">
        <div className="min-w-[620px] relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1d1d1f" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#1d1d1f" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="curveLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b23b35" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>

            {[0, 1, 2, 3, 4].map((gpaVal) => {
              const y = paddingTop + chartHeight - (gpaVal / 4) * chartHeight;
              return (
                <g key={gpaVal}>
                  <line
                    x1={paddingX - 10}
                    y1={y}
                    x2={width - paddingX + 10}
                    y2={y}
                    stroke="#e5e5ea"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingX - 18}
                    y={y + 4}
                    fill="#86868b"
                    fontSize="11"
                    fontWeight="600"
                    textAnchor="end"
                  >
                    {gpaVal.toFixed(1)}
                  </text>
                </g>
              );
            })}

            {areaPath && (
              <path d={areaPath} fill="url(#areaGradient)" className="transition-all duration-700 ease-out" />
            )}

            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="url(#curveLineGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            )}

            {points.map((pt, idx) => {
              const prevGpa = idx > 0 ? points[idx - 1].gpa : null;
              const diff = prevGpa !== null ? pt.gpa - prevGpa : 0;
              const isUp = diff > 0.001;
              const isDown = diff < -0.001;

              return (
                <g key={idx} className="transition-all duration-500">
                  <line
                    x1={pt.x}
                    y1={pt.y}
                    x2={pt.x}
                    y2={height - paddingBottom}
                    stroke="#e5e5ea"
                    strokeWidth="1"
                  />

                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="6"
                    fill={isUp ? '#059669' : isDown ? '#b23b35' : '#d97706'}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="cursor-pointer hover:scale-125 transition-transform shadow-sm"
                  />

                  <text
                    x={pt.x}
                    y={height - paddingBottom + 20}
                    fill="#515154"
                    fontSize="12"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {pt.semName}
                  </text>

                  <text
                    x={pt.x}
                    y={pt.y - 12}
                    fill="#1d1d1f"
                    fontSize="13"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {pt.gpa.toFixed(2)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {points.map((pt, idx) => {
          const prevGpa = idx > 0 ? points[idx - 1].gpa : null;
          const diff = prevGpa !== null ? pt.gpa - prevGpa : null;

          return (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex items-center justify-between"
            >
              <div>
                <span className="text-xs text-[#86868b] font-semibold block">{pt.semName}</span>
                <span className="text-base font-bold text-[#1d1d1f]">{pt.gpa.toFixed(2)}</span>
              </div>

              {diff === null ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e5e5ea] text-[#515154] flex items-center gap-1">
                  <Minus size={11} /> Khởi đầu
                </span>
              ) : diff > 0 ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-0.5">
                  <TrendingUp size={12} /> +{diff.toFixed(2)}
                </span>
              ) : diff < 0 ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-[#b23b35] flex items-center gap-0.5">
                  <TrendingDown size={12} /> {diff.toFixed(2)}
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e5e5ea] text-[#515154] flex items-center gap-1">
                  <Minus size={11} /> 0.00
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface Course {
  id: string;
  name: string;
  credits: string;
  score10: string;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

export default function TinhGPAPage() {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: 'sem-1',
      name: 'Học kỳ 1',
      courses: [
        { id: 'c-1', name: 'Nhập môn Tin học', credits: '3', score10: '' },
        { id: 'c-2', name: 'Toán cao cấp', credits: '3', score10: '' },
        { id: 'c-3', name: 'Triết học Mác - Lênin', credits: '2', score10: '' },
      ],
    },
  ]);

  const addSemester = () => {
    const nextSemNumber = semesters.length + 1;
    const newSem: Semester = {
      id: `sem-${Date.now()}`,
      name: `Học kỳ ${nextSemNumber}`,
      courses: [
        { id: `c-${Date.now()}-1`, name: '', credits: '3', score10: '' },
        { id: `c-${Date.now()}-2`, name: '', credits: '3', score10: '' },
      ],
    };
    setSemesters([...semesters, newSem]);
  };

  const removeSemester = (semId: string) => {
    if (semesters.length === 1) return;
    setSemesters(semesters.filter((s) => s.id !== semId));
  };

  const addCourse = (semId: string) => {
    setSemesters(
      semesters.map((sem) => {
        if (sem.id === semId) {
          return {
            ...sem,
            courses: [
              ...sem.courses,
              { id: `c-${Date.now()}`, name: '', credits: '3', score10: '' },
            ],
          };
        }
        return sem;
      })
    );
  };

  const removeCourse = (semId: string, courseId: string) => {
    setSemesters(
      semesters.map((sem) => {
        if (sem.id === semId) {
          if (sem.courses.length === 1) return sem;
          return {
            ...sem,
            courses: sem.courses.filter((c) => c.id !== courseId),
          };
        }
        return sem;
      })
    );
  };

  const updateCourse = (
    semId: string,
    courseId: string,
    field: keyof Course,
    value: string
  ) => {
    setSemesters(
      semesters.map((sem) => {
        if (sem.id === semId) {
          return {
            ...sem,
            courses: sem.courses.map((c) =>
              c.id === courseId ? { ...c, [field]: value } : c
            ),
          };
        }
        return sem;
      })
    );
  };

  const handleReset = () => {
    setSemesters([
      {
        id: 'sem-1',
        name: 'Học kỳ 1',
        courses: [
          { id: 'c-1', name: '', credits: '3', score10: '' },
          { id: 'c-2', name: '', credits: '3', score10: '' },
        ],
      },
    ]);
  };

  const calculateSemesterStats = (courses: Course[]) => {
    let semCredits = 0;
    let semTotalPoints = 0;

    courses.forEach((c) => {
      const cr = parseFloat(c.credits);
      const s10 = parseFloat(c.score10);
      if (!isNaN(cr) && cr > 0 && !isNaN(s10) && s10 >= 0 && s10 <= 10) {
        const { score4 } = convertScore(s10);
        semCredits += cr;
        semTotalPoints += score4 * cr;
      }
    });

    const gpa = semCredits > 0 ? semTotalPoints / semCredits : 0;
    return { semCredits, gpa };
  };

  let totalCreditsAll = 0;
  let totalWeightedPointsAll = 0;

  const trendData: SemesterTrendItem[] = semesters.map((sem) => {
    const { semCredits, gpa } = calculateSemesterStats(sem.courses);
    totalCreditsAll += semCredits;
    totalWeightedPointsAll += gpa * semCredits;
    return {
      semName: sem.name,
      gpa: Number(gpa.toFixed(2)),
      credits: semCredits,
    };
  });

  const cumulativeGPA = totalCreditsAll > 0 ? totalWeightedPointsAll / totalCreditsAll : 0;
  const classification = getClassification(cumulativeGPA);

  return (
    <div 
      className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased selection:bg-[#0071e3] selection:text-white pb-24"
      style={{
        fontFamily: "'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        letterSpacing: '-0.011em',
      }}
    >
      
      {/* 1. HEADER CĂN GIỮA STYLE APPLE (HUY HIỆU ĐÃ ĐỔI THÀNH NỀN ĐEN CHỮ TRẮNG) */}
      <section className="w-full pt-14 pb-8 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center">
        <div className="space-y-3 text-center max-w-3xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1d1d1f] text-white text-xs font-semibold rounded-full shadow-sm">
              <Calculator size={15} className="text-neutral-300" />
              <span>Tiện ích cho sinh viên DTU</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-tight">
            Tính Điểm <span className="text-[#1d1d1f] font-extrabold">GPA Tích Luỹ</span>
          </h1>

          <p className="text-[17px] leading-[25px] font-normal text-[#86868b] max-w-2xl mx-auto">
            Nhập điểm kết thúc học phần và số tín chỉ để tính GPA — mô phỏng điểm số khi học lại, học cải thiện giúp bạn định hướng lộ trình tốt nghiệp chuẩn xác.
          </p>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* 2. DANH SÁCH CÁC HỌC KỲ */}
        {semesters.map((sem, sIdx) => {
          const { semCredits, gpa: semGPA } = calculateSemesterStats(sem.courses);

          return (
            <div
              key={sem.id}
              className="bg-white rounded-[26px] p-5 sm:p-7 border border-[#e5e5ea]/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#f5f5f7] pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-neutral-100 text-[#1d1d1f] font-bold text-sm flex items-center justify-center border border-[#e5e5ea]">
                    {sIdx + 1}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[#1d1d1f] tracking-tight">{sem.name}</h2>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-[13px] text-[#86868b] hidden sm:inline">
                    Đã nhập: <b className="text-[#1d1d1f] font-bold">{semCredits}</b> tín chỉ
                  </span>
                  {semesters.length > 1 && (
                    <button
                      onClick={() => removeSemester(sem.id)}
                      className="p-2 rounded-xl text-[#86868b] hover:text-[#b23b35] hover:bg-red-50 transition text-xs flex items-center gap-1 cursor-pointer font-medium"
                      title="Xóa học kỳ này"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Xóa kỳ</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Danh sách môn học */}
              <div className="space-y-3">
                <div className="hidden sm:grid grid-cols-12 gap-3 text-[11px] font-semibold text-[#86868b] uppercase tracking-wider px-3">
                  <div className="col-span-5">Tên môn học</div>
                  <div className="col-span-2 text-center">Số tín chỉ</div>
                  <div className="col-span-2 text-center">Điểm (Hệ 10)</div>
                  <div className="col-span-2 text-center">Hệ 4 (Quy đổi)</div>
                  <div className="col-span-1 text-center">Xóa</div>
                </div>

                {sem.courses.map((course) => {
                  const s10 = parseFloat(course.score10);
                  const isValid = !isNaN(s10) && s10 >= 0 && s10 <= 10;
                  const converted = isValid ? convertScore(s10) : null;

                  return (
                    <div
                      key={course.id}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3 items-center bg-[#f5f5f7] border border-[#e5e5ea]/80 p-3 sm:p-2.5 rounded-2xl shadow-sm"
                    >
                      <div className="col-span-5">
                        <input
                          type="text"
                          placeholder="Nhập tên môn học..."
                          value={course.name}
                          onChange={(e) => updateCourse(sem.id, course.id, 'name', e.target.value)}
                          className="w-full bg-white sm:bg-transparent border sm:border-0 border-[#e5e5ea] px-3.5 py-2 text-[#1d1d1f] text-sm font-medium focus:outline-none focus:bg-white rounded-xl transition placeholder:text-[#c7c7cc]"
                        />
                      </div>

                      <div className="col-span-2 flex items-center justify-between sm:justify-center">
                        <span className="sm:hidden text-xs text-[#86868b] font-medium">Tín chỉ:</span>
                        <input
                          type="number"
                          min="1"
                          max="15"
                          placeholder="Số TC"
                          value={course.credits}
                          onChange={(e) => updateCourse(sem.id, course.id, 'credits', e.target.value)}
                          className="w-20 sm:w-full bg-white border border-[#e5e5ea] text-center text-[#1d1d1f] font-bold py-2 rounded-xl text-sm focus:outline-none focus:border-[#1d1d1f] transition shadow-sm placeholder:text-[#c7c7cc]"
                        />
                      </div>

                      <div className="col-span-2 flex items-center justify-between sm:justify-center">
                        <span className="sm:hidden text-xs text-[#86868b] font-medium">Điểm hệ 10:</span>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          placeholder="VD: 7.5"
                          value={course.score10}
                          onChange={(e) => updateCourse(sem.id, course.id, 'score10', e.target.value)}
                          className="w-24 sm:w-full bg-white border border-[#e5e5ea] text-center text-[#1d1d1f] font-bold py-2 rounded-xl text-sm focus:outline-none focus:border-[#1d1d1f] transition shadow-sm placeholder:text-[#c7c7cc]"
                        />
                      </div>

                      <div className="col-span-2 flex items-center justify-between sm:justify-center text-center">
                        <span className="sm:hidden text-xs text-[#86868b] font-medium">Quy đổi:</span>
                        <div className="py-1.5">
                          {converted ? (
                            <span className="font-bold text-xs text-[#1d1d1f] bg-white px-2.5 py-1 rounded-lg border border-[#e5e5ea] shadow-xs">
                              {converted.score4.toFixed(2)} ({converted.grade})
                            </span>
                          ) : (
                            <span className="text-[#86868b] text-xs font-medium">—</span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-1 flex justify-end sm:justify-center">
                        <button
                          onClick={() => removeCourse(sem.id, course.id)}
                          className="text-[#86868b] hover:text-[#b23b35] p-2 rounded-xl transition cursor-pointer hover:bg-red-50"
                          title="Xóa môn"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Nút thêm môn và tóm tắt kỳ */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-3">
                <button
                  onClick={() => addCourse(sem.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#f5f5f7] hover:bg-[#e5e5ea] border border-[#e5e5ea] text-[#1d1d1f] text-xs sm:text-[13px] font-bold transition cursor-pointer"
                >
                  <Plus size={15} className="text-[#1d1d1f]" />
                  <span>Thêm môn học</span>
                </button>

                <div className="text-xs sm:text-sm text-[#515154] flex items-center gap-1.5">
                  <span>GPA kỳ này:</span>
                  <strong className="text-xl font-extrabold text-[#1d1d1f] ml-1">{semGPA.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          );
        })}

        {/* 3. NÚT THÊM HỌC KỲ (ĐÃ ĐỔI THÀNH NỀN ĐEN CHỮ TRẮNG) & ĐẶT LẠI */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={addSemester}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#1d1d1f] hover:bg-black text-white font-bold py-3.5 px-6 rounded-2xl transition-all text-sm sm:text-base shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:scale-[1.01] cursor-pointer"
          >
            <Plus size={18} />
            <span>Thêm học kỳ tiếp theo</span>
          </button>

          <button
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f5f5f7] border border-[#e5e5ea] text-[#1d1d1f] font-semibold py-3.5 px-6 rounded-2xl transition text-sm sm:text-base cursor-pointer shadow-sm"
          >
            <RotateCcw size={17} />
            <span>Đặt lại tất cả</span>
          </button>
        </div>

        {/* 4. KHỐI TỔNG KẾT GPA TÍCH LŨY TOÀN KHÓA */}
        <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#e5e5ea]/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            
            {/* Ô 1: Tổng số tín chỉ */}
            <div className="bg-[#f5f5f7] border border-[#e5e5ea] p-6 rounded-2xl text-center flex flex-col items-center justify-center min-h-[190px]">
              <span className="text-s font-bold uppercase tracking-wider text-[#86868b] block mb-2">
                Tổng số tín chỉ
              </span>
              <span className="text-4xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight">{totalCreditsAll}</span>
              <span className="text-s text-[#86868b] mt-1.5 font-medium">Tín chỉ hoàn thành</span>
            </div>

            {/* Ô 2: ĐƯỜNG VÒM PARABOL */}
            <div className="bg-[#f5f5f7] border border-[#e5e5ea] p-5 rounded-2xl flex flex-col items-center justify-center shadow-sm min-h-[190px]">
              <span className="text-s font-bold uppercase tracking-wider text-[#1d1d1f] block mb-1">
                Điểm GPA Tích Lũy
              </span>
              <GpaParabolArc gpa={cumulativeGPA} />
            </div>

            {/* Ô 3: Xếp loại học lực */}
            <div className="bg-[#f5f5f7] border border-[#e5e5ea] p-6 rounded-2xl text-center flex flex-col items-center justify-center min-h-[190px]">
              <span className="text-s font-bold uppercase tracking-wider text-[#86868b] block mb-3">
                Xếp loại học lực
              </span>
              <div
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border shadow-sm ${classification.color}`}
              >
                <Award size={18} className="shrink-0" />
                <span className="text-base sm:text-lg font-bold uppercase tracking-wider whitespace-nowrap">
                  {classification.label}
                </span>
              </div>
              <span className="text-[13px] text-[#86868b] mt-3 font-medium">Dựa trên thang điểm tích lũy 4.0</span>
            </div>

          </div>
        </div>

        {/* 5. KHỐI ĐỒ THỊ BIẾN THIÊN */}
        <GpaTrendChart data={trendData} />

      </div>
    </div>
  );
}