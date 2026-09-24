'use client';

import { useState, useEffect } from 'react';
import { 
  FileCheck2, 
  Download, 
  Search, 
  FileText, 
  Info, 
  Tag,
  Loader2
} from 'lucide-react';

interface FormItem {
  id: string;
  title: string;
  category: 'Đăng ký học' | 'Thi & Điểm' | 'Tốt nghiệp & Nhận bằng' | 'NVQS & Giấy tờ' | 'Chuyển ngành / Trường';
  format: 'PDF' | 'DOCX';
  driveUrl: string;
}

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1g-QFr-NpacZPKTqTc2g5qfxa5lLQdHSqGCZWdbzVbwA/export?format=csv';
const CACHE_KEY = 'cached_dtu_forms_v1';
const CACHE_EXPIRE_TIME = 24 * 60 * 60 * 1000; // 24 tiếng (tính theo mili-giây)

const DEFAULT_FORMS: FormItem[] = [
  {
    id: '1',
    title: 'ĐƠN CHUYỂN NGÀNH TRONG DTU',
    category: 'Chuyển ngành / Trường',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1abHSJFqRUOpeoON0rbMZhDAEZDdyXEse/view?usp=drive_link',
  },
  {
    id: '2',
    title: 'ĐƠN CHUYỂN NGÀNH TỪ TRƯỜNG NÀY QUA TRƯỜNG KHÁC',
    category: 'Chuyển ngành / Trường',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1jxbOp-erOXhAwhvaq0D2MJzy2OQR0bLc/view?usp=drive_link',
  },
  {
    id: '3',
    title: 'ĐƠN CHUYỂN TỪ KHÓA LUẬN SANG THI TN (Chưa tìm thấy bản mới hơn)',
    category: 'Tốt nghiệp & Nhận bằng',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1h_vRGi8Hy_qz-X0K2C4otEgzbj6STMoI/view?usp=drive_link',
  },
  {
    id: '4',
    title: 'ĐƠN ĐĂNG KÝ CHUYỂN LỚP HỌC PHẦN',
    category: 'Đăng ký học',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/15IiO7TQYGsdcXNCac02Zz4tNiUuh17pZ/view?usp=drive_link',
  },
  {
    id: '5',
    title: 'ĐƠN ĐĂNG KÝ HỌC CẢI THIỆN',
    category: 'Đăng ký học',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1EwfAfK7pv6SrGPFOU2JqGnN6hY-19P8e/view?usp=drive_link',
  },
  {
    id: '6',
    title: 'ĐƠN ĐĂNG KÝ HỌC GHÉP - HỌC PHẦN',
    category: 'Đăng ký học',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1Mzq6qBspaSWDtZOxzfNjyDGOADLPE_9f/view?usp=drive_link',
  },
  {
    id: '7',
    title: 'ĐƠN ĐĂNG KÝ HỌC VƯỢT',
    category: 'Đăng ký học',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1vjk7HvVKtjD-JKrVDpm-mxj8RfMEM48E/view?usp=drive_link',
  },
  {
    id: '8',
    title: 'ĐƠN ĐĂNG KÝ RÚT HỌC PHẦN (Rút tín chỉ đã đăng ký)',
    category: 'Đăng ký học',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1XJNfANUTHP3fEM9E3-sJZcO6YlHjSBGX/view?usp=drive_link',
  },
  {
    id: '9',
    title: 'ĐƠN HOÃN THI VÀ THI GHÉP',
    category: 'Thi & Điểm',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1LYuJJmHo4GSuRVeCalI-CZtTsTxAsdKI/view?usp=drive_link',
  },
  {
    id: '10',
    title: 'ĐƠN PHÚC KHẢO - XEM XÉT LẠI BÀI THI',
    category: 'Thi & Điểm',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/18wVmbl-NMP9m5ECfW84pG9bjEh9NE0IR/view?usp=drive_link',
  },
  {
    id: '11',
    title: 'ĐƠN ỦY QUYỀN NHẬN BẰNG (Nhờ người khác nhận thay)',
    category: 'Tốt nghiệp & Nhận bằng',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1R2wJtHHI4__uS4tNHfi514LRzZSNChJk/view?usp=drive_link',
  },
  {
    id: '12',
    title: 'ĐƠN XÁC NHẬN NỢ MÔN - TẠM HOÃN NVQS',
    category: 'NVQS & Giấy tờ',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1ljIi0zVgoG3Mr8UtJ0MpGacr-C7ISmdd/view?usp=drive_link',
  },
  {
    id: '13',
    title: 'ĐƠN XÁC NHẬN TRẢ NỢ MÔN ĐỂ XÁC NHẬN NVQS',
    category: 'NVQS & Giấy tờ',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1MRUJr2Y-Z5oaFJpVMIVqzh2GkSObjuA5/view?usp=drive_link',
  },
  {
    id: '14',
    title: 'ĐƠN XIN BẢO LƯU KẾT QUẢ HỌC TẬP',
    category: 'Đăng ký học',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1Pln2BnS7w4rmnPyjtb7-hDK9wh5mID3U/view?usp=drive_link',
  },
  {
    id: '15',
    title: 'ĐƠN XIN CẤP BẢNG ĐIỂM',
    category: 'NVQS & Giấy tờ',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1jDg9GL_VAJw6T4sYP01YHCZXVKLvq_kF/view?usp=drive_link',
  },
  {
    id: '16',
    title: 'ĐƠN XIN ĐỀ NGHỊ THAM DỰ TỐT NGHIỆP - XIN THỰC TẬP - KHÓA LUẬN - THI TN',
    category: 'Tốt nghiệp & Nhận bằng',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1GgkZZ3fNW2jFksM0Ni-UXVdMHKUKh0zv/view?usp=drive_link',
  },
  {
    id: '17',
    title: 'ĐƠN XIN HOÃN THỰC TẬP',
    category: 'Tốt nghiệp & Nhận bằng',
    format: 'DOCX',
    driveUrl: 'https://drive.google.com/file/d/10nGyzbP2Q_MJ-w2Xy3yCYWM54XxsofID/view?usp=drive_link',
  },
  {
    id: '18',
    title: 'ĐƠN XIN HỌC CẢI THIỆN',
    category: 'Đăng ký học',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/12Rjre5q7EugDbhNmHJ4DX0GIqeyied9L/view?usp=drive_link',
  },
  {
    id: '19',
    title: 'ĐƠN XIN HỌC LẠI',
    category: 'Đăng ký học',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1HpblbAFMfTwWRwe4gCGfBhEgk0eOSDOj/view?usp=drive_link',
  },
  {
    id: '20',
    title: 'ĐƠN XIN MỞ LỚP (Chưa tìm thấy bản mới hơn)',
    category: 'Đăng ký học',
    format: 'DOCX',
    driveUrl: 'https://docs.google.com/document/d/1tR_UwIB50BUzKWBlxL4yinmJH8k0Pmsj/edit?usp=drive_link&ouid=103881290109885782478&rtpof=true&sd=true',
  },
  {
    id: '21',
    title: 'ĐƠN XIN PHÉP KHI VẮNG QUÂN SỰ - MẪU MỚI',
    category: 'NVQS & Giấy tờ',
    format: 'DOCX',
    driveUrl: 'https://drive.google.com/file/d/1EPslryzh4_wWCmFSR5p2McsLogBRHaXj/view?usp=drive_link',
  },
  {
    id: '22',
    title: 'MẪU ĐƠN CHUYỂN ĐIỂM',
    category: 'Thi & Điểm',
    format: 'PDF',
    driveUrl: 'https://drive.google.com/file/d/1F5_dILhlg4usWPXDh0SxMY77PiPLVbXT/view?usp=drive_link',
  },
];

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

