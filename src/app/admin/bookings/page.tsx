'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWorkshopStore } from '@/lib/workshopStore';

export default function BookingsPage() {
  const { workshops } = useWorkshopStore();
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  // Dummy data representing bookings
  const mockBookings = [
    { id: 1, name: 'أحمد محمود', phone: '07712345678', age: 24, workshopId: 'w_pottery_adults', branch: 'Zayouna', payment: 'at_workshop', status: 'pending', date: '2023-11-01 14:30' },
    { id: 2, name: 'سارة علي', phone: '07898765432', age: 19, workshopId: 'w_embroidery', branch: 'Al-Yarmouk', payment: 'deposit', status: 'confirmed', date: '2023-11-02 10:15' },
    { id: 3, name: 'عمر فؤاد', phone: '07911122233', age: 28, workshopId: 'w_painting', branch: 'Zayouna', payment: 'online_full', status: 'confirmed', date: '2023-11-02 16:45' },
    { id: 4, name: 'نور حسن', phone: '07744455566', age: 22, workshopId: 'w_candles', branch: 'Al-Yarmouk', payment: 'cash_full', status: 'cancelled', date: '2023-11-03 09:20' },
    // Some extra mock data to show when clicking any workshop
    { id: 5, name: 'علي محمد', phone: '07755566677', age: 20, workshopId: 'Zayouna', payment: 'deposit', status: 'pending', date: '2023-11-04 10:00' }
  ];

  const selectedWorkshop = workshops.find(w => w.id === selectedWorkshopId);
  const displayedBookings = mockBookings.filter(b => b.workshopId === selectedWorkshopId || !selectedWorkshopId);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F6F6F4] text-[#374A00] p-4 md:p-8 font-ibm-plex">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold font-amiri mb-2 text-[#374A00]">إدارة الحجوزات</h1>
            <p className="text-base text-gray-600">
              {selectedWorkshop 
                ? `عرض المسجلين في: ${selectedWorkshop.titleAr}`
                : 'الرجاء اختيار الورشة لعرض المسجلين فيها'}
            </p>
          </div>
          <div className="flex gap-3">
            {selectedWorkshop && (
              <button 
                onClick={() => setSelectedWorkshopId(null)}
                className="px-6 py-2 bg-white border border-[#374A00] text-[#374A00] rounded-md text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors"
              >
                العودة للورش
              </button>
            )}
            <Link href="/" className="px-6 py-2 bg-[#A25F00] text-white rounded-md text-sm font-semibold shadow-md hover:bg-[#8b5100] transition-colors">
              الخروج للموقع
            </Link>
          </div>
        </div>

        {!selectedWorkshopId ? (
          /* View 1: List of Workshops */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {workshops.map((w) => {
              // Count dummy bookings for this workshop
              const count = mockBookings.filter(b => b.workshopId === w.id).length || Math.floor(Math.random() * 10);
              return (
                <div 
                  key={w.id} 
                  onClick={() => setSelectedWorkshopId(w.id)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer border border-[#E5E5E5] transition-all transform hover:-translate-y-1"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img src={w.image} alt={w.titleAr} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-[#374A00] backdrop-blur-sm shadow-sm">
                      {w.category === 'kids_course' || w.category === 'kids_workshop' ? 'أطفال' : 'كبار'}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-amiri text-xl font-bold mb-2 line-clamp-1">{w.titleAr}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500">المسجلين:</span>
                      <span className="bg-[#F6F0E2] text-[#A25F00] font-bold px-3 py-1 rounded-md text-sm">
                        {count} شخص
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* View 2: Bookings Table for Selected Workshop */
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${filter === 'all' ? 'bg-[#374A00] text-white' : 'bg-white border border-[#E5E5E5] hover:bg-gray-50'}`}
              >
                الكل
              </button>
              <button 
                onClick={() => setFilter('confirmed')}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${filter === 'confirmed' ? 'bg-[#374A00] text-white' : 'bg-white border border-[#E5E5E5] hover:bg-gray-50'}`}
              >
                المؤكدة
              </button>
              <button 
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${filter === 'pending' ? 'bg-[#374A00] text-white' : 'bg-white border border-[#E5E5E5] hover:bg-gray-50'}`}
              >
                قيد الانتظار
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#F9F9F9] border-b border-[#E5E5E5]">
                      <th className="p-4 text-sm font-semibold text-gray-600">الاسم</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">الهاتف</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">العمر</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">الفرع المفضل</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">طريقة الدفع</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">الحالة</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">تاريخ الحجز</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedBookings
                      .filter(b => filter === 'all' || b.status === filter)
                      .map((booking) => (
                      <tr key={booking.id} className="border-b border-[#E5E5E5] last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-semibold text-[#374A00]">{booking.name}</td>
                        <td className="p-4" dir="ltr"><span className="text-left inline-block w-full text-gray-700">{booking.phone}</span></td>
                        <td className="p-4 text-gray-600">{booking.age}</td>
                        <td className="p-4">
                          {booking.branch === 'Zayouna' ? 'فرع الزيونة' : 'فرع اليرموك'}
                        </td>
                        <td className="p-4">
                          {booking.payment === 'online_full' && <span className="text-green-700 text-sm bg-green-50 border border-green-200 px-2 py-1 rounded">دفع إلكتروني</span>}
                          {booking.payment === 'deposit' && <span className="text-orange-700 text-sm bg-orange-50 border border-orange-200 px-2 py-1 rounded">عربون</span>}
                          {booking.payment === 'cash_full' && <span className="text-blue-700 text-sm bg-blue-50 border border-blue-200 px-2 py-1 rounded">دفع كامل</span>}
                          {booking.payment === 'at_workshop' && <span className="text-gray-700 text-sm bg-gray-100 border border-gray-200 px-2 py-1 rounded">في الورشة</span>}
                        </td>
                        <td className="p-4">
                          {booking.status === 'confirmed' && <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600"><span className="w-2 h-2 rounded-full bg-green-500"></span> مؤكد</span>}
                          {booking.status === 'pending' && <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-600"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> قيد الانتظار</span>}
                          {booking.status === 'cancelled' && <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600"><span className="w-2 h-2 rounded-full bg-red-500"></span> ملغى</span>}
                        </td>
                        <td className="p-4 text-sm text-gray-500" dir="ltr"><span className="text-left inline-block w-full">{booking.date}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {displayedBookings.filter(b => filter === 'all' || b.status === filter).length === 0 && (
                <div className="p-12 text-center text-gray-500 bg-gray-50">
                  <div className="text-4xl mb-3">📭</div>
                  لا توجد حجوزات مطابقة لهذه الورشة بعد.
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
