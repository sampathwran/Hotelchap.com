const fs = require('fs');
let code = \import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export const allCurrencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
  { code: 'INR', symbol: '?', name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'THB', symbol: '?', name: 'Thai Baht' },
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal' },
  { code: 'QAR', symbol: 'QAR', name: 'Qatari Riyal' },
  { code: 'OMR', symbol: 'OMR', name: 'Omani Rial' },
  { code: 'KWD', symbol: 'KWD', name: 'Kuwaiti Dinar' },
  { code: 'BHD', symbol: 'BHD', name: 'Bahraini Dinar' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'RUB', symbol: '?', name: 'Russian Ruble' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'KRW', symbol: '?', name: 'South Korean Won' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'PHP', symbol: '?', name: 'Philippine Peso' },
  { code: 'VND', symbol: '?', name: 'Vietnamese Dong' },
  { code: 'TRY', symbol: '?', name: 'Turkish Lira' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
  { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '?', name: 'Bangladeshi Taka' },
  { code: 'NPR', symbol: 'Rs', name: 'Nepalese Rupee' },
  { code: 'MVR', symbol: 'Rf', name: 'Maldivian Rufiyaa' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  { code: 'PLN', symbol: 'zl', name: 'Polish Zloty' },
];

export default function CurrencyModal({ isOpen, onClose, currentCurrency, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  if (!isOpen) return null;
  const filtered = allCurrencies.filter(c => c.code.toLowerCase().includes(searchTerm.toLowerCase()) || c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200'>
        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
          <h2 className='text-2xl font-black text-gray-800 tracking-tight'>Select Currency</h2>
          <button onClick={onClose} className='p-2 hover:bg-gray-100 rounded-full transition-colors'><X size={24} className='text-gray-500' /></button>
        </div>
        <div className='p-4 md:p-6 border-b border-gray-100 bg-gray-50/50'>
          <div className='relative relative w-full'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <Search size={20} className='text-gray-400' />
            </div>
            <input type='text' placeholder='Search by currency code or name (e.g. USD, LKR)...' className='w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#673AB7] focus:border-transparent text-gray-800 font-medium placeholder-gray-400 shadow-sm transition-all' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className='overflow-y-auto p-4 md:p-6 bg-white flex-1'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
            {filtered.map(c => {
              const isActive = currentCurrency === c.code;
              return (
              <button key={c.code} onClick={() => { onSelect(c.code); onClose(); }} className={'flex items-center justify-between p-4 rounded-xl border transition-all ' + (isActive ? 'border-[#673AB7] bg-purple-50 shadow-md ring-1 ring-[#673AB7]' : 'border-gray-100 hover:border-gray-300 hover:shadow-sm hover:bg-gray-50')}>
                <div className='flex flex-col items-start'>
                  <span className={'font-black text-lg ' + (isActive ? 'text-[#673AB7]' : 'text-gray-800')}>{c.code}</span>
                  <span className='text-xs text-gray-500 font-medium mt-0.5'>{c.name}</span>
                </div>
                <div className={'flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ' + (isActive ? 'bg-[#673AB7] text-white' : 'bg-gray-100 text-gray-600')}>{c.symbol}</div>
              </button>
            )})}
          </div>
          {filtered.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-500 font-medium'>No currencies found matching {searchTerm}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
\; fs.writeFileSync('src/components/CurrencyModal.tsx', code, 'utf-8');
