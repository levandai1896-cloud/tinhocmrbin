'use client';

interface GpaParabolArcProps {
  gpa: number;
}

export default function GpaParabolArc({ gpa = 0 }: GpaParabolArcProps) {
  const safeGpa = typeof gpa === 'number' && !isNaN(gpa) ? gpa : 0;
  const clampedGpa = Math.min(Math.max(safeGpa, 0), 4);
  const ratio = clampedGpa / 4;

  const cx = 130;
  const cy = 115;
  const r = 85;

  const arcLength = Math.PI * r;
  const strokeDashoffset = arcLength * (1 - ratio);

  // Tọa độ chấm tròn chạy theo góc từ trái sang phải
  const angle = Math.PI - ratio * Math.PI;
  const pointerX = cx + r * Math.cos(angle);
  const pointerY = cy - r * Math.sin(angle);

  const getRank = (score: number) => {
    if (score >= 3.6) return { text: 'Xuất sắc', color: 'text-emerald-400' };
    if (score >= 3.2) return { text: 'Giỏi', color: 'text-green-400' };
    if (score >= 2.5) return { text: 'Khá', color: 'text-sky-400' };
    if (score >= 2.0) return { text: 'Trung bình', color: 'text-amber-400' };
    if (score > 0) return { text: 'Yếu / Kém', color: 'text-red-400' };
    return { text: 'Chưa có điểm', color: 'text-neutral-500' };
  };

  const rank = getRank(clampedGpa);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-[260px] h-[135px] flex items-center justify-center">
        <svg viewBox="0 0 260 140" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gpaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />    {/* Đỏ */}
              <stop offset="45%" stopColor="#f59e0b" />   {/* Vàng cam */}
              <stop offset="70%" stopColor="#38bdf8" />   {/* Xanh dương */}
              <stop offset="90%" stopColor="#10b981" />   {/* Xanh lá */}
            </linearGradient>
          </defs>

          {/* Đường cong nền xám */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="#1f1f2b"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Đường cong Parabol theo điểm GPA */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="url(#gpaGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
          />

          {/* Chấm tròn định vị số điểm */}
          {clampedGpa > 0 && !isNaN(pointerX) && !isNaN(pointerY) && (
            <circle
              cx={pointerX}
              cy={pointerY}
              r="7"
              fill="#ffffff"
              stroke="#09090b"
              strokeWidth="2.5"
              className="transition-all duration-700 ease-out shadow-md"
            />
          )}

          {/* Mốc chỉ số 0.0 - 2.0 - 4.0 */}
          <text x={cx - r - 10} y={cy + 15} fill="#71717a" fontSize="10" fontWeight="bold" textAnchor="middle">0.0</text>
          <text x={cx} y={cy - r - 8} fill="#71717a" fontSize="10" fontWeight="bold" textAnchor="middle">2.0</text>
          <text x={cx + r + 10} y={cy + 15} fill="#71717a" fontSize="10" fontWeight="bold" textAnchor="middle">4.0</text>
        </svg>

        {/* Số điểm GPA to ở giữa vòm cong */}
        <div className="absolute bottom-1 flex flex-col items-center">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white tracking-tight">
              {clampedGpa.toFixed(2)}
            </span>
            <span className="text-[11px] font-bold text-neutral-400">/ 4.0</span>
          </div>
          <span className={`text-[11px] font-bold ${rank.color}`}>
            {rank.text}
          </span>
        </div>
      </div>
    </div>
  );
}