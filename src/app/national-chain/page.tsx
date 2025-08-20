'use client'

import React, { useState, useMemo } from 'react';

// Icon Components
interface IconProps {
  className?: string;
}

const Gift: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
);

const MapPin: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Star: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Check: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ChevronDown: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const X: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Type definitions
interface Location {
  id: number;
  name: string;
  address: string;
}

interface Entry {
  number: number;
  claimed: boolean;
}

interface Prize {
  tier: string;
  name: string;
  value: string;
  quantity: number;
}

interface Stats {
  totalEntries: number;
  uniqueParticipants: number;
  prizesAwarded: number;
  daysLeft: number;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  loyaltyNumber: string;
  marketingOptIn: boolean;
}

interface BrandHeaderProps {
  selectedLocation: Location;
  onLocationChange: (location: Location) => void;
  locations: Location[];
}

interface PrizeShowcaseProps {
  prizes: Prize[];
  currentWeek: number;
}

interface EntryGridProps {
  entries: Entry[];
  onSelectEntry: (index: number) => void;
}

interface EntryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  entryNumber: number | null;
  location: Location;
}

interface ContestStatsProps {
  stats: Stats;
}

// Brand Header Component
const BrandHeader: React.FC<BrandHeaderProps> = ({ selectedLocation, onLocationChange, locations }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-white/10 backdrop-blur-sm p-1.5 md:p-2 rounded-lg">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white">FreshMart</h1>
            <p className="text-xs md:text-sm text-white/80">Weekly Prize Giveaway</p>
          </div>
        </div>
        
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full hover:bg-black/30 transition-colors"
          >
            <MapPin className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">{selectedLocation.name}</span>
            <ChevronDown className="w-4 h-4 text-white/80" />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50">
              {locations.map(loc => (
                <button
                  type="button"
                  key={loc.id}
                  onClick={() => {
                    onLocationChange(loc);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                >
                  <div className="font-semibold text-gray-900">{loc.name}</div>
                  <div className="text-sm text-gray-500">{loc.address}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Prize Display Component
const PrizeShowcase: React.FC<PrizeShowcaseProps> = ({ prizes, currentWeek }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 md:p-6 mb-4">
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-400" />
        Weekly Prizes
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {prizes.map((prize, idx) => (
          <div key={prize.name + idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="text-emerald-400 font-bold text-sm mb-1">{prize.tier}</div>
            <div className="text-white font-semibold">{prize.name}</div>
            <div className="text-white/60 text-sm mt-1">{prize.value}</div>
            <div className="text-white/40 text-xs mt-2">{prize.quantity} available</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <span className="text-white/60 text-sm">Week {currentWeek} • Drawing on Sunday at 8 PM</span>
      </div>
    </div>
  );
};

// Entry Grid Component
const EntryGrid: React.FC<EntryGridProps> = ({ entries, onSelectEntry }) => {
  const [hoveredEntry, setHoveredEntry] = useState<number | null>(null);
  
  return (
    <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-xl p-4 md:p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-lg">Select Your Entry Number</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-emerald-500 rounded"></div>
            <span className="text-white/60 text-sm">Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-500 rounded"></div>
            <span className="text-white/60 text-sm">Taken</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-10 gap-2">
        {entries.map((entry) => (
          <button
            type="button"
            key={entry.number}
            onClick={() => !entry.claimed && onSelectEntry(entry.number - 1)}
            onMouseEnter={() => setHoveredEntry(entry.number - 1)}
            onMouseLeave={() => setHoveredEntry(null)}
            disabled={entry.claimed}
            className={`
              relative aspect-square rounded-lg font-bold text-sm transition-all
              ${entry.claimed 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-br from-emerald-500 to-green-600 text-white hover:from-emerald-400 hover:to-green-500 hover:scale-110 hover:z-10 cursor-pointer shadow-lg hover:shadow-emerald-500/30'
              }
            `}
          >
            <span className="absolute inset-0 flex items-center justify-center">
              {String(entry.number).padStart(3, '0')}
            </span>
            {entry.claimed && (
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            {hoveredEntry === entry.number - 1 && !entry.claimed && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
                Click to select
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-white/60 text-sm">
          {entries.filter(e => !e.claimed).length} entries remaining
        </div>
        <div className="text-emerald-400 text-sm font-semibold">
          Max 5 entries per person
        </div>
      </div>
    </div>
  );
};

// Entry Modal Component
const EntryModal: React.FC<EntryModalProps> = ({ open, onClose, onSubmit, entryNumber, location }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    loyaltyNumber: '',
    marketingOptIn: false
  });

  if (!open || entryNumber === null) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        loyaltyNumber: '',
        marketingOptIn: false
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button 
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
        aria-label="Close modal"
      />
      
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 ring-1 ring-white/10 p-6 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-emerald-500/20 p-2 rounded-lg">
              <Gift className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold">Complete Your Entry!</h3>
          </div>
          <p className="text-sm text-slate-300">
            You are entering with number <span className="font-bold text-emerald-400">#{String(entryNumber).padStart(3, '0')}</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Location: {location.name}
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block text-slate-200 font-medium">Full Name *</span>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg bg-slate-800/50 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-emerald-500/50 text-white"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-slate-200 font-medium">Email *</span>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg bg-slate-800/50 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-emerald-500/50 text-white"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-slate-200 font-medium">Phone *</span>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full rounded-lg bg-slate-800/50 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-emerald-500/50 text-white"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-slate-200 font-medium">FreshMart Rewards # (Optional)</span>
            <input
              type="text"
              name="loyaltyNumber"
              value={formData.loyaltyNumber}
              onChange={handleInputChange}
              className="w-full rounded-lg bg-slate-800/50 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-emerald-500/50 text-white"
              placeholder="Earn 2x entries!"
            />
          </label>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="marketingOptIn"
              checked={formData.marketingOptIn}
              onChange={handleInputChange}
              className="mt-0.5 rounded accent-emerald-500"
            />
            <span className="text-slate-300">
              Yes, I would like to receive exclusive offers and updates from FreshMart
            </span>
          </label>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2.5 text-sm font-bold text-white hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg"
            >
              Submit Entry
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-center text-slate-400">
            No purchase necessary • Must be 18+ • Terms apply
          </p>
        </div>
      </div>
    </div>
  );
};

// Statistics Component
const ContestStats: React.FC<ContestStatsProps> = ({ stats }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-600/10 to-green-600/10 border border-emerald-500/20 rounded-xl p-4">
      <h3 className="font-bold text-white text-sm md:text-base mb-3">Contest Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="text-2xl font-bold text-emerald-400">{stats.totalEntries}</div>
          <div className="text-xs text-slate-400">Total Entries</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-400">{stats.uniqueParticipants}</div>
          <div className="text-xs text-slate-400">Participants</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-400">{stats.prizesAwarded}</div>
          <div className="text-xs text-slate-400">Prizes Won</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-orange-400">{stats.daysLeft}</div>
          <div className="text-xs text-slate-400">Days Left</div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const GiveawayApp: React.FC = () => {
  const locations: Location[] = useMemo(() => [
    { id: 1, name: 'Downtown Plaza', address: '123 Main St, City Center' },
    { id: 2, name: 'Westside Mall', address: '456 West Ave, West District' },
    { id: 3, name: 'Riverside Commons', address: '789 River Rd, Riverside' },
    { id: 4, name: 'North Park', address: '321 North Blvd, Northside' }
  ], []);

  const prizes: Prize[] = useMemo(() => [
    { tier: 'GRAND PRIZE', name: '$500 Gift Card', value: 'Value: $500', quantity: 1 },
    { tier: '2ND PRIZE', name: 'Smart TV Package', value: 'Value: $350', quantity: 2 },
    { tier: '3RD PRIZE', name: 'Shopping Spree', value: 'Value: $100', quantity: 5 }
  ], []);

  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
  const [entries, setEntries] = useState<Entry[]>(() => {
    return Array.from({ length: 100 }, (_, idx) => ({
      number: idx + 1,
      claimed: Math.random() > 0.7
    }));
  });

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);

  const stats = useMemo(() => ({
    totalEntries: entries.filter(e => e.claimed).length,
    uniqueParticipants: Math.floor(entries.filter(e => e.claimed).length * 0.6),
    prizesAwarded: 47,
    daysLeft: 3
  }), [entries]);

  const handleSelectEntry = (entryIndex: number): void => {
    setSelectedEntry(entryIndex + 1);
    setModalOpen(true);
  };

  const handleSubmitEntry = (formData: FormData): void => {
    if (selectedEntry === null) return;
    
    setEntries(prev => {
      const next = [...prev];
      next[selectedEntry - 1] = { ...next[selectedEntry - 1], claimed: true };
      return next;
    });
    setModalOpen(false);
    
    // In production, this would send to API
    console.log('Entry submitted:', { 
      ...formData, 
      entryNumber: selectedEntry, 
      location: selectedLocation 
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      <BrandHeader 
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        locations={locations}
      />
      
      <div className="flex-1 px-4 py-4 md:px-6 md:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 flex items-center justify-center">
            <div className="bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              LIVE GIVEAWAY - WEEK 12
            </div>
          </div>

          <PrizeShowcase prizes={prizes} currentWeek={12} />
          
          <EntryGrid 
            entries={entries}
            onSelectEntry={handleSelectEntry}
          />
          
          <div className="mt-6">
            <ContestStats stats={stats} />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400 mb-2">
              Winners drawn every Sunday at 8 PM local time • Must be present at store to claim grand prize
            </p>
            <p className="text-xs text-slate-500">
              © 2025 FreshMart Inc. • All Rights Reserved • Void where prohibited
            </p>
          </div>
        </div>
      </div>

      <EntryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitEntry}
        entryNumber={selectedEntry}
        location={selectedLocation}
      />
    </main>
  );
};

export default GiveawayApp;