function parseCSV(text: string): FormItem[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length <= 1) return [];

  const rawHeaders = parseCSVLine(lines[0]);
  const headers = rawHeaders.map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));

  const forms: FormItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0 || values.every((v) => !v)) continue;

    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });

    const title = row['title'] || '';
    if (!title) continue;

    const rawFormat = (row['format'] || '').toUpperCase();
    const format: 'PDF' | 'DOCX' = rawFormat.includes('DOC') ? 'DOCX' : 'PDF';

    forms.push({
      id: row['id'] || String(i),
      title: title,
      category: (row['category'] as any) || 'Đăng ký học',
      format: format,
      driveUrl: row['driveurl'] || '',
    });
  }

  return forms;
}

function getDirectDownloadUrl(url: string, format: 'PDF' | 'DOCX'): string {
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

export default function MauDonPage() {
  const [forms, setForms] = useState<FormItem[]>(DEFAULT_FORMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_EXPIRE_TIME;

        if (Array.isArray(data) && data.length > 0) {
          setForms(data);
          setIsLoading(false);

          if (!isExpired) {
            return;
          }
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc cache localStorage:', e);
    }

    fetch(GOOGLE_SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải file CSV');
        return res.text();
      })
      .then((csvText) => {
        const parsed = parseCSV(csvText);
        if (parsed.length > 0) {
          setForms(parsed);
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
        console.warn('Lỗi đồng bộ dữ liệu từ Sheet (dùng mẫu mặc định):', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const categories = [
    'Tất cả',
    'Đăng ký học',
    'Thi & Điểm',
    'Tốt nghiệp & Nhận bằng',
    'NVQS & Giấy tờ',
    'Chuyển ngành / Trường',
  ];

  const filteredForms = forms.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display','Segoe_UI',sans-serif] antialiased selection:bg-[#0071e3] selection:text-white pb-24">
      
      {/* 1. TIÊU ĐỀ TRANG CĂN GIỮA STYLE APPLE */}
      <section className="w-full pt-5 pb-6 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center">
        <div className="space-y-3 text-center max-w-3xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#b23b35] text-white text-xs font-semibold rounded-full shadow-sm">
              <FileCheck2 size={15} className="text-red-100" />
              <span>Thủ tục đào tạo & Hành chính sinh viên DTU</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-tight">
            Mẫu Đơn <span className="text-[#b23b35]">Sinh Viên</span>
          </h1>

          <p className="text-[20px] leading-[25px] font-normal text-[#86868b] max-w-xl mx-auto">
            Tổng hợp các mẫu đơn đăng ký, hoãn thi, phúc khảo, chuyển ngành và thủ tục nghĩa vụ quân sự thường gặp.
          </p>
        </div>
      </section>

      {/* 2. KHỐI TÌM KIẾM & DANH SÁCH */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Tìm kiếm & Bộ lọc */}
        <div className="bg-white rounded-[26px] p-5 sm:p-7 border border-[#e5e5ea]/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]" size={19} />
            <input
              type="text"
              placeholder="Nhập tên mẫu đơn cần tìm (VD: hoãn thi, rút học phần, quân sự...)..."
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

        {/* Danh sách mẫu đơn */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="bg-white rounded-[26px] border border-[#e5e5ea]/80 py-14 px-4 text-center text-[#86868b] text-sm flex items-center justify-center gap-2.5 shadow-sm">
              <Loader2 size={20} className="animate-spin text-[#b23b35]" />
              <span>Đang tải danh sách mẫu đơn mới nhất...</span>
            </div>
          ) : filteredForms.length === 0 ? (
            <div className="bg-white rounded-[26px] border border-[#e5e5ea]/80 py-12 px-4 text-center text-[#86868b] text-sm space-y-2.5 shadow-sm">
              <Info size={30} className="mx-auto text-[#86868b]" />
              <p className="font-semibold text-[#1d1d1f] text-base">Không tìm thấy mẫu đơn nào phù hợp với yêu cầu tìm kiếm.</p>
            </div>
          ) : (
            filteredForms.map((item) => {
              const downloadLink = getDirectDownloadUrl(item.driveUrl, item.format);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-[22px] border border-[#e5e5ea]/80 hover:border-[#b23b35] p-4 sm:p-5 flex items-center justify-between gap-4 transition-all duration-200 group shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex items-center justify-center text-[#b23b35] shrink-0 group-hover:scale-105 transition-transform">
                      <FileText size={22} />
                    </div>
                    
                    <div className="min-w-0 space-y-1">
                      <h2 className="text-sm sm:text-[15px] font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors truncate">
                        {item.title}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#f5f5f7] border border-[#e5e5ea] text-[#515154] text-[11px] font-semibold">
                          {item.category}
                        </span>
                        <span className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded ${
                          item.format === 'DOCX' 
                            ? 'bg-blue-50 text-blue-600 border border-blue-200/60' 
                            : 'bg-red-50 text-[#b23b35] border border-red-200/60'
                        }`}>
                          .{item.format}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Nút tải về */}
                  <a
                    href={downloadLink}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f5f5f7] hover:bg-[#b23b35] border border-[#e5e5ea] hover:border-[#b23b35] text-[#1d1d1f] hover:text-white text-xs sm:text-sm font-bold transition shrink-0 group/btn cursor-pointer shadow-sm hover:shadow"
                    title="Tải xuống mẫu đơn"
                  >
                    <Download size={15} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                    <span className="hidden sm:inline">Tải về</span>
                  </a>
                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
}