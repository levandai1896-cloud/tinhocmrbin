'use client';

import { useState, useEffect } from 'react';
import { 
  FolderDown, 
  Search, 
  FileText, 
  Download, 
  Tag, 
  Info, 
  Loader2 
} from 'lucide-react';

interface DocumentItem {
  id: string;
  name: string;
  size: string;
  category: 'Đề cương & Bài giảng' | 'Đề thi & Ôn tập' | 'Tài liệu tham khảo';
  date: string;
  format: 'PDF' | 'DOCX' | 'XLSX' | 'ZIP';
  downloadUrl: string;
}

// LINK LẤY DỮ LIỆU TAB "TaiLieu" TỪ GOOGLE SHEET
const GOOGLE_SHEET_TAILIEU_URL = 'https://docs.google.com/spreadsheets/d/1g-QFr-NpacZPKTqTc2g5qfxa5lLQdHSqGCZWdbzVbwA/gviz/tq?tqx=out:csv&sheet=TaiLieu';

const DEFAULT_DOCS: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'Giao_trinh_Tin_hoc_Dai_cuong.pdf',
    size: '4.8 MB',
    category: 'Đề cương & Bài giảng',
    date: '19/09/2026',
    format: 'PDF',
    downloadUrl: '#',
  },
  {
    id: 'doc-2',
    name: 'De_thi_mau_Chung_chi_UDCNTT_Co_ban.docx',
    size: '1.2 MB',
    category: 'Đề thi & Ôn tập',
    date: '18/09/2026',
    format: 'DOCX',
    downloadUrl: '#',
  },
  {
    id: 'doc-3',
    name: 'Bai_tap_thuc_hanh_Excel_nang_cao.xlsx',
    size: '2.4 MB',
    category: 'Đề cương & Bài giảng',
    date: '15/09/2026',
    format: 'XLSX',
    downloadUrl: '#',
  },
];

// Bộ tách dòng CSV chuẩn
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += char;
    }
  }
  result.push(cur.trim());
  return result;
}

function parseCSV(text: string): DocumentItem[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length <= 1) return [];

  const rawHeaders = parseCSVLine(lines[0]);
  const headers = rawHeaders.map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));

  const docs: DocumentItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0 || values.every((v) => !v)) continue;

    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });

    const name = row['name'] || '';
    if (!name) continue;

    const ext = name.split('.').pop()?.toUpperCase() || 'PDF';
    const format = (['PDF', 'DOCX', 'XLSX', 'ZIP'].includes(ext) ? ext : 'PDF') as DocumentItem['format'];

    docs.push({
      id: row['id'] || `doc-${i}`,
      name: name,
      size: row['size'] || '1.0 MB',
      category: (row['category'] as any) || 'Đề cương & Bài giảng',
      date: row['date'] || '23/09/2026',
      format: format,
      downloadUrl: row['downloadurl'] || '#',
    });
  }

  return docs;
}

function getDirectDownloadUrl(url: string, format: string): string {
  if (url.includes('docs.google.com/document/d/')) {
    const docMatch = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
    if (docMatch && docMatch[1]) {
      return `https://docs.google.com/document/d/${docMatch[1]}/export?format=docx`;
    }
  }

  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${fileMatch[1]}`;
  }

  return url;
}

export default function TaiLieuPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>(DEFAULT_DOCS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    'Tất cả', 
    'Đề cương & Bài giảng', 
    'Đề thi & Ôn tập', 
    'Tài liệu tham khảo'
  ];

  useEffect(() => {
    fetch(GOOGLE_SHEET_TAILIEU_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải CSV từ Google Sheet');
        return res.text();
      })
      .then((csvText) => {
        const parsed = parseCSV(csvText);
        if (parsed.length > 0) {
          setDocuments(parsed);
        }
      })
      .catch((err) => {
        console.warn('Lỗi kết nối Sheet (dùng dữ liệu mặc định):', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 pb-16 px-4 bg-[#edeef2] text-neutral-900 font-sans relative selection:bg-[#b23b35] selection:text-white">
      {/* LỚP NỀN NHÁM MỜ SVG */}
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
            <FolderDown size={14} className="text-red-100" />
            <span>Học liệu & Tài nguyên học tập DTU</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-normal uppercase">
          KHO HỌC LIỆU & <span className="text-[#b23b35]">TÀI LIỆU HỌC TẬP</span>
        </h1>

        <p className="text-neutral-600 text-xs sm:text-sm font-normal tracking-wide">
          Tổng hợp bài giảng, đề cương ôn thi, tài liệu thực hành Word, Excel và đề thi mẫu dành cho sinh viên
        </p>
      </div>

      <div className="relative z-10 w-full max-w-4xl space-y-6">
        
        {/* 2. TÌM KIẾM & BỘ LỌC DANH MỤC */}
        <div className="bg-white/95 backdrop-blur-sm border border-neutral-300 rounded-3xl p-5 sm:p-6 shadow-xl shadow-neutral-900/5 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu (VD: Tin đại cương, Excel, Đề thi...)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 hover:border-neutral-400 focus:border-[#b23b35] focus:ring-2 focus:ring-[#b23b35]/15 rounded-2xl pl-11 pr-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition shadow-inner"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-neutral-500 mr-1 flex items-center gap-1 font-medium">
              <Tag size={12} className="text-[#b23b35]" /> Phân loại:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#b23b35] text-white shadow-md shadow-red-900/20'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600 border border-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. DANH SÁCH TÀI LIỆU */}
        <div className="space-y-2.5">
          {isLoading ? (
            <div className="bg-white/95 backdrop-blur-sm border border-neutral-300 rounded-3xl py-14 px-4 text-center text-neutral-500 text-sm flex items-center justify-center gap-2 shadow-sm">
              <Loader2 size={18} className="animate-spin text-[#b23b35]" />
              <span>Đang tải danh sách tài liệu mới nhất...</span>
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="bg-white/95 backdrop-blur-sm border border-neutral-300 rounded-3xl py-12 px-4 text-center text-neutral-500 text-sm space-y-2 shadow-sm">
              <Info size={28} className="mx-auto text-neutral-400" />
              <p className="font-medium text-neutral-700">Không tìm thấy tài liệu nào phù hợp với yêu cầu tìm kiếm.</p>
            </div>
          ) : (
            filteredDocs.map((doc) => {
              const downloadLink = getDirectDownloadUrl(doc.downloadUrl, doc.format);

              return (
                <div
                  key={doc.id}
                  className="bg-white/95 backdrop-blur-sm border border-neutral-300 hover:border-[#b23b35] rounded-2xl p-4 flex items-center justify-between gap-4 transition group shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#b23b35] shrink-0 group-hover:scale-105 transition-transform">
                      <FileText size={20} />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <h2 className="text-sm font-bold text-neutral-800 group-hover:text-[#b23b35] transition-colors truncate">
                        {doc.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500">
                        <span className="px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-500 text-[10px] font-semibold">
                          {doc.category}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          doc.format === 'DOCX' 
                            ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                            : doc.format === 'XLSX'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-[#b23b35] border border-red-200'
                        }`}>
                          .{doc.format}
                        </span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={downloadLink}
                      download
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-[#b23b35] border border-neutral-200 hover:border-[#b23b35] text-neutral-700 hover:text-white text-xs font-semibold transition shrink-0 group/btn cursor-pointer shadow-sm"
                      title="Tải xuống tài liệu"
                    >
                      <Download size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                      <span className="hidden sm:inline">Tải về</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}