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
            stroke="#e5e7eb"
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

          <text x={cx - r - 10} y={cy + 15} fill="#9ca3af" fontSize="10" fontWeight="bold" textAnchor="middle">0.0</text>
          <text x={cx} y={cy - r - 8} fill="#9ca3af" fontSize="10" fontWeight="bold" textAnchor="middle">2.0</text>
          <text x={cx + r + 10} y={cy + 15} fill="#9ca3af" fontSize="10" fontWeight="bold" textAnchor="middle">4.0</text>
        </svg>

        <div className="absolute bottom-0 flex flex-col items-center">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {clampedGpa.toFixed(2)}
            </span>
            <span className="text-xs font-semibold text-neutral-500">/ 4.0</span>
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
    <div className="bg-white/95 backdrop-blur-sm border border-neutral-300 rounded-3xl p-6 sm:p-7 shadow-xl shadow-neutral-900/5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-50 text-[#b23b35] border border-red-200 flex items-center justify-center">
            <TrendingUp size={16} />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 tracking-wide">
              ĐỒ THỊ BIẾN THIÊN GPA THEO HỌC KỲ
            </h3>
            <p className="text-xs text-neutral-500 font-normal">
              Theo dõi sự tăng trưởng và phong độ học tập qua từng kỳ học
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-neutral-500 font-medium">
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
                <stop offset="0%" stopColor="#b23b35" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#b23b35" stopOpacity="0.0" />
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
                    stroke="#e5e7eb"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingX - 18}
                    y={y + 4}
                    fill="#9ca3af"
                    fontSize="10"
                    fontWeight="bold"
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
                    stroke="#e5e7eb"
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
                    fill="#4b5563"
                    fontSize="11"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {pt.semName}
                  </text>

                  <text
                    x={pt.x}
                    y={pt.y - 12}
                    fill="#111827"
                    fontSize="12"
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
              className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] text-neutral-500 font-semibold block">{pt.semName}</span>
                <span className="text-base font-bold text-neutral-900">{pt.gpa.toFixed(2)}</span>
              </div>

              {diff === null ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-600 flex items-center gap-1">
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
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-600 flex items-center gap-1">
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
    <div className="min-h-screen flex flex-col items-center pt-8 pb-20 px-4 bg-[#edeef2] text-neutral-900 font-sans relative selection:bg-[#b23b35] selection:text-white">
      
      {/* NỀN NHÁM MỜ SVG */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-45 mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/70 via-transparent to-black/5 z-0" />

      {/* 1. Header */}
      <div className="relative z-10 text-center space-y-3.5 pt-4 mb-9 max-w-3xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#b23b35] text-white text-xs font-semibold rounded-full shadow-sm">
            <Calculator size={14} className="text-red-100" />
            <span>Tiện ích sinh viên</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-normal">
          TÍNH ĐIỂM <span className="text-[#b23b35]">GPA TÍCH LŨY</span>
        </h1>

        <p className="text-neutral-600 text-xs sm:text-sm font-normal tracking-wide max-w-xl mx-auto">
          Nhập điểm hệ tổng và số tín chỉ để tính GPA - Dùng để mô phỏng điểm GPA khi học lại - học cải thiện, giúp nắm bắt điểm chính xác cho sinh viên
        </p>
      </div>

      <div className="relative z-10 w-full max-w-4xl space-y-6">
        {/* 2. Danh sách các học kỳ */}
        {semesters.map((sem, sIdx) => {
          const { semCredits, gpa: semGPA } = calculateSemesterStats(sem.courses);

          return (
            <div
              key={sem.id}
              className="bg-white/95 backdrop-blur-sm border border-neutral-300 rounded-3xl p-5 sm:p-7 shadow-xl shadow-neutral-900/5 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-red-50 text-[#b23b35] font-bold text-sm flex items-center justify-center border border-red-200">
                    {sIdx + 1}
                  </span>
                  <h2 className="text-lg font-bold text-neutral-900">{sem.name}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500 hidden sm:inline">
                    Đã nhập: <b className="text-neutral-900 font-bold">{semCredits}</b> tín chỉ
                  </span>
                  {semesters.length > 1 && (
                    <button
                      onClick={() => removeSemester(sem.id)}
                      className="p-2 rounded-xl text-neutral-400 hover:text-[#b23b35] hover:bg-red-50 transition text-xs flex items-center gap-1 cursor-pointer"
                      title="Xóa học kỳ này"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline font-medium">Xóa kỳ</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Danh sách môn học */}
              <div className="space-y-3">
                <div className="hidden sm:grid grid-cols-12 gap-3 text-xs font-bold text-neutral-500 uppercase px-2">
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
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center bg-neutral-50 border border-neutral-200 p-3 sm:p-2 rounded-2xl shadow-sm"
                    >
                      <div className="col-span-5">
                        <input
                          type="text"
                          placeholder="Nhập tên môn học..."
                          value={course.name}
                          onChange={(e) => updateCourse(sem.id, course.id, 'name', e.target.value)}
                          className="w-full bg-white sm:bg-transparent border sm:border-0 border-neutral-200 px-3 py-2 text-neutral-900 text-sm focus:outline-none focus:bg-white rounded-xl transition"
                        />
                      </div>

                      <div className="col-span-2 flex items-center justify-between sm:justify-center">
                        <span className="sm:hidden text-xs text-neutral-500">Tín chỉ:</span>
                        <input
                          type="number"
                          min="1"
                          max="15"
                          placeholder="Số TC"
                          value={course.credits}
                          onChange={(e) => updateCourse(sem.id, course.id, 'credits', e.target.value)}
                          className="w-20 sm:w-full bg-white border border-neutral-300 text-center text-neutral-900 font-bold py-2 rounded-xl text-sm focus:outline-none focus:border-[#b23b35] transition shadow-inner"
                        />
                      </div>

                      <div className="col-span-2 flex items-center justify-between sm:justify-center">
                        <span className="sm:hidden text-xs text-neutral-500">Điểm hệ 10:</span>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          placeholder="VD: 7.5"
                          value={course.score10}
                          onChange={(e) => updateCourse(sem.id, course.id, 'score10', e.target.value)}
                          className="w-24 sm:w-full bg-white border border-neutral-300 text-center text-neutral-900 font-bold py-2 rounded-xl text-sm focus:outline-none focus:border-[#b23b35] transition shadow-inner"
                        />
                      </div>

                      <div className="col-span-2 flex items-center justify-between sm:justify-center text-center">
                        <span className="sm:hidden text-xs text-neutral-500">Quy đổi:</span>
                        <div className="py-2">
                          {converted ? (
                            <span className="font-bold text-xs text-[#b23b35] bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                              {converted.score4.toFixed(2)} ({converted.grade})
                            </span>
                          ) : (
                            <span className="text-neutral-400 text-xs font-medium">—</span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-1 flex justify-end sm:justify-center">
                        <button
                          onClick={() => removeCourse(sem.id, course.id)}
                          className="text-neutral-400 hover:text-[#b23b35] p-1.5 rounded-lg transition cursor-pointer"
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 text-xs font-semibold transition cursor-pointer"
                >
                  <Plus size={14} className="text-[#b23b35]" />
                  <span>Thêm môn học</span>
                </button>

                <div className="text-xs text-neutral-600 flex items-center gap-2">
                  <span>
                    GPA kỳ này:{' '}
                    <b className="text-xl font-extrabold text-neutral-900 ml-1">{semGPA.toFixed(2)}</b>
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* 3. Nút Thêm học kỳ & Xóa làm lại */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={addSemester}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#b23b35] hover:bg-[#9b302a] text-white font-bold py-3.5 px-6 rounded-2xl transition text-sm shadow-sm cursor-pointer"
          >
            <Plus size={16} />
            <span>Thêm học kỳ tiếp theo</span>
          </button>

          <button
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 font-semibold py-3.5 px-6 rounded-2xl transition text-sm cursor-pointer"
          >
            <RotateCcw size={16} />
            <span>Đặt lại tất cả</span>
          </button>
        </div>

        {/* 4. Khối Tổng kết GPA Tích Lũy Toàn Khóa */}
        <div className="bg-white/95 backdrop-blur-sm border border-neutral-300 rounded-3xl p-6 sm:p-8 shadow-xl shadow-neutral-900/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Ô 1: Tổng số tín chỉ */}
            <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-2xl text-center flex flex-col items-center justify-center min-h-[180px]">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                Tổng số tín chỉ tích lũy
              </span>
              <span className="text-4xl font-extrabold text-neutral-900">{totalCreditsAll}</span>
              <span className="text-[11px] text-neutral-400 mt-1">Tín chỉ hoàn thành</span>
            </div>

            {/* Ô 2: ĐƯỜNG VÒM PARABOL */}
            <div className="bg-neutral-50 border border-red-200 p-5 rounded-2xl flex flex-col items-center justify-center shadow-sm min-h-[180px]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#b23b35] block mb-1">
                Điểm GPA Tích Lũy (Hệ 4)
              </span>
              <GpaParabolArc gpa={cumulativeGPA} />
            </div>

            {/* Ô 3: Xếp loại học lực (NẰM TRÊN 1 HÀNG DUY NHẤT) */}
            <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-2xl text-center flex flex-col items-center justify-center min-h-[180px]">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-3">
                Xếp loại học lực
              </span>
              <div
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border shadow-sm ${classification.color}`}
              >
                <Award size={18} className="shrink-0" />
                <span className="text-base sm:text-lg font-black uppercase tracking-wider whitespace-nowrap">
                  {classification.label}
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 mt-3">Dựa trên thang điểm tích lũy 4.0</span>
            </div>

          </div>
        </div>

        {/* 5. KHỐI ĐỒ THỊ BIẾN THIÊN */}
        <GpaTrendChart data={trendData} />

      </div>
    </div>
  );
}