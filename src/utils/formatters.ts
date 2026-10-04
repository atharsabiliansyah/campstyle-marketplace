import { RentalDateRange } from '../types';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateIndo(dateStr: string, includeDay = true): string {
  try {
    const date = new Date(dateStr + 'T00:00:00');
    if (isNaN(date.getTime())) return dateStr;
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    if (includeDay) {
      options.weekday = 'long';
    }
    return date.toLocaleDateString('id-ID', options);
  } catch {
    return dateStr;
  }
}

export function formatDateTimeIndo(isoStr: string): string {
  try {
    const date = new Date(isoStr);
    if (isNaN(date.getTime())) return isoStr;
    return date.toLocaleString('id-ID', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB';
  } catch {
    return isoStr;
  }
}

export function calculateDaysBetween(startDate: string, endDate: string): { totalDays: number; nightsCount: number } {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');

  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // Minimum rental is 1 day
  const totalDays = Math.max(1, diffDays === 0 ? 1 : diffDays);
  const nightsCount = Math.max(0, totalDays - 1);

  return { totalDays, nightsCount };
}

export function getDefaultRentalDates(): RentalDateRange {
  const now = new Date();
  // Start tomorrow
  const start = new Date(now);
  start.setDate(now.getDate() + 1);

  // End 3 days after start (e.g. 3 hari sewa)
  const end = new Date(start);
  end.setDate(start.getDate() + 2); // 3 days total

  const startStr = start.toISOString().split('T')[0];
  const endStr = end.toISOString().split('T')[0];

  const { totalDays, nightsCount } = calculateDaysBetween(startStr, endStr);

  return {
    startDate: startStr,
    endDate: endStr,
    totalDays,
    nightsCount,
  };
}

export function getRemainingTimeText(dueIsoString: string): { text: string; isOverdue: boolean } {
  const now = new Date().getTime();
  const due = new Date(dueIsoString).getTime();
  const diff = due - now;

  if (diff <= 0) {
    const absDiff = Math.abs(diff);
    const hours = Math.floor(absDiff / (1000 * 60 * 60));
    return {
      text: `Terlambat ${hours > 24 ? Math.floor(hours / 24) + ' hari ' : ''}${hours % 24} jam`,
      isOverdue: true,
    };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const remHours = hours % 24;

  if (days > 0) {
    return {
      text: `${days} hari ${remHours} jam lagi`,
      isOverdue: false,
    };
  } else {
    return {
      text: `${hours} jam lagi (Hari Ini)`,
      isOverdue: false,
    };
  }
}
