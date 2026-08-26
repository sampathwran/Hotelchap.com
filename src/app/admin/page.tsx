"use client";
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { MoreVertical, Download, ChevronDown, Check, Edit2, Trash2, Users, ShoppingCart, Search } from 'lucide-react';

const revenueData = [
  { name: 'Jan', sales: 400, profit: 240 },
  { name: 'Feb', sales: 300, profit: 139 },
  { name: 'Mar', sales: 200, profit: 980 },
  { name: 'Apr', sales: 278, profit: 390 },
  { name: 'May', sales: 189, profit: 480 },
  { name: 'Jun', sales: 239, profit: 380 },
  { name: 'Jul', sales: 349, profit: 430 },
  { name: 'Aug', sales: 200, profit: 980 },
  { name: 'Sep', sales: 278, profit: 390 },
  { name: 'Oct', sales: 189, profit: 480 },
  { name: 'Nov', sales: 239, profit: 380 },
  { name: 'Dec', sales: 349, profit: 430 },
];

const leadsData = [
  { name: 'Mobile', value: 1624, color: '#845adf' },
  { name: 'Desktop', value: 1267, color: '#23b7e5' },
  { name: 'Laptop', value: 1153, color: '#f5b849' },
  { name: 'Tablet', value: 679, color: '#e6533c' },
];

const dealsData = [
  { id: 1, name: 'Mayor Kelly', category: 'Manufacture', email: 'mayorkelly@gmail.com', location: 'Germany', date: 'Sep 15 - Oct 12, 2023', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Andrew Garfield', category: 'Development', email: 'andrewgarfield@gmail.com', location: 'Canada', date: 'Apr 10 - Dec 12, 2023', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Simon Cowel', category: 'Service', email: 'simoncowel234@gmail.com', location: 'Europe', date: 'Sep 15 - Oct 12, 2023', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Miranda Hers', category: 'Marketing', email: 'mirindahers@gmail.com', location: 'USA', date: 'Apr 14 - Dec 14, 2023', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Jacob Smith', category: 'Social Platform', email: 'jacobsmith@gmail.com', location: 'Singapore', date: 'Feb 25 - Nov 25, 2023', avatar: 'https://i.pravatar.cc/150?u=5' },
];

const miniChartData = [
  { pv: 2400 }, { pv: 1398 }, { pv: 9800 }, { pv: 3908 }, { pv: 4800 }, { pv: 3800 }, { pv: 4300 }
];

