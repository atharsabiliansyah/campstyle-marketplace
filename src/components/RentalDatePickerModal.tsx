import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle, X, Check } from 'lucide-react';
import { RentalDateRange } from '../types';
import { calculateDaysBetween, formatDateIndo } from '../utils/formatters';

interface RentalDatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRange: RentalDateRange;
  onApplyRange: (newRange: RentalDateRange) => void;
}

export const RentalDatePickerModal: React.FC<RentalDatePickerModalProps> = ({
  isOpen,
  onClose,
  currentRange,
  onApplyRange,
}) => {
  const [startDate, setStartDate] = useState(currentRange.startDate);
  const [endDate, setEndDate] = useState(currentRange.endDate);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const handleStartDateChange = (val: string) => {
    setStartDate(val);
    setErrorMsg('');
    if (val > endDate) {
      const nextDay = new Date(val);
      nextDay.setDate(nextDay.getDate() + 1);
      setEndDate(nextDay.toISOString().split('T')[0]);
    }
  };

  const handleEndDateChange = (val: string) => {
    if (val < startDate) {
      setErrorMsg('Tanggal selesai tidak boleh sebelum tanggal mulai sewa.');
      return;
    }
    setErrorMsg('');
    setEndDate(val);
  };

  const handleApplyPreset = (daysDuration: number, daysFromNow = 1) => {
    const start = new Date();
    start.setDate(start.getDate() + daysFromNow);
    const end = new Date(start);
    end.setDate(start.getDate() + (daysDuration - 1));

    const sStr = start.toISOString().split('T')[0];
    const eStr = end.toISOString().split('T')[0];
    setStartDate(sStr);
    setEndDate(eStr);
    setErrorMsg('');
  };

  const currentCalc = calculateDaysBetween(startDate, endDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (endDate < startDate) {
      setErrorMsg('Tanggal selesai sewa harus sama atau setelah tanggal mulai.');
      return;
    }
    onApplyRange({
      startDate,
      endDate,
      totalDays: currentCalc.totalDays,
      nightsCount: currentCalc.nightsCount,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150 font-inter">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#333] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#233d31] bg-[#14261e] text-white">
          <div className="flex items-center gap-2.5">
            <h3 className="font-bold text-sm uppercase tracking-wider font-heading">
              PILIH JADWAL SEWA ALAT
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
          {/* Quick Presets */}
          <div className="space-y-1.5">
            <span className="text-xs uppercase font-bold text-stone-600 block font-heading">
              DURASI PENDAKIAN UMUM:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { days: 2, label: '2 Hari 1 Malam' },
                { days: 3, label: '3 Hari 2 Malam' },
                { days: 4, label: '4 Hari 3 Malam' },
                { days: 5, label: '5 Hari 4 Malam' },
              ].map((p) => (
                <button
                  key={p.days}
                  type="button"
                  onClick={() => handleApplyPreset(p.days, 1)}
                  className={`py-2 px-2 text-xs font-bold border rounded-xl transition text-center font-heading ${
                    currentCalc.totalDays === p.days
                      ? 'bg-[#1b3d2f] border-[#1b3d2f] text-white shadow-xs'
                      : 'bg-white border-[#d8d5cb] text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-[#faf9f5] p-3.5 border border-[#d8d5cb] rounded-xl space-y-1.5">
              <label className="block text-xs uppercase text-stone-600 font-bold font-heading">
                TANGGAL MULAI (START):
              </label>
              <input
                type="date"
                min={todayStr}
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                required
                className="w-full bg-white border border-[#d8d5cb] rounded-lg px-3 py-2 text-sm font-bold text-stone-900 focus:outline-none focus:border-[#1b3d2f]"
              />
              <p className="text-xs text-stone-500 pt-0.5">Ambil mulai 08:30 WIB</p>
            </div>

            <div className="bg-[#faf9f5] p-3.5 border border-[#d8d5cb] rounded-xl space-y-1.5">
              <label className="block text-xs uppercase text-stone-600 font-bold font-heading">
                TANGGAL SELESAI (KEMBALI):
              </label>
              <input
                type="date"
                min={startDate}
                value={endDate}
                onChange={(e) => handleEndDateChange(e.target.value)}
                required
                className="w-full bg-white border border-[#d8d5cb] rounded-lg px-3 py-2 text-sm font-bold text-stone-900 focus:outline-none focus:border-[#1b3d2f]"
              />
              <p className="text-xs text-stone-500 pt-0.5">Batas maks 20:00 WIB</p>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-xl text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Duration Summary */}
          <div className="p-4 bg-[#f2f0e9] border border-[#d8d5cb] rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs uppercase text-stone-600 font-bold block font-heading">TOTAL DURASI SEWA TERHITUNG:</span>
              <p className="font-black text-base text-stone-900 font-heading">
                {currentCalc.totalDays} HARI SEWA ({currentCalc.nightsCount} Malam)
              </p>
            </div>
            <span className="text-xs text-[#1b3d2f] font-bold">
              Tarif harian × {currentCalc.totalDays} hari
            </span>
          </div>

          {/* Basecamp rules note */}
          <div className="text-xs text-stone-500 border border-[#eeece6] bg-[#faf9f5] p-3 rounded-xl leading-relaxed">
            * Jam operasional serah-terima alat: 08:30 – 21:30 WIB di Basecamp Kaliurang Km 12.5. Batas pengembalian adalah pukul 20:00 WIB pada tanggal selesai.
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#eeece6] font-heading">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1b3d2f] hover:bg-[#142e23] text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-sm"
            >
              Terapkan Jadwal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
