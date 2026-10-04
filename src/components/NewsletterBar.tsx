import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export const NewsletterBar: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-green-600/20">
          <Mail className="w-6 h-6 stroke-[2]" />
        </div>
        <div>
          <h4 className="text-xl sm:text-2xl font-black text-green-900 leading-tight font-heading">
            Tetap Terhubung dengan Komunitas
          </h4>
          <p className="text-sm sm:text-base text-stone-500 mt-1">
            Dapatkan info promo sewa, update cuaca jalur gunung, dan ketersediaan alat.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full md:w-auto flex-1 max-w-lg flex items-center gap-2.5">
        <input
          type="email"
          required
          placeholder="Masukkan alamat email Anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white border border-stone-300 rounded-full px-5 py-3 text-sm sm:text-base text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
        />
        <button
          type="submit"
          className="px-7 py-3 rounded-full bg-green-700 hover:bg-green-700 text-white font-bold text-sm shadow-md shadow-green-600/20 transition shrink-0 cursor-pointer"
        >
          {isSubmitted ? 'Terdaftar!' : 'Langganan'}
        </button>
      </form>
    </div>
  );
};
