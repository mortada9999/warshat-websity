'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function BookingsPage() {
  const [filter, setFilter] = useState('all');

  // Dummy data representing bookings
  const mockBookings = [
    { id: 1, name: 'أحمد محمود', phone: '07712345678', age: 24, workshop: 'ورشة الفخار', branch: 'الزيونة', payment: 'at_workshop', status: 'pending', date: '2023-11-01 14:30' },
    { id: 2, name: 'سارة علي', phone: '07898765432', age: 19, workshop: 'ورشة التطريز', branch: 'اليرموك', payment: 'deposit', status: 'confirmed', date: '2023-11-02 10:15' },
    { id: 3, name: 'عمر فؤاد', phone: '07911122233', age: 28, workshop: 'كورس الرسم الزيتي', branch: 'الزيونة', payment: 'online_full', status: 'confirmed', date: '2023-11-02 16:45' },
    { id: 4, name: 'نور حسن', phone: '07744455566', age: 22, workshop: 'ورشة الشموع', branch: 'اليرموك', payment: 'cash_full', status: 'cancelled', date: '2023-11-03 09:20' },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#F6F6F4] text-[#374A00] p-8 font-ibm-plex">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-amiri mb-2">إدارة الحجوزات</h1>
            <p className="text-sm opacity-80">نظرة عامة على جميع المسجلين في الورش والكورسات</p>
          </div>
          <Link href="/" className="px-6 py-2 bg-[#374A00] text-white rounded-md text-sm font-semibold shadow-md hover:bg-[#2b3a00] transition-colors">
            العودة للرئيسية
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${filter === 'all' ? 'bg-[#A25F00] text-white' : 'bg-white border border-[#E5E5E5] hover:bg-gray-50'}`}
          >
            الكل
          </button>
          <button 
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${filter === 'confirmed' ? 'bg-[#A25F00] text-white' : 'bg-white border border-[#E5E5E5] hover:bg-gray-50'}`}
          >
            المؤكدة
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${filter === 'pending' ? 'bg-[#A25F00] text-white' : 'bg-white border border-[#E5E5E5] hover:bg-gray-50'}`}
          >
            قيد الانتظار
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-[#F9F9F9] border-b border-[#E5E5E5]">
                  <th className="p-4 text-sm font-semibold text-gray-600">الاسم</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">الهاتف</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">العمر</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">الورشة</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">الفرع</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">الدفع</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">الحالة</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {mockBookings
                  .filter(b => filter === 'all' || b.status === filter)
                  .map((booking) => (
                  <tr key={booking.id} className="border-b border-[#E5E5E5] last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-semibold">{booking.name}</td>
                    <td className="p-4" dir="ltr"><span className="text-left inline-block w-full">{booking.phone}</span></td>
                    <td className="p-4 text-gray-600">{booking.age}</td>
                    <td className="p-4 text-[#A25F00] font-semibold">{booking.workshop}</td>
                    <td className="p-4">{booking.branch}</td>
                    <td className="p-4">
                      {booking.payment === 'online_full' && <span className="text-green-600 text-sm bg-green-50 px-2 py-1 rounded">دفع إلكتروني</span>}
                      {booking.payment === 'deposit' && <span className="text-orange-600 text-sm bg-orange-50 px-2 py-1 rounded">عربون</span>}
                      {booking.payment === 'cash_full' && <span className="text-blue-600 text-sm bg-blue-50 px-2 py-1 rounded">دفع كامل</span>}
                      {booking.payment === 'at_workshop' && <span className="text-gray-600 text-sm bg-gray-100 px-2 py-1 rounded">في الورشة</span>}
                    </td>
                    <td className="p-4">
                      {booking.status === 'confirmed' && <span className="inline-block w-3 h-3 rounded-full bg-green-500 ml-2 shadow-sm" title="مؤكد"></span>}
                      {booking.status === 'pending' && <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 ml-2 shadow-sm" title="قيد الانتظار"></span>}
                      {booking.status === 'cancelled' && <span className="inline-block w-3 h-3 rounded-full bg-red-500 ml-2 shadow-sm" title="ملغى"></span>}
                    </td>
                    <td className="p-4 text-sm text-gray-500" dir="ltr">{booking.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {mockBookings.filter(b => filter === 'all' || b.status === filter).length === 0 && (
            <div className="p-8 text-center text-gray-500">
              لا توجد حجوزات مطابقة.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
