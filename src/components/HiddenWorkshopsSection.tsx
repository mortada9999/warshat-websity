'use client';

import React from 'react';
import { useAdmin } from './AdminProvider';
import { useWorkshopStore } from '@/lib/workshopStore';
import { AdminCardOverlay } from './AdminOverlay';

export default function HiddenWorkshopsSection() {
  const { isAdmin } = useAdmin();
  const { allWorkshops } = useWorkshopStore();

  if (!isAdmin) return null;

  const hiddenWorkshops = allWorkshops.filter(w => !w.isActive);

  if (hiddenWorkshops.length === 0) return null;

  return (
    <section className="relative w-full py-12 px-6 bg-[#1A1A1A] text-white z-50">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <h2 className="text-2xl font-bold font-amiri text-[#F6F6F4] mb-4 text-center">
          الورش المخفية (خاص بالإدارة)
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hiddenWorkshops.map(w => (
            <div 
              key={w.id} 
              className="relative bg-[#2A2A2A] rounded-md p-4 border border-[#444] shadow-lg flex flex-col gap-3"
            >
              {/* Admin Tools for this card */}
              <div className="absolute -top-3 -left-3 z-10">
                <AdminCardOverlay workshop={w} />
              </div>

              {w.image && (
                <div 
                  className="w-full h-32 bg-center bg-cover bg-no-repeat rounded"
                  style={{ backgroundImage: `url(${w.image})` }}
                />
              )}
              
              <h3 className="font-amiri text-lg text-center text-[#F6F6F4]">
                {w.titleAr}
              </h3>
              
              <p className="text-xs text-center text-[#AAA] mb-2">
                القسم: {
                  w.category === 'open_activity' ? 'نشاطات ترفيهية' :
                  w.category === 'workshop' ? 'ورش تدريبية' :
                  w.category === 'course' ? 'كورسات' : 'أطفال'
                }
              </p>

              <p className="text-sm text-center text-[#E0E0E0] opacity-80 border-t border-[#444] pt-3">
                اضغط على زر التعديل لإرجاعها
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
