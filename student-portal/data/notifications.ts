export interface NotificationItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  date: string;
  summary: string;
  image: string;
  linkUrl: string;
  content?: string;
  fileUrl?: string;
}

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'thong-bao-khoa-hoc-tin-hoc-12-2026',
    title: 'Khai Giảng Khóa Ôn Tin Học Khảo Sát Đợt Tháng 12/2026',
    category: 'KHÓA HỌC',
    tag: 'ĐỢT 12/2026',
    date: '2026.09.23',
    summary: 'Lịch thi chính thức chiều thứ 7 ngày 05/12/2026. Lộ trình 17 buổi học & thi thử + 5 buổi ôn tập thực chiến Offline & Online.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
    linkUrl: '/thong-bao/thong-bao-khoa-hoc-tin-hoc-12-2026',
    content: 'Hệ thống hóa toàn bộ đề thi Word & Excel khảo sát chuẩn đầu ra thực tế tại trường...',
    fileUrl: '',
  }
];

export async function getNotifications(): Promise<NotificationItem[]> {
  try {
    const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTK2i8stJ8HHPIrVaz4wXpVj9TBr3dlgGXBD3MZUrg-_v4nK8hDWWZALiW4IyQg2ydZUWk5oswNMb3e/pub?gid=76268996&single=true&output=csv'; 

    const res = await fetch(SHEET_CSV_URL, { cache: 'force-cache' });
    if (!res.ok) throw new Error('Không thể kết nối đến Google Sheets');

    const csvText = await res.text();
    const lines = csvText.split('\n');
    
    const items: NotificationItem[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]?.trim();
      if (!line) continue;

      const cols: string[] = [];
      let current = '';
      let inQuotes = false;

      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          cols.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      cols.push(current.trim().replace(/^"|"$/g, ''));

      if (cols.length >= 8 && cols[0]) {
        items.push({
          id: cols[0],
          title: cols[1],
          category: cols[2],
          tag: cols[3],
          date: cols[4],
          summary: cols[5],
          image: cols[6],
          linkUrl: `/thong-bao/${cols[0]}`,
          content: cols[8] || cols[5],
          fileUrl: cols[9] || '',
        });
      }
    }

    return items.length > 0 ? items : NOTIFICATIONS;
  } catch (error) {
    console.error('Lỗi khi tải Google Sheets, dùng dữ liệu mẫu:', error);
    return NOTIFICATIONS;
  }
}