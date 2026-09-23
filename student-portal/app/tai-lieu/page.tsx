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
const CACHE_KEY = 'cached_dtu_tailieu_v1';
const CACHE_EXPIRE_TIME = 24 * 60 * 60 * 1000; // 24 tiếng (mili-giây)

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
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_EXPIRE_TIME;

        if (Array.isArray(data) && data.length > 0) {
          setDocuments(data);
          setIsLoading(false);

          if (!isExpired) {
            return;
          }
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc cache localStorage:', e);
    }

    fetch(GOOGLE_SHEET_TAILIEU_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải CSV từ Google Sheet');
        return res.text();
      })
      .then((csvText) => {
        const parsed = parseCSV(csvText);
        if (parsed.length > 0) {
          setDocuments(parsed);
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ timestamp: Date.now(), data: parsed })
            );
          } catch (e) {
            console.warn('Không thể ghi cache vào localStorage:', e);
          }
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
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display','Segoe_UI',sans-serif] antialiased selection:bg-[#0071e3] selection:text-white pb-24">
      
      {/* 1. TIÊU ĐỀ TRANG CĂN GIỮA THEO STYLE APPLE */}
      <section className="w-full pt-14 pb-8 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center">
        <div className="space-y-3 text-center max-w-2xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#b23b35] text-white text-xs font-semibold rounded-full shadow-sm">
              <FolderDown size={15} className="text-red-100" />
              <span>Học liệu & Tài nguyên học tập DTU</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-tight">
            Kho Tài Liệu Học Tập<span className="text-[#b23b35]"></span>
          </h1>

          <p className="text-[17px] leading-[25px] font-normal text-[#86868b] max-w-xl mx-auto">
            Tổng hợp bài giảng, đề cương ôn thi, tài liệu thực hành Word, Excel và đề thi mẫu dành cho sinh viên.
          </p>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* 2. TÌM KIẾM & BỘ LỌC DANH MỤC (CARD TRẮNG APPLE) */}
        <div className="bg-white rounded-[26px] p-5 sm:p-7 border border-[#e5e5ea]/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]" size={19} />
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu (VD: Tin đại cương, Excel, Đề thi...)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#f5f5f7] border border-[#e5e5ea] focus:border-[#b23b35] focus:bg-white focus:ring-4 focus:ring-[#b23b35]/10 rounded-2xl pl-11 pr-4 py-3 text-sm sm:text-[15px] text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none transition shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-[#1d1d1f] mr-1 flex items-center gap-1 uppercase tracking-wider">
              <Tag size={13} className="text-[#b23b35]" /> Phân loại:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#b23b35] text-white shadow-sm hover:bg-[#96312c]'
                      : 'bg-[#f5f5f7] hover:bg-[#e5e5ea] text-[#515154] border border-[#e5e5ea]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. DANH SÁCH TÀI LIỆU */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="bg-white rounded-[26px] border border-[#e5e5ea]/80 py-14 px-4 text-center text-[#86868b] text-sm flex items-center justify-center gap-2.5 shadow-sm">
              <Loader2 size={20} className="animate-spin text-[#b23b35]" />
              <span>Đang tải danh sách tài liệu mới nhất...</span>
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="bg-white rounded-[26px] border border-[#e5e5ea]/80 py-12 px-4 text-center text-[#86868b] text-sm space-y-2.5 shadow-sm">
              <Info size={30} className="mx-auto text-[#86868b]" />
              <p className="font-semibold text-[#1d1d1f] text-base">Không tìm thấy tài liệu nào phù hợp với yêu cầu tìm kiếm.</p>
            </div>
          ) : (
            filteredDocs.map((doc) => {
              const downloadLink = getDirectDownloadUrl(doc.downloadUrl, doc.format);

              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-[22px] border border-[#e5e5ea]/80 hover:border-[#b23b35] p-4 sm:p-5 flex items-center justify-between gap-4 transition-all duration-200 group shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex items-center justify-center text-[#b23b35] shrink-0 group-hover:scale-105 transition-transform">
                      <FileText size={22} />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <h2 className="text-sm sm:text-[15px] font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors truncate">
                        {doc.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#86868b]">
                        <span className="px-2 py-0.5 rounded-md bg-[#f5f5f7] border border-[#e5e5ea] text-[#515154] text-[11px] font-semibold">
                          {doc.category}
                        </span>
                        <span className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded ${
                          doc.format === 'DOCX' 
                            ? 'bg-blue-50 text-blue-600 border border-blue-200/60' 
                            : doc.format === 'XLSX'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-red-50 text-[#b23b35] border border-red-200/60'
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
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f5f5f7] hover:bg-[#b23b35] border border-[#e5e5ea] hover:border-[#b23b35] text-[#1d1d1f] hover:text-white text-xs sm:text-sm font-bold transition shrink-0 group/btn cursor-pointer shadow-sm hover:shadow"
                      title="Tải xuống tài liệu"
                    >
                      <Download size={15} className="group-hover/btn:-translate-y-0.5 transition-transform" />
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