export default function AdminDashboard() {
  return (
    <div className="w-full max-w-[1600px] mx-auto pb-10 animate-fade-in-up">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-gray-800 leading-tight">Welcome back, Super Admin !</h1>
          <p className="text-[13px] text-gray-500 mt-1">Track your booking activity, leads and deals here.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-[#845adf] hover:bg-[#734dbf] text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm">
            <span className="text-lg">⚡</span> Filters
          </button>
          <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#845adf] border border-gray-200 px-4 py-2 rounded-md text-sm font-medium transition shadow-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Top Row: Welcome Banner & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Welcome Banner */}
        <div className="col-span-1 lg:col-span-4 bg-gradient-to-r from-[#845adf] to-[#5a369e] rounded-xl p-6 text-white relative overflow-hidden shadow-sm flex flex-col justify-center min-h-[160px]">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 flex justify-between items-center w-full">
            <div className="max-w-[200px]">
              <h2 className="text-lg font-bold mb-1">Your target is incomplete</h2>
              <p className="text-[12px] text-white/80 leading-relaxed mb-3">You have completed 48% of the given target, you can also check your status.</p>
              <button className="text-[12px] font-bold underline decoration-white/40 hover:decoration-white transition">Click here</button>
            </div>
            {/* Progress Circle */}
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.2)" strokeWidth="6" fill="none" />
                <circle cx="40" cy="40" r="36" stroke="white" strokeWidth="6" fill="none" strokeDasharray="226" strokeDashoffset="117" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">48%</div>
            </div>
          </div>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="col-span-1 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#845adf]/10 text-[#845adf] flex items-center justify-center">
                <Users size={20} />
              </div>
              <div>
                <p className="text-[13px] text-gray-500 font-medium mb-1">Total Customers</p>
                <h3 className="text-2xl font-bold text-gray-800">1,02,890</h3>
                <span className="text-[11px] text-[#845adf] font-medium cursor-pointer hover:underline mt-1 block">View All →</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="w-24 h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChartData}>
                    <Area type="monotone" dataKey="pv" stroke="#845adf" fill="#845adf" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <span className="text-[11px] font-bold text-[#845adf] mt-1">+40% <span className="text-gray-400 font-normal">this month</span></span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#23b7e5]/10 text-[#23b7e5] flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <p className="text-[13px] text-gray-500 font-medium mb-1">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800">$56,562</h3>
                <span className="text-[11px] text-[#23b7e5] font-medium cursor-pointer hover:underline mt-1 block">View All →</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="w-24 h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChartData}>
                    <Area type="monotone" dataKey="pv" stroke="#23b7e5" fill="#23b7e5" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <span className="text-[11px] font-bold text-[#26bf94] mt-1">+25% <span className="text-gray-400 font-normal">this month</span></span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#26bf94]/10 text-[#26bf94] flex items-center justify-center">
                <span className="text-xl">📈</span>
              </div>
              <div>
                <p className="text-[13px] text-gray-500 font-medium mb-1">Conversion Ratio</p>
                <h3 className="text-2xl font-bold text-gray-800">12.08%</h3>
                <span className="text-[11px] text-[#26bf94] font-medium cursor-pointer hover:underline mt-1 block">View All →</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="w-24 h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChartData}>
                    <Area type="monotone" dataKey="pv" stroke="#26bf94" fill="#26bf94" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <span className="text-[11px] font-bold text-red-500 mt-1">-12% <span className="text-gray-400 font-normal">this month</span></span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f5b849]/10 text-[#f5b849] flex items-center justify-center">
                <ShoppingCart size={20} />
              </div>
              <div>
                <p className="text-[13px] text-gray-500 font-medium mb-1">Total Bookings</p>
                <h3 className="text-2xl font-bold text-gray-800">2,543</h3>
                <span className="text-[11px] text-[#f5b849] font-medium cursor-pointer hover:underline mt-1 block">View All →</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="w-24 h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChartData}>
                    <Area type="monotone" dataKey="pv" stroke="#f5b849" fill="#f5b849" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <span className="text-[11px] font-bold text-[#f5b849] mt-1">+19% <span className="text-gray-400 font-normal">this month</span></span>
            </div>
          </div>

        </div>
      </div>

      {/* Middle Row: Big Chart + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Main Line Chart */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#845adf] rounded"></div>
              <h3 className="font-bold text-gray-800 text-[15px]">Revenue Analytics</h3>
            </div>
            <button className="text-[12px] text-gray-500 hover:text-[#845adf] font-medium transition">View All</button>
          </div>
          
          <div className="p-5">
            <div className="flex justify-between items-center mb-6 text-[12px] text-gray-500">
              <span>Revenue Analytics with sales & profit (USD)</span>
              <div className="flex gap-4">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#845adf]"></span> Sales</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#23b7e5]"></span> Profit</span>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#845adf" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#845adf" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#23b7e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#23b7e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8c9097' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8c9097' }} tickFormatter={(val) => `$${val}`} />
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="sales" stroke="#845adf" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                  <Area type="monotone" dataKey="profit" stroke="#23b7e5" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorProfit)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#845adf] rounded"></div>
              <h3 className="font-bold text-gray-800 text-[15px]">Traffic Source</h3>
            </div>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
          </div>
          
          <div className="flex-1 p-6 flex flex-col items-center justify-center relative">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadsData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {leadsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-gray-500 text-sm">Total</span>
              <span className="text-3xl font-black text-gray-800">4,145</span>
            </div>
            
            <div className="w-full flex justify-between mt-6 border-t border-gray-100 pt-6">
              {leadsData.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center gap-1 justify-center mb-1 text-[11px] text-gray-500 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    {item.name}
                  </div>
                  <div className="font-bold text-[13px] text-gray-800">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Row: Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[#845adf] rounded"></div>
            <h3 className="font-bold text-gray-800 text-[15px]">Recent Bookings</h3>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search Here" className="pl-8 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[12px] focus:outline-none focus:border-[#845adf] w-48" />
            </div>
            <button className="flex items-center gap-1 bg-[#845adf] hover:bg-[#734dbf] text-white px-3 py-1.5 rounded-md text-[12px] font-medium transition shadow-sm">
              Sort By <ChevronDown size={14} />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[12px] font-semibold text-gray-500 border-b border-gray-100">
                <th className="p-4 w-10">
                  <input type="checkbox" className="rounded text-[#845adf] focus:ring-[#845adf] cursor-pointer" />
                </th>
                <th className="p-4 uppercase tracking-wider">User</th>
                <th className="p-4 uppercase tracking-wider">Booking Type</th>
                <th className="p-4 uppercase tracking-wider">Email</th>
                <th className="p-4 uppercase tracking-wider">Location</th>
                <th className="p-4 uppercase tracking-wider">Dates</th>
                <th className="p-4 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700 divide-y divide-gray-50">
              {dealsData.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <input type="checkbox" className="rounded text-[#845adf] focus:ring-[#845adf] cursor-pointer border-gray-300" />
                  </td>
                  <td className="p-4 font-medium flex items-center gap-3">
                    <img src={deal.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200" />
                    {deal.name}
                  </td>
                  <td className="p-4">{deal.category}</td>
                  <td className="p-4 text-gray-500">{deal.email}</td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-500 px-2.5 py-1 rounded-md text-[11px] font-bold">{deal.location}</span>
                  </td>
                  <td className="p-4 text-gray-500">{deal.date}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="w-7 h-7 rounded-md bg-[#26bf94]/10 text-[#26bf94] flex items-center justify-center hover:bg-[#26bf94]/20 transition"><Check size={14} /></button>
                      <button className="w-7 h-7 rounded-md bg-[#845adf]/10 text-[#845adf] flex items-center justify-center hover:bg-[#845adf]/20 transition"><Edit2 size={14} /></button>
                      <button className="w-7 h-7 rounded-md bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-[12px] text-gray-500">
          <span>Showing 5 Entries →</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 hover:text-gray-900 transition">Prev</button>
            <button className="px-2.5 py-1 bg-[#845adf] text-white rounded-md font-medium shadow-sm">1</button>
            <button className="px-2.5 py-1 hover:bg-gray-100 rounded-md transition">2</button>
            <button className="px-2 py-1 hover:text-gray-900 transition">next</button>
          </div>
        </div>

      </div>

    </div>
  );
}
