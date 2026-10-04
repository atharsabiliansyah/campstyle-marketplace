import React, { useState } from 'react';
import { 
  X, 
  Store, 
  ShieldCheck, 
  Banknote, 
  Clock, 
  CheckCircle2, 
  Tent, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface MitraVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MitraVendorModal: React.FC<MitraVendorModalProps> = ({ isOpen, onClose }) => {
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Jogja / Kaliurang');
  const [tentCount, setTentCount] = useState<number>(3);
  const [gearNotes, setGearNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Potential monthly earning calculation: e.g. ~Rp 450.000 per tent / month on weekend rentals
  const estimatedMonthlyEarnings = tentCount * 450000 + 400000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150 font-inter">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-stone-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#233d31] bg-[#14261e] text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div>
              <h3 className="font-bold text-sm sm:text-base uppercase tracking-wider font-heading">
                GABUNG JADI MITRA RENTAL OUTDOOR
              </h3>
              <p className="text-xs text-stone-300">CampStyle Marketplace</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Banner Hero */}
          <div className="bg-gradient-to-br from-emerald-900 to-[#14261e] text-white p-5 rounded-2xl space-y-2 border border-emerald-700/40">
            <h4 className="text-lg sm:text-xl font-black font-heading leading-tight">
              Punya Tenda & Alat Camping yang Jarang Dipakai?
            </h4>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Daripada berdebu di lemari, sewakan di <strong>CampStyle Marketplace</strong>. Dapatkan penghasilan rutin setiap akhir pekan dengan perlindungan jaminan KTP asli dan asuransi kerusakan.
            </p>
          </div>

          {/* 3 Keuntungan Mitra */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
              <h5 className="font-bold text-stone-900 text-xs font-heading">Jaminan KTP Asli</h5>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Penyewa wajib menitipkan KTP fisik asli di brankas depot basecamp
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
              <Banknote className="w-5 h-5 text-emerald-600 mb-1" />
              <h5 className="font-bold text-stone-900 text-xs font-heading">Bagi Hasil</h5>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Hasil sewa langsung cair ke rekening bank / QRIS Anda setelah sewa selesai
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
              <Clock className="w-5 h-5 text-emerald-600 mb-1" />
              <h5 className="font-bold text-stone-900 text-xs font-heading">Bebas Cuci Repot</h5>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Tersedia fasilitas laundry basecamp untuk merawat tenda & peralatan Anda
              </p>
            </div>
          </div>

          {/* Estimator Pendapatan */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold text-emerald-950 font-heading">
                  Potensi Penghasilan Bulanan
                </span>
              </div>
              <span className="text-xs font-bold text-stone-600">
                {tentCount} Unit Tenda
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={15}
              value={tentCount}
              onChange={(e) => setTentCount(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />

            <div className="flex items-baseline justify-between pt-1 border-t border-emerald-200/60">
              <span className="text-xs text-stone-600">Estimasi pendapatan bulan:</span>
              <span className="text-lg sm:text-xl font-black text-emerald-800 font-heading">
                Rp {estimatedMonthlyEarnings.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Formulir Pendaftaran */}
          {isSubmitted ? (
            <div className="p-6 bg-emerald-100/60 border border-emerald-300 rounded-2xl text-center space-y-2 animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h5 className="font-bold text-emerald-950 font-heading text-base">
                Pendaftaran Mitra Berhasil Dikirim!
              </h5>
              <p className="text-xs sm:text-sm text-emerald-800">
                Tim Kurasi Basecamp CampStyle akan menghubungi nomor WhatsApp Anda dalam 1x24 jam untuk verifikasi unit dan serah-terima barcode inventaris.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="border-t border-stone-200 pt-4">
                <span className="text-xs uppercase font-bold text-stone-700 block mb-3 font-heading">
                  Formulir Pengajuan Mitra Baru
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nama Toko:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Merbabu Solo Outdoor"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nama Penanggung Jawab:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama sesuai KTP"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nomor WhatsApp Aktif:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812-xxxx-xxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Lokasi / Jalur Gunung Terdekat:
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Jogja / Kaliurang">Jogja / Merapi (Kaliurang)</option>
                      <option value="Boyolali / Selo">Boyolali / Selo (Merbabu)</option>
                      <option value="Wonosobo / Dieng">Wonosobo / Dieng (Prau & Sindoro)</option>
                      <option value="Karanganyar / Candi Cetho">Karanganyar (Lawu)</option>
                      <option value="Malang / Tumpang">Malang / Tumpang (Bromo & Semeru)</option>
                      <option value="Lainnya">Wilayah Lainnya di Indonesia</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3.5">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Daftar Peralatan yang Ingin Disewa:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: 3 unit Tenda Naturehike 4P, 5 Sleeping Bag Polar, 2 Kompor Mawar"
                    value={gearNotes}
                    onChange={(e) => setGearNotes(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 font-heading">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Daftarkan Mitra</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
