import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Store, 
  ShieldCheck, 
  Sparkles, 
  CheckCheck, 
  Bot,
  MessageCircle,
  Clock,
  MapPin
} from 'lucide-react';
import { Product, RentalVendor } from '../types';
import { formatRupiah } from '../utils/formatters';

interface VendorChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: RentalVendor | null;
  product?: Product | null;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'vendor';
  text: string;
  time: string;
}

const QUICK_QUESTIONS = [
  'Halo kak, apakah unit ini ready untuk akhir pekan ini?',
  'Kondisi tenda apakah sudah dites tahan air/sealant rapat?',
  'Bisa ambil barang jam 6 pagi di basecamp?',
  'Apakah ada diskon untuk sewa lebih dari 3 hari?',
];

export const VendorChatModal: React.FC<VendorChatModalProps> = ({
  isOpen,
  onClose,
  vendor,
  product,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && vendor) {
      // Initial greeting message from vendor
      setMessages([
        {
          id: 'msg-init-1',
          sender: 'vendor',
          text: `Halo kak! Selamat datang di ${vendor.name} (${vendor.city}). Ada yang bisa kami bantu seputar sewa alat camping dan pendakian?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [isOpen, vendor]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen || !vendor) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulate realistic vendor response
    setIsTyping(true);
    setTimeout(() => {
      let reply = 'Terima kasih atas pertanyaannya kak! Unit kami terawat, siap pakai dan dicek fungsi sebelum diserahkan.';
      
      const lower = text.toLowerCase();
      if (lower.includes('ready') || lower.includes('akhir pekan')) {
        reply = `Halo kak! Ya, unit ${product ? product.name : 'ini'} saat ini READY dan siap dipesan. Silakan langsung booking via CampStyle agar slot terkunci ya kak!`;
      } else if (lower.includes('bocor') || lower.includes('tahan air') || lower.includes('sealant')) {
        reply = 'Semua tenda di basecamp kami sudah melalui uji QC water-repellent dan sealant seam tape rapi. Aman dari rembesan hujan lebat kak!';
      } else if (lower.includes('jam 6') || lower.includes('pagi') || lower.includes('ambil')) {
        reply = `Tentu bisa kak! Kru basecamp ${vendor.name} standby mulai pukul 05:30 WIB. Cukup tunjukkan kode QR pesanan & titipkan identitas saat pengambilan.`;
      } else if (lower.includes('diskon') || lower.includes('murah') || lower.includes('3 hari')) {
        reply = 'Untuk durasi sewa di atas 3 hari, sistem CampStyle otomatis memberikan harga paket hemat! Kakak juga bisa klaim voucher toko saat checkout.';
      }

      const vendorMsg: ChatMessage = {
        id: `ven-${Date.now()}`,
        sender: 'vendor',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, vendorMsg]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150 font-inter">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-stone-300 shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
        {/* Header Toko / Vendor */}
        <div className="px-5 py-4 border-b border-stone-200 bg-[#14261e] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-heading font-black text-sm shadow-inner">
              <Store className="w-5 h-5 text-emerald-200" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#14261e] rounded-full"></span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm sm:text-base font-heading leading-none">
                  {vendor.name}
                </h3>
                {vendor.isOfficial ? (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Official Hub
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-stone-700 text-stone-300">
                    Mitra Terverifikasi
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-300 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  {vendor.city}
                </span>
                <span>•</span>
                <span className="text-emerald-300 font-medium">Balas {vendor.responseTime}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Reference Card in Chat if opened from a product */}
        {product && (
          <div className="p-3 bg-stone-50 border-b border-stone-200 flex items-center gap-3 shrink-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-12 h-12 object-cover rounded-lg border border-stone-200"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Produk Yang Ditanyakan:
              </span>
              <p className="text-xs font-bold text-stone-900 truncate font-heading">
                {product.name}
              </p>
              <p className="text-xs font-semibold text-emerald-700">
                {formatRupiah(product.pricePerDay)}/hari
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleSendMessage(`Halo kak, saya berminat sewa "${product.name}", apakah masih ready stoknya?`)}
              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition font-heading shrink-0"
            >
              Tanyakan Stok
            </button>
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf9f6]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-xs'
                    : 'bg-white border border-stone-200 text-stone-900 rounded-tl-xs'
                }`}
              >
                <p>{msg.text}</p>
                <div
                  className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                    msg.sender === 'user' ? 'text-emerald-100' : 'text-stone-400'
                  }`}
                >
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && <CheckCheck className="w-3.5 h-3.5 text-emerald-200" />}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 bg-white border border-stone-200 rounded-2xl w-24 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-stone-100 border-t border-stone-200 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1 bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-stone-300 rounded-full text-xs text-stone-700 hover:text-emerald-800 whitespace-nowrap transition cursor-pointer shrink-0 shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            placeholder="Tulis pesan ke mitra toko rental..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl transition flex items-center justify-center cